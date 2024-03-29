import axios from "axios";
import {GET_ERRORS, GET_AUTHOR, GET_BOOK, GET_BOOKS, GET_TITLE, GET_CATEGORY} from "./types";


export const createBook = (book, history) => async dispatch => {
    try {
        const data = await axios.post("http://localhost:8080/api/books/add", book);
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
    const LINK = `http://localhost:8080/api/books/author`;
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


/* Test: EDITBOOK ACTION */
export const editBook = (book, history, id) => async dispatch => {
    const LINK = `http://localhost:8080/api/books/edit/`;
    try {
        const data = await axios.put(`${LINK}/${id}`, book);
        // Update to a new Book-Edited Page
        history.push("/bookAdded");
        console.log("PUT method run successfully");
        dispatch({
            type: "EDIT_BOOK",
            payload: {data}
        });
    } catch (err) {
        history.push("/error");
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }

};
/* Test End: EDITBOOK ACTION */

export const getTitle = (title, history) => async dispatch => {
    const LINK = `http://localhost:8080/api/books/search`;

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
    const LINK = `http://localhost:8080/api/books/search`;
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

export const getBookCSV = () => async dispatch => {
    try {
        const res = await axios.get(`/api/books/export/books.csv`);
        dispatch({
            type: GET_BOOK,
            payload: res.data
        });
        return res.data

    } catch (error) {
        console.log("error")
    }
};

export const getBookByID = (id) => async dispatch => {

    try{
        const res = await axios.get(`http://localhost:8080/api/books/${id}`)
        dispatch({
            type: GET_BOOKS,
            payload: res.data
        })
        console.log("get")
        console.log(res)
        return res.data
    }catch (error){
        console.log("here")
        console.log(error);
    }
    // const dis = useDispatch();
    // return await axios.get().then(({data}) => {
    //     dis({
    //                  type: GET_BOOK,
    //                 payload: data
    //              })
    // })
};

export const getAllBooks = () => async dispatch  => {
    try{
        const res = await axios.get(`http://localhost:8080/api/books`);
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