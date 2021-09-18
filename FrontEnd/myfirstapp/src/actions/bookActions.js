import axios from "axios";
import {GET_ERRORS, GET_AUTHOR, GET_BOOK, GET_BOOKS} from "./types";

export const createBook = (book, history) => async dispatch => {
    try {
        const data = await axios.post("/api/books/add", book);
        history.push("/bookAdded");
        dispatch({
            type: GET_ERRORS,
            payload: {data}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getAuthor = (author, history) => async dispatch => {
    const LINK = `/api/books/author`;
    try {
        const res = await axios.get(`${LINK}?author=${author.author}`);
        dispatch({
            type: GET_AUTHOR,
            payload: res.data
        });
        // console.log(res.data);
        return res.data
    } catch (error) {
        history.push("/error");
    }

};



export const getBook = () => async dispatch => {
    try {
        const res = await axios.get(`/api/books/`);
        dispatch({
            type: GET_BOOK,
            payload: res.data
        });
        return res.data
    } catch (error) {
        console.log("error")
    }
};

export const getAllBooks = () => async dispatch  => {
    try{
        const res = await axios.get(`/api/books`);
        dispatch({
            type: GET_BOOKS,
            payload: res.data
        })
        console.log("get")
        console.log(res)
        return res.data

    }catch (error){
        console.log(error);
    }

}