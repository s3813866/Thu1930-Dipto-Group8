import React, {Component} from 'react';
import {connect} from "react-redux";
import {banUser, unbanUser, getPersons} from "../../actions/personActions";
import {Accordion, Button, Container} from "react-bootstrap";

class UserStatus extends Component {
    constructor() {
        super();

        this.state = {
            users: [],
            author: "",
        };

        this.handleBan = this.handleBan.bind(this);
        this.handleUnban = this.handleUnban.bind(this);
    }

    async componentDidMount() {
        const users = await this.props.getPersons();
        console.log(users)
        this.setState({users: users})
        console.log(this.state.users)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });

        }
    }

    async handleBan(e) {
        await this.props.banUser(parseInt(e.target.value))
        const users = await this.props.getPersons();
        this.setState({users: users})
    }

    async handleUnban(e) {
        await this.props.unbanUser(parseInt(e.target.value))
        const users = await this.props.getPersons();
        this.setState({users: users})
    }

    render() {
        return (
            <Container>
                <h1>User status</h1>
                <p>all the users are listed here, click to ban or unban them</p>
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
                                        onClick={this.handleBan}>Ban</Button>{' '}

                                <Button style={{float: 'right'}} variant="success" disabled={user.status !== "banned"} value={user.id}
                                        onClick={this.handleUnban}>Unban</Button>{' '}
                                &nbsp;
                            </Accordion.Body>
                        </Accordion.Item>))}
                </Accordion>
            </Container>
        )
    }
}

export default connect(null, {banUser, unbanUser, getPersons})(UserStatus);