import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import * as ROUTES from 'constants/routes'

type props = {
    outlet: ReactElement
}

export const LoggedOutRoute = (props: props) => {

    const { outlet } = props
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={ROUTES.CAMPAIGNS} replace />;
    }

    return outlet;
};

export const ProtectedRoute = (props : props) => {

    const { outlet } = props
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return outlet;
    }
    
    return <Navigate to={ROUTES.HOME} replace />;
};