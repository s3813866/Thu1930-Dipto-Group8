import axios from "axios";
import {GET_ERRORS, GET_PERSONS, GET_PERSON, BAN_PERSON} from "./types";

export const createPerson = (person, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/person", person);
    history.push("/home");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getPersons = () => async dispatch => {
  try{
    const res = await axios.get("/api/users/getAllUsers");
    dispatch({
      type: GET_PERSONS,
      payload: res.data
    });
    console.log(res.data)
    return res.data;
  }catch (error) {
    console.log(error.message)
  }

};

export const getPerson = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/person/${id}`);
    dispatch({
      type: GET_PERSON,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const banUser= (id) => async dispatch => {

  try{
    const LINK = `/api/users/ban/`
    const res = await axios.put(`${LINK}${id}`);
    dispatch({
      type: BAN_PERSON,
      payload: res.data
    });

    return res.data;

  }catch(error){

  }
}

export const unbanUser= (id) => async dispatch => {

  try{
    const LINK = `/api/users/unban/`
    const res = await axios.put(`${LINK}${id}`);
    dispatch({
      type: BAN_PERSON,
      payload: res.data
    });
    return res.data;

  }catch(error){

  }
}