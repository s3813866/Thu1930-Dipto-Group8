import React, {Component} from 'react'
import {connect} from "react-redux";
import {Container, Form} from "react-bootstrap";
import {createReview} from "../actions/ReviewAction";
import axios from "axios";

class AddReview extends Component {
    constructor() {
        super();

        this.state = {
            heading: "",
            rating: "",
            reviewText: "",
            bookId: "",
            userId: ""
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
        const LINK = `http://localhost:8081/api/users/tokenid/`
        const token = localStorage.getItem("token").replace(/^Bearer\s+/, "")
        const user = await axios.get(`${LINK}${token}`)
        const userId = eval(JSON.stringify(user.data))
        const bookId = localStorage.getItem("BookClickedOn")
        console.log(userId)
        console.log(bookId)

        try{
            const review = {
                heading: this.state.heading,
                rating: this.state.rating,
                reviewText: this.state.reviewText,
                bookId: bookId,
                userId: userId
            }

            console.log("here")
            console.log(review)
            this.props.createReview(review,this.props.history);
        }catch (error){
            console.log("error");
        }

    }

    render() {
        return (
            <Container>
                <h1 className="h1Contact">Add Review</h1>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Heading</Form.Label>
                        <Form.Control type="text" name="heading" placeholder="Heading.." onChange={this.onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" min="0" max="5" name="rating" placeholder="Rating.." onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Addition Comments</Form.Label>
                        <Form.Control as="textarea"
                                      placeholder="Review Comments..."
                                      style={{ height: '100px' }}
                                      name="reviewText"
                                      onChange={this.onChange}/>
                    </Form.Group>

                    <input type="submit" className="btn btn-primary btn-block mt-4"/>
                </Form>
            </Container>
        )
    }
}

export default connect(null, {createReview})(AddReview);
