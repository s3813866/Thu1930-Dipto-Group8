import axios from "axios";
import {GET_ENQUIRIES, GET_ERRORS, GET_TITLE} from "./types";

export const createEnquiry = (enquiry, history) => async dispatch =>{
    try{
        const LINK = `http://localhost:8081/api/enquiries/submit`
        const result = await axios.post(LINK,enquiry);
        if(result){
            console.log("ok")
        }
        else{
            console.log("not ok")
        }
        history.push("/home");
    }
    catch (error){
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        })
        console.log(error.message)
    }
}

export const getAllEnquiry = () => async dispatch => {
    try{
        const res = await axios.get(`http://localhost:8081/api/enquiries/all`);
        dispatch({
            type: GET_ENQUIRIES,
            payload: res.data
        })
        console.log(res);
        return res.data;

    }catch (error){

    }
}

export const deleteEnquiry = (id) => async dispatch =>{
    try{
        const LINK = `http://localhost:8081/api/enquiries/delete/`
        const res = await axios.delete(`${LINK}${id.id}`);

    }catch(error){
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        })
    }
}