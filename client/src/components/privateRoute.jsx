import {Navigate} from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const PrivateRoute = ({ component: Component}) => {

    const {isAuthenticated} = useAuthContext();

    return (
        isAuthenticated ? <Component/> : <Navigate to="/login" />
    );
};

export default PrivateRoute;