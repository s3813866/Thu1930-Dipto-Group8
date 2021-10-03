import React, { Component } from 'react';
import {connect} from "react-redux";
import {banUser, unbanUser, getPersons} from "../../actions/personActions";
import {Accordion, Button, Container} from "react-bootstrap";

class UserStatus extends Component{
    constructor() {
        super();

        this.state = {
            userList: this.props.getPersons(),
            author: "",

        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });

        }
    }

    async onChange(){

    }

    async onSubmit(){

    }

    render() {
        const {errors} = this.state;
        return (
            <>
                <Container>
                    {this.state.userList.map((user =>
                        <Accordion.Item eventKey={user.id}>
                            <Accordion.Header>
                                    <span>
                                        <b>Subject: {user.username}</b>
                                    </span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <br/>
                                <br/>
                                <br/>
                                <Button style={{float: 'right'}} variant="danger" value={user.id} onClick={this.handleDelete}>Delete</Button>{' '}
                            </Accordion.Body>
                        </Accordion.Item>) )}
                </Container>
            </>
        )
    }
}
export default connect(null, {banUser, unbanUser, getPersons})(UserStatus);