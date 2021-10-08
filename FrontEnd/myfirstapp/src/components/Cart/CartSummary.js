import React, {Component} from "react";
import bookPic from "../Images/single-red-book-isolated-white-background-113636020.jpg";
import {Container} from "react-bootstrap";
import {Button} from "@mui/material";

class CartSummary extends Component {
    constructor() {
        super();

        this.state = {
            book: JSON.parse(localStorage.getItem("cart")),//book is an array of books that has a price field
            total: JSON.parse(localStorage.getItem("cart")).reduce((a,v) => a = a + v.price, 0)
        };

        this.onRemove = this.onRemove.bind(this);
        this.onDetails = this.onDetails.bind(this);
        this.onPay = this.onPay.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    async onRemove(e) {
        const index = this.state.book.findIndex(({id}) => id === parseInt(e.target.name))
        this.state.book.splice(index,1);
        await localStorage.setItem("cart", JSON.stringify(this.state.book));
        this.setState({total: JSON.parse(localStorage.getItem("cart")).reduce((a,v) => a = a + v.price, 0)});
    }

    async onDetails(e){
        const find = this.state.book.find(({id}) => id === parseInt(e.target.name))
        localStorage.setItem("BookClickedOn", JSON.stringify(find));
    }

    async onPay(){
        //paypal
    }

    render() {
        return (
            <Container >
                <h1>Cart Summary</h1>
                <br/>
                {this.state.book.map(book => <div className="container" data-testid="Request">
                    <div className="card card-body bg-light mb-3">
                        <div className="row">
                            <div className="col-2">
                                <span className="mx-auto"><img src={bookPic} alt="Requests"/></span>
                            </div>
                            <div className="col-lg-6 col-md-4 col-8">
                                <h3>{book.title}</h3>
                                <p>Price: ${book.price}</p>
                            </div>
                            <div className="col-md-4 d-none d-lg-block">
                                <ul className="list-group">
                                    <a>
                                        <br/>
                                        <br/>
                                    </a>
                                    <a>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button variant="contained" color="error" onClick={this.onRemove} name={book.id}>Remove</Button>{' '}
                                        <Button variant="contained" onClick={this.onDetails} name={book.id} href="/BookPage"> Details </Button>
                                    </a>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>)}
                <br/>
                <h1>Total: ${this.state.total}</h1>
                <Button variant="contained" style={{ display: "flex", marginLeft: "auto" }} onClick={this.onPay}>Pay</Button>
            </Container>
        )
    }
}

export default CartSummary;