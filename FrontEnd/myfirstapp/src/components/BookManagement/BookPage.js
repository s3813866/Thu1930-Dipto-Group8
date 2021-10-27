import React, {Component} from 'react'
import {connect} from "react-redux";
import {getBookByID} from "../../actions/bookActions";
import {getReview} from "../../actions/ReviewAction";
import {Container} from "react-bootstrap";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bookPic from "../Images/single-red-book-isolated-white-background-113636020.jpg";
import Paper from "@mui/material/Paper";
import {Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {Rating} from "@mui/material";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import pdf from "../Images/Free Best Binder Cover Template US.pdf"
import '@react-pdf-viewer/core/lib/styles/index.css';

class BookPage extends Component {
    constructor() {
        super();

        this.state = {
            book: "",
            bookReviews: []
        };


        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount(){
        const bookid = parseInt(localStorage.getItem("BookClickedOn"))
        const bookObj = await this.props.getBookByID(bookid)
        const reviews = await this.props.getReview(bookid)

        if(bookObj){
            this.setState({book: bookObj})
        }
        if(reviews){
            this.setState({bookReviews: reviews})
        }


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
                    <br/>
                    <br/>
                    <h2>Reviews</h2>
                    <br/>

                    <Paper>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {this.state.bookReviews.map((review =>
                                <>
                                    <ListItem alignItems="flex-start" key={review.id}>
                                    <ListItemAvatar>
                                        <Avatar alt="Cindy Baker" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={review.heading}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    <Rating name="read-only" value={review.rating} readOnly />
                                                    <br/>
                                                    {review.reviewText}
                                                </Typography>

                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                    <Divider variant="inset" component="li"/>
                                </>

                            ))}
                        </List>
                    </Paper>
                    <br/>
                    <Button variant="outlined" href="/AddReview">Add review</Button>
                    <br/>
                    <br/>
                    <br/>

                    <h2>PDF Preview</h2>
                    <br/>
                    <br/>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                height: '750px',
                            }}
                        >
                            <Viewer fileUrl={pdf} />
                        </div>
                    </Worker>
                    <br/>
                    <br/>
                </Container>
            </>
        )
    }
}

export default connect(null, {getBookByID, getReview})(BookPage);


