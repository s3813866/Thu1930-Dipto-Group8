import React, {Component} from 'react';
import {connect} from "react-redux";
import {banUser, unbanUser, getPersons} from "../../actions/personActions";
import {Accordion, Button, Container} from "react-bootstrap";
import {Alert} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

class UserStatus extends Component {
    constructor() {
        super();

        this.state = {
            users: [],
            author: "",
            alertState: false,
            alertMsg: "",
            severity: "success"
        };

        this.handleBan = this.handleBan.bind(this);
        this.handleUnban = this.handleUnban.bind(this);
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

    async handleBan(e) {
        const name = e.target.name
        await this.props.banUser(parseInt(e.target.value))



        const users = await this.props.getPersons();

        const header = "User "
        const newMessage = header.concat(name," has been banned");

        this.setState({users: users})
        this.setState({severity: "warning"})
        this.setState({alertMsg: newMessage})
        this.setState({alertState: true})
    }

    async handleUnban(e) {
        const name = e.target.name
        await this.props.unbanUser(parseInt(e.target.value))

        const users = await this.props.getPersons();

        const header = "User "
        const newMessage = header.concat(name," has been unbanned");

        this.setState({users: users});
        this.setState({severity: "success"})
        this.setState({alertMsg: newMessage})
        this.setState({alertState: true})
    }

    render() {
        return (
            <Container>
                <h1>User status</h1>
                <p>all the users are listed here, click to ban or unban them</p>
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
                                        onClick={this.handleBan} name={user.fullName}>Ban</Button>{' '}

                                <Button style={{float: 'right'}} variant="success" disabled={user.status !== "banned"} value={user.id}
                                        onClick={this.handleUnban} name={user.fullName}>Unban</Button>{' '}
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

export default connect(null, {banUser, unbanUser, getPersons})(UserStatus);