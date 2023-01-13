import { Modal } from 'react-bootstrap';
import close from 'assets/images/close.svg';
import './confirmation-modal.scss';

type Props = {
    title: string,
    message: string,
    cancelBtnTitle: string,
    confirmBtnTitle: string,
    onConfirm: () => void,
    onClose: () => void
    showModal: boolean,
    type: string
};

const ConfirmationModal = (props: Props) => {

    const { title, message, cancelBtnTitle, confirmBtnTitle, onConfirm, onClose, showModal, type } = props;

    const onCloseClicked = () => {
        onClose();
    }

    return (
        <Modal className={'confirmation-modal ' + type} show={showModal} onHide={() => onClose()} centered>
            <div className="d-flex justify-content-between align-items-center mx-4 my-3">
                <div className='confirmation-modal-title'>{title}</div>
                <img
                    src={close}
                    alt=''
                    className='confirmation-modal-close'
                    onClick={() => onCloseClicked()}
                />
            </div>
            <div className="mx-4">
                <Modal.Body className='px-0 py-0'>
                    <div>{message}</div>
                    <div className='d-flex justify-content-between mt-3'>
                        <button className='btn btn-outline-primary ms-0' onClick={() => onClose()}>
                            {cancelBtnTitle}
                        </button>
                        <button
                            className={`btn ${type === 'confirmation-danger' ? 'btn-danger'
                                : type === 'confirmation-primary' ? 'btn-primary'
                                    : type === 'confirmation-saving' ? 'btn-success' : ''}`}
                            onClick={() => onConfirm()}
                        >
                            {confirmBtnTitle}
                        </button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;
