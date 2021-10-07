import React, { Component } from 'react'
import {connect} from "react-redux";
import {deleteEnquiry, getAllEnquiry} from "../../actions/EnquiryActions";
import {Accordion, Button, Container} from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";

class ManageEnquiry extends Component{
    constructor() {
        super();

        this.state = {
            id: "",
            enquiries: [],
            alertState: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    async onSubmit(e) {
        e.preventDefault();
        const data = await this.props.getAllEnquiry();
        if(data){
            this.setState({enquiries: data.slice()});

        }
        else{
            console.log("not working")
        }

    }
    async handleDelete(e){
        const id = {
            id: e.target.value,
        }
        try{
            await this.props.deleteEnquiry(id);
            const data = await this.props.getAllEnquiry();
            if(data){
                this.setState({enquiries: data.slice()})
                this.setState({alertState: true});
            }
            else{
                this.setState({enquiries: []})
            }
        }
        catch(error){
            console.log(error.message);
        }



    }

    render(){
        return (
            <Container>
                <h1>User Enquiries</h1>
                <br/>
                <br/>
                <Button variant="primary" onClick={this.onSubmit}>Show Enquiries</Button>{' '}
                <br/>
                <br/>
                <Accordion>
                    {this.state.enquiries.map((enquiry =>
                            <Accordion.Item eventKey={enquiry.id}>
                                <Accordion.Header>
                                    <span>
                                        <b>Subject: </b> {enquiry.subject}
                                    </span>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {enquiry.message}
                                    <br/>
                                    <br/>
                                    <br/>
                                    <Button style={{float: 'right'}} variant="danger" value={enquiry.id} onClick={this.handleDelete}>Delete</Button>{' '}
                                    Sent By: {enquiry.name}
                                    <br/>
                                    Email: {enquiry.email}
                                    <br/>
                                </Accordion.Body>
                            </Accordion.Item>
                            ))}
                </Accordion>
                <Snackbar open={this.state.alertState} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="warning" sx={{ width: '100%' }}>
                        Enquiry deleted!
                    </Alert>
                </Snackbar>
            </Container>
        )
    }
}

export default connect(null, {getAllEnquiry, deleteEnquiry})(ManageEnquiry);