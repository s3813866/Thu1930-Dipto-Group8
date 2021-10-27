import React, {Component} from 'react'
import {connect} from "react-redux";
import {Container, Form} from "react-bootstrap";
import {createEnquiry} from "../actions/EnquiryActions";

class Enquiry extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            subject: "",
            message: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors){
            this.setState ({
                errors: nextProps.errors
            });

        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmit(e){
        e.preventDefault();
        console.log("here")
        try{
            const enquiry = {
                name: this.state.name,
                email: this.state.email,
                subject: this.state.subject,
                message: this.state.message
            }

            this.props.createEnquiry(enquiry,this.props.history);
        }catch (error){
            console.log("error");
        }



    }

    render() {
        return (
            <Container>
                <h1 className="h1Contact">Contact us</h1>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter name" onChange={this.onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="subject" name="subject" placeholder="Subject/Title" onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea"
                                      placeholder="Leave your question here"
                                      style={{ height: '100px' }}
                                      name="message"
                                      onChange={this.onChange}/>
                    </Form.Group>

                    <input type="submit" className="btn btn-primary btn-block mt-4"/>
                </Form>
                    {/*<form onSubmit={this.onSubmit} data-testid="Enquire">*/}
                    {/*    <br/>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <input type="text" className="form-control form-control-lg "*/}
                    {/*               placeholder="Name"*/}
                    {/*               name="name"*/}
                    {/*               // value={this.state.name}*/}
                    {/*               // onChange={this.onChange}*/}
                    {/*        />*/}
                    {/*        <br/>*/}

                    {/*    </div>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <input type="text" className="form-control form-control-lg"*/}
                    {/*               placeholder="Email"*/}
                    {/*               name="email"*/}
                    {/*               // onChange={this.onChange}*/}
                    {/*        />*/}
                    {/*        <br/>*/}
                    {/*    </div>*/}

                    {/*    <div className="form-group">*/}
                    {/*        <input type="text" className="form-control form-control-lg"*/}
                    {/*               placeholder="Subject"*/}
                    {/*               name="subject"*/}
                    {/*               // onChange={this.onChange}*/}
                    {/*        />*/}
                    {/*        <br/>*/}
                    {/*    </div>*/}


                    {/*    <div className="form-group">*/}
                    {/*        <input type="text" className="form-control form-control-lg"*/}
                    {/*               placeholder="Message"*/}
                    {/*               name="message"*/}
                    {/*               // onChange={this.onChange}*/}
                    {/*        />*/}
                    {/*    </div>*/}


                    {/*    <input type="submit" className="btn btn-primary btn-block mt-4"/>*/}
                    {/*</form>*/}
            </Container>
        )
    }
}

export default connect(null, {createEnquiry})(Enquiry);
