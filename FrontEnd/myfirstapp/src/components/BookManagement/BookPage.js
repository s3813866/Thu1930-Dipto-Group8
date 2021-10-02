import React, {Component, useState} from 'react'
import {connect} from "react-redux";
import {getBookByID} from "../../actions/bookActions";
import {Container} from "react-bootstrap";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bookPic from "../Images/single-red-book-isolated-white-background-113636020.jpg";

class BookPage extends Component {
    constructor() {
        super();

        this.state = {
            book: JSON.parse(localStorage.getItem("BookClickedOn"))

        };


        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });

        }
    }


    async onSubmit() {
         if(localStorage.getItem("cart")){
             console.log("exist")
             console.log(this.state.book)
             const cart = JSON.parse(localStorage.getItem("cart"))
             const data = [this.state.book]
             const newCart = cart.concat(data)
             localStorage.setItem("cart", JSON.stringify(newCart))
             console.log(JSON.parse(localStorage.getItem("cart")))
         }else{
             const data = [this.state.book]
             localStorage.setItem("cart", JSON.stringify(data))
         }

         console.log(JSON.parse(localStorage.getItem("cart")))

    }


    render() {
        return (
            <Container>
                <h2>Book Details</h2>
                <br/>
                <br/>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                            <img src={bookPic} alt="Books"/>
                        </Grid>
                        <Grid item xs={8}>
                            <h2>Title: {this.state.book.title}</h2>
                            <br/>
                            <p>Author: {this.state.book.author}</p>
                            <br/>
                            <p>Category: {this.state.book.category}</p>
                            <br/>
                            <p>Description: {this.state.book.description}</p>
                            <br/>
                        </Grid>
                        <Grid item xs={7}>

                        </Grid>
                        <Grid item xs={8}>
                            <button onClick={this.onSubmit}>add to cart</button>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        )
    }
}

export default connect(null, {getBookByID})(BookPage);


