import axios from "axios";
import {GET_ERRORS} from "./types";

export const createReview = (review, history) => async dispatch =>{
    try{
        const LINK = `http://localhost:8080/api/reviews/add`
        console.log("here")
        const result = await axios.post(LINK,review);
        if(result){
            console.log("ok")
            history.push("/BookPage")
        }
        else{
            console.log("not ok")
        }
    }
    catch (error){
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        })
        console.log(error.message)
    }
}

export const getReview = (id) => async dispatch => {
    try{
        const LINK = `http://localhost:8080/api/reviews/bookid/`
        const result = await axios.get(`${LINK}${id}`);
        if(result){
            console.log("ok")
            return result.data
        }
        else{
            console.log("not ok")
        }
    }
    catch (error){
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        })
        console.log(error.message)
    }
}
