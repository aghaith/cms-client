import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { logout } from 'store/slices/authSlice';
import { userLogout } from 'api/services/user.services';
import { clearLocalStorageItems } from 'helpers/global';
import * as ROUTES from 'constants/routes'

const Header = () => {

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutFunc = useMutation(userLogout, {
        async onSuccess() {
            clearLocalStorageItems()
            navigate(ROUTES.HOME)
        }
    });

    const onLogout = () => {
        dispatch(logout())
        logoutFunc.mutate();
    }
    
    return (
        <nav className="navbar bg-dark p-2">
            <h1 className='m-0'><Link to={ROUTES.HOME}><i className="fas fa-code"></i> CMS</Link></h1>
            <ul className='m-0'>
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link to={ROUTES.PROFILE}>
                                <i className="fas fa-user"></i>
                                <span className="hide-sm"> Profile</span>
                            </Link>
                        </li>
                        <li>
                            <button className='logout-btn' onClick={onLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span className="hide-sm"> Logout</span>
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to={ROUTES.LOGIN}>Login</Link></li>
                        <li><Link to={ROUTES.REGISTER}>Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Header;