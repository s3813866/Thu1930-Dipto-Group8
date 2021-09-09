import React, { Component } from 'react'
import PropTypes from "prop-types";



class BookAdded extends Component {
    render() {
        return (
            <h1>BOOK ADDED SUCCESSFULLY</h1>

        )
    }
}
BookAdded.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default(BookAdded);
