import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPersons} from "../../actions/personActions";
import {Accordion, Button, Container} from "react-bootstrap";
import {Alert} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

class UserList extends Component {
    constructor() {
        super();

        this.state = {
            alertState: false,
            alertMsg: "",
            severity: "success"
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async componentDidMount() {
        const users = await this.props.getPersons();
        this.setState({users: users})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });

        }
    }

    async handleClose(){
        await this.setState({alertState: false})
    }


    async handleEdit(e) {

        const users = await this.props.getPersons();

        localStorage.setItem("Edit", )
        this.setState({severity: "success"})
        this.setState({alertMsg: "User saved"})
        this.setState({alertState: true})
    }

    render() {
        return (
            <Container>
                <h1>User List</h1>
                <p>All the users listed</p>
                <br/>
                <br/>
                <Accordion>
                    {this.state.users.map((user =>
                        <Accordion.Item eventKey={user.id}>
                            <Accordion.Header>
                                    <span>
                                        <b>User: </b> {user.fullName}
                                    </span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <b>Status: </b>{user.status}
                                <br/>
                                <b>Email: </b>{user.username}
                                <Button style={{float: 'right'}} variant="danger" disabled={user.status !== "active"} value={user.id}
                                        onClick={this.handleEdit} name={user.fullName} href="/EditUsers">Ban</Button>{' '}
                                &nbsp;
                            </Accordion.Body>
                        </Accordion.Item>))}
                </Accordion>
                <Snackbar open={this.state.alertState} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} variant="filled" severity={this.state.severity} sx={{ width: '100%' }}>
                        {this.state.alertMsg}
                    </Alert>
                </Snackbar>
            </Container>
        )
    }
}

export default connect(null, {getPersons})(UserList);