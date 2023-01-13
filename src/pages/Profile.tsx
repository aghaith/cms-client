import { useEffect } from "react";
import { useQuery } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { User } from "interfaces/user.model";
import { AxiosError } from "interfaces/errors.model";
import { getUserProfileById } from "api/services/user.services";
import { getUserInfo } from "helpers/global";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    
    const navigate = useNavigate();
    
    const userId : string = getUserInfo().user._id;
    
    const {
        error: errorLoadingUserProfile,
        data: userProfile,
    } = useQuery<
        User,
        AxiosError
    >([userId], getUserProfileById, {
        enabled: userId !== undefined ? true : false
    });

    useEffect(() => {
        if (errorLoadingUserProfile) {
            toast.error(errorLoadingUserProfile?.response?.data.data.message);
        }
    }, [errorLoadingUserProfile]);

    const onBackClick = () => {
        navigate(-1)
    }
    
    return (
        <>
            <section className="container">
                <ToastContainer />
                <button onClick={onBackClick} className='btn btn-success mb-3'>Back</button>
                <div className="profile-grid my-1">
                    <div className="profile-top bg-primary p-2">
                        <h1 className="large">Full Name: {userProfile?.fullname}</h1>
                        <p className="lead">Company: {userProfile?.company}</p>
                        <p>Email: {userProfile?.email}</p>
                        <p>Country: {userProfile?.country}</p>
                        <p>Gender: {userProfile?.gender === 'm' ? 'Male' : userProfile?.gender === 'f' ? 'Female' : '' }</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile;
