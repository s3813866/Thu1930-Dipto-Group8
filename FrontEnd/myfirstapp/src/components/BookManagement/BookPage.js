import React, {Component, useState} from 'react'
import {connect} from "react-redux";
import {getBookByID} from "../../actions/bookActions";
import {Container} from "react-bootstrap";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bookPic from "../Images/single-red-book-isolated-white-background-113636020.jpg";
import { Panel } from 'rsuite';
import Paper from "@mui/material/Paper";
import {Button} from "@material-ui/core";

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

            <>

                <Container>
                    <Grid item xs zeroMinWidth>
                        <h2>Book Details</h2>
                    </Grid>
                    <br/>
                    <br/>
                    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
                        <Box sx={{flexGrow: 1}}>
                            <Grid container spacing={2} columns={16}>
                                <Grid item xs={8}>
                                    <img src={bookPic} alt="Books"/>
                                </Grid>
                                <Grid item xs={8}>
                                    <h2>Title: {this.state.book.title}</h2>
                                    <br/>
                                    <h3>Author: {this.state.book.author}</h3>
                                    <br/>
                                    <h3>Category: {this.state.book.category}</h3>
                                    <br/>
                                    <h3>Description: {this.state.book.description}</h3>
                                    <br/>
                                    <h3>Description: {this.state.book.description}</h3>
                                    <br/>
                                    <h3>Price: {this.state.book.price}</h3>
                                    <br/>
                                </Grid>
                                <Grid item xs={7}>

                                </Grid>
                                <Grid item xs={8}>
                                    <Button variant="outlined" onClick={this.onSubmit}>Add to cart</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>


                </Container>
            </>
        )
    }
}

export default connect(null, {getBookByID})(BookPage);


