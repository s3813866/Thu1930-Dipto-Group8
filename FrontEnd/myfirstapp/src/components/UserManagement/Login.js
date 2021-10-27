import React, {useState} from "react";
import axios from "axios";
import {useMutation} from "react-query";
import {Redirect} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {

    const postLogin = async (loginDetails) => {
        return axios.post("http://localhost:8081/api/users/login", loginDetails);
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


    const onSubmit = async (data) => {
      return mutation.mutate(data);
    };

    if (isSuccess === true) {
        console.log(returnFromDB.data);
        localStorage.setItem("token",returnFromDB.data.token);

        return <Redirect to="/home" />;
    }


    return (
      <div className="login" >
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto" data-testid="login">
                <Avatar sx={{ m: 1, color: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
              <h1 className="display-4 text-center">Log In</h1>
                <div className="form-group">
                  <input
                      className="form-control form-control-lg"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                    <br/>
                    <br/>
                </div>
                <div className="form-group">
                  <input
                      className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input type="submit"
                       value="Login"
                       sx={{ mt: 3, mb: 2 }}
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