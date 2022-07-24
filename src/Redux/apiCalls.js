import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { Users } from "../Api/User_mock_data";

export const login = async (dispatch, enteredEmail, enteredPassword) => {
    dispatch(loginStart());
    try {
        //const res = await fetch("http://localhost:4000/login", { user});
        
        const res = await Users.filter( el => { return el.email === enteredEmail && el.password === enteredPassword });
        if(res.length === 1) {
            dispatch(loginSuccess(res));
        }
        else {
            dispatch(loginFailure());
        }
        //dispatch(loginSuccess(res));
    } catch (error) {
        dispatch(loginFailure());
    }
}
