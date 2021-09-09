import axios from "axios";
import { GET_ERRORS, GET_AUTHOR, GET_BOOK } from "./types";

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

    try {
        const res = await axios.get("http://localhost:8080/api/books/author", {params: {author: author}});
        dispatch({
            type: GET_AUTHOR,
            payload: res.data
        });
        console.log(res.data);
    } catch (error) {
        history.push("/error");
    }
};



export const getBook = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/books/${id.id}`);
        dispatch({
            type: GET_BOOK,
            payload: res.data
        });
        console.log(res.data.title);
        console.log(res.data.description);
    } catch (error) {
        history.push("/dashboard");
    }
};