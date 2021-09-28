import axios from "axios";
import {GET_ENQUIRIES, GET_ERRORS} from "./types";

export const createEnquiry = (enquiry, history) => async dispatch =>{
    try{
        const LINK = `/api/enquiries/submit`
        const result = await axios.post(LINK,enquiry);
        history.push("/home");
    }
    catch (error){
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getAllEnquiry = (history) => async dispatch => {
    try{
        const res = await axios.get(`/api/enquiries/all`);
        dispatch({
            type: GET_ENQUIRIES,
            payload: res.data
        })
        console.log(res);
        return res.data;
        
    }catch (error){

    }
}