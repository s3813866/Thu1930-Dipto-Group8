import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";


export const createNewUser = (newUser, history) => async dispatch => {

    try {

        await axios.post("http://localhost:8080/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch (err) {
        console.log(err.response);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });



    }

};

export async function getUserType(bearerToken) {
    const LINK = `/api/users/type`
    try {
        const res = await axios.get(`${LINK}/${bearerToken}`);

        const retUser = eval(JSON.stringify(res.data));
        console.log("User Type: ");
        console.log(retUser);

        sessionStorage.setItem("userType", retUser);

        return retUser;

    } catch (error) {
        console.log("getUser Error");
    }
};

export function setUserType() {
    if (localStorage.length > 0) {
        const accountTypeToken = localStorage.getItem("token").replace(/^Bearer\s+/, "");
        console.log(accountTypeToken);
        getUserType(accountTypeToken);
    }
    return sessionStorage.getItem("userType");
    //const accountType = sessionStorage.getItem("userType");
}

export const login = LoginRequest => async dispatch => {
    try {

        //post => login request

        //extract token from res.data

        //set our token in the local storage

        // set our token in header 

        //decode the token on React

        // dispatch to our securityReducer

    }
    catch (err) {

    }


}


