import React, {useState} from "react";
import axios from "axios";
import {useMutation} from "react-query";
import {Redirect} from "react-router-dom";

function Login() {

    const postLogin = async (loginDetails) => {
        return axios.post("/api/users/login", loginDetails);
    };


    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const loginDetails = {
      username: Username,
      password: Password,
    };


    const mutation = useMutation(() => {
      return postLogin(loginDetails);
    });

    const { data: returnFromDB, isSuccess } = mutation;

    // console.log(returnFromDB);


    const onSubmit = async (data) => {
      return mutation.mutate(data);
    };

    if (isSuccess === true) {
        // console.log("login good")

        console.log(returnFromDB.data.token);

        return <Redirect to="/register" />;
    }


    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input type="submit"
                       className="btn btn-info btn-block mt-4"
                       onClick={onSubmit}
                />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;