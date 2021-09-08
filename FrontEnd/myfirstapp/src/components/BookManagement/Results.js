import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Results extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 m-auto">
                        <h1 className="display-4 text-left">Results</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Results