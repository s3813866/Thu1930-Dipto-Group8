import axios from "axios";
import { useDispatch } from 'react-redux';
import {GET_ERRORS, GET_AUTHOR, GET_BOOK, GET_BOOKS, GET_TITLE, GET_CATEGORY} from "./types";


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

        return res.data
    } catch (error) {
        history.push("/error");
    }

};

export const getTitle = (title, history) => async dispatch => {
    const LINK = `/api/books/search`;

    try {
        const res = await axios.get(`${LINK}?title=${title.title}`);
        dispatch({
            type: GET_TITLE,
            payload: res.data
        });

        return res.data
    } catch (error) {
        history.push("/error");
    }

};

export const getCategory = (category, history) => async dispatch => {
    const LINK = `/api/books/search`;
    try {
        const res = await axios.get(`${LINK}?category=${category.category}`);
        console.log(res.data)
        dispatch({
            type: GET_CATEGORY,
            payload: res.data
        });

        return res.data
    } catch (error) {
        history.push("/error");
    }

};



export const getBookByID = (id) => async dispatch => {

    const dis = useDispatch();
    return await axios.get(`/api/books/${id}`).then(({data}) => {
        dis({
                     type: GET_BOOK,
                    payload: data
                 })
    })
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