import {Navigate} from 'react-router-dom';
import { useStatusContext } from '../context/displayContext';

const PrivateRoute = ({ component: Component}) => {

    const {isAuthenticated} = useStatusContext();

    return (
        isAuthenticated ? <Component/> : <Navigate to="/login" />
    );
};

export default PrivateRoute;