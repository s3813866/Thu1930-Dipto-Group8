import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Search extends Component {
    constructor() {
        super();
        let qtype;
        this.state = {
            search: "",
            qtype: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        console.log("onchange");
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick(e){
        this.state.qtype = e.name;
    }

    onSubmit(e) {
        console.log(true);
        let query = this.state.search;
        if (query.includes(' ')) {
            query.replace(' ', '%20');
            console.log(query);
        }

        if (this.state.qtype == "titleSearch") {
            
        }else if (this.state.qtype == "authorSearch") {
            // let result = fetch(`http://localhost:8080/api/books/author?author=${query}`);
            console.log("searching for author");
            
        } else if (this.state.qtype == "catSearch"){
            
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Search</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Search..."
                                    name="search"
                                    required
                                    onChange = {this.onChange}
                                />
                            </div>
                            <input type="submit" name="titleSearch" value="Search by Title" className="btn btn-info btn-block mt-3" />
                            <input type="submit" name="authorSearch" value="Search by Author" className="btn btn-info btn-block mt-3" />
                            <input type="submit" name="catSearch" value="Search by Category" className="btn btn-info btn-block mt-3" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search