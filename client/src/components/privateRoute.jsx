import {Navigate} from 'react-router-dom';
import { useStatusContext } from '../context';

const PrivateRoute = ({ component: Component}) => {

    const {isAuthenticated} = useStatusContext();

    return (
        isAuthenticated ? <Component/> : <Navigate to="/login" />
    );
};

export default PrivateRoute;