import { useMutation, useQuery } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AxiosError } from "interfaces/errors.model";
import { Contact } from "interfaces/contact.model";
import { getContactsList } from "api/services/contacts.services";
import { Modal } from 'react-bootstrap';
import close from 'assets/images/close.svg';
import './add-campaign-modal.scss';
import Select from 'react-select'
import { DropDownOption } from 'interfaces/common.model'
import { Controller, useForm } from 'react-hook-form';
import { AxiosResponse } from "axios";
import { NewCampaign } from "interfaces/campaign.model";
import { addNewCampaign } from "api/services/campaigns.services";

type Props = {
    onClose: () => void
    showModal: boolean,
    refetch: () => void
};

const AddCampaign = (props: Props) => {

    const { onClose, showModal, refetch } = props;

    const { formState: { errors }, register, handleSubmit, control, reset, clearErrors } = useForm<NewCampaign>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const clearFrm = () => {
        reset();
        if(errors) {
            clearErrors()
        }
    }

    const onCloseClicked = () => {
        clearFrm();
        onClose();
    }

    const { data: contactsList } = useQuery<Contact[]>("contactsList", getContactsList);

    const campaignTypes: DropDownOption[] = [
        { value: 'marketing', label: 'Marketing' },
        { value: 'educational', label: 'Educational' },
        { value: 'governmental', label: 'Governmental' }
    ]

    const contactsStyles = {
        control: styles => {
            return {
                ...styles,
                borderColor: !errors["contacts"] ? '' : 'red'
            };
        }
    };

    const typeStyles = {
        control: styles => {
            return {
                ...styles,
                borderColor: !errors["type"] ? '' : 'red'
            };
        }
    };

    const addCampaignFunc = useMutation(addNewCampaign, {
        async onSuccess(response: AxiosResponse) {
            toast.success(response.data.message);
            clearFrm();
            onClose();
            refetch();
        },
        onError(error: AxiosError<{ error: string }>) {
            toast.error(error.response?.data.error);
        },
    });

    const onSubmit = (data: NewCampaign) => {     
        if (data?.contacts.length < 5) {
            toast.error('Select at least 5 contacts');
        } else {
            addCampaignFunc.mutate(data);
        }
    }

    const addCampaignForm = () => (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-sm">
                    <div className="form-group">
                        <label className="text-muted">
                            Campaign Name <span className="text_danger"> *</span>
                        </label>
                        <input
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: "Campaign name is required!"
                                }
                            })}
                            type="text"
                            className="form-control"
                            style={{
                                borderColor: !errors.name ? '' : 'red'
                            }}
                            name="name"
                        />
                        {errors["name"] && (
                            <p className="text_danger">{errors["name"].message as string}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Account ID <span className="text_danger"> *</span>
                        </label>
                        <input
                            {...register('accountId', {
                                required: {
                                    value: true,
                                    message: "Account ID is required!"
                                },
                                pattern: {
                                    value: /^\d+$/,
                                    message: "Please enter valid number"
                                }
                            })}
                            type="text"
                            className="form-control"
                            style={{
                                borderColor: !errors.accountId ? '' : 'red'
                            }}
                        />
                        {errors["accountId"] && (
                            <p className="text_danger">{errors["accountId"].message as string}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Type <span className="text_danger"> *</span>
                        </label>
                        <Controller
                            control={control}
                            name="type"
                            rules={{ required: true }}
                            render={({
                                field: { onChange, value },
                            }) => (
                                <Select
                                    menuPlacement="auto"
                                    options={campaignTypes}
                                    isSearchable={true}
                                    value={campaignTypes.find(opt => opt?.value === value) || null}
                                    onChange={(val: DropDownOption) => onChange(val?.value)}
                                    isClearable={true}
                                    styles={typeStyles}
                                />
                            )}
                        />
                        {errors["type"] && <p className="text_danger">This field is required</p>}
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Contacts <span className="text_danger"> *</span>
                        </label>
                        <Controller
                            name="contacts"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isClearable
                                    options={contactsList?.map((state) => {
                                        return {
                                            value: state._id,
                                            label: state.name,
                                        }
                                    }
                                    )}
                                    isMulti={true}
                                    styles={contactsStyles}
                                    maxMenuHeight={150}
                                />
                            )}
                        />
                        {errors["contacts"] && <p className="text_danger">This field is required</p>}
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-between mt-3'>
                <button className='btn btn-outline-primary ms-0' type='button' onClick={() => {
                    clearFrm()
                    onClose()
                }}>
                    Cancel
                </button>
                <button
                    className='btn btn-success confirmation-saving'
                    type="submit"
                >
                    Add Campaign
                </button>
            </div>
        </form>
    )

    return (
        <>
            <ToastContainer />
            <Modal className='add-campaign-modal' show={showModal} onHide={() => onClose()} centered>
                <div className="d-flex justify-content-between align-items-center mx-4 my-3">
                    <div className='add-campaign-modal-title'>Add Campaign</div>
                    <img
                        src={close}
                        alt=''
                        className='add-campaign-modal-close'
                        onClick={() => onCloseClicked()}
                    />
                </div>
                <div className="mx-4">
                    <Modal.Body className='px-0 py-0'>
                        {addCampaignForm()}
                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
}

export default AddCampaign;
