import { useUserContext } from "./useUserContext";
import { useNavigate } from 'react-router-dom';


export const useLogout = () => {
    const { dispatch } = useUserContext();
    const navigate = useNavigate();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')
        localStorage.removeItem('cart')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})

        // navigate to home
        console.log('logging out, returning to home page')
        navigate('/')
    }

    return {logout}
}