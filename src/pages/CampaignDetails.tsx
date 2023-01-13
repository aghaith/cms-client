import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AxiosError } from "interfaces/errors.model";
import { Campaign } from "interfaces/campaign.model";
import { Contact } from "interfaces/contact.model";
import { getCampaignById } from "api/services/campaigns.services";
import { getContactsList } from "api/services/contacts.services";
import { dateFormmaterNoTime } from "helpers/global";
import ContactsList from "components/contacts-list/contacts-list.component";
import * as ROUTES from 'constants/routes';

const CampaignDetails = () => {

    const { id } = useParams();

    const {
        error: errorLoadingCampaign,
        data: campaign,
    } = useQuery<
        Campaign,
        AxiosError
    >([id], getCampaignById, {
        enabled: id !== undefined ? true : false
    });

    useEffect(() => {
        if (errorLoadingCampaign) {
            toast.error(errorLoadingCampaign?.response?.data.data.message);
        }
    }, [errorLoadingCampaign]);

    const { data: contactsList } = useQuery<Contact[]>("contactsList", getContactsList);

    const fetchMoreData = () => contactsList?.filter((contact: Contact) => campaign?.contacts?.includes(contact?._id)).map((contact: Contact) => {
        return contact
    })

    return (
        <>
            <section className="container">
                <ToastContainer />
                <Link to={ROUTES.CAMPAIGNS} className='btn btn-success mb-3'>Back</Link>
                <div className="profile-grid my-1">
                    <div className="profile-top bg-primary p-2">
                        <h1 className="large">Name: {campaign?.name}</h1>
                        <p className="lead">Tye: {campaign?.type}</p>
                        <p>accountId: {campaign?.accountId}</p>
                        <p>Created At: {dateFormmaterNoTime(campaign?.dateCreated as string)}</p>
                    </div>
                </div>
                <h2 className="my-2">Contacts</h2>
                <div className="row h-100">
                    <div className="col-lg-12 col-md-6 col-sm-12 col-12">
                        <div
                            id='scrollableDiv'
                            style={{
                                overflow: 'auto',
                                flexDirection: 'column-reverse',
                                height: 250,
                                border: '1px solid blue'
                            }}
                        >
                            <ContactsList 
                                fetchMoreData={fetchMoreData}
                            />
                        </div>
                    </div>
                </div>
                <span>Total Contacts: {fetchMoreData()?.length}</span>
            </section>
        </>
    )
}

export default CampaignDetails;
