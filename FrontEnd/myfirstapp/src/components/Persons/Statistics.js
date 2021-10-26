import React, { Component } from 'react'
import StatsPic from "./Stats.jpg"
import {connect} from "react-redux";
import {getBookCSV} from "../../actions/bookActions";
import { CSVLink } from "react-csv";

class Statistics extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            CSV: false
        }
        this.onSubmit = this.onSubmit.bind(this);

    }

    async onSubmit(e){
        console.log("here")
        const res = await this.props.getBookCSV()
        this.setState({data: res})
        this.setState({CSV: true})
    }
    render() {
        return (
            <div className="container" data-testid="stats">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto"><img src={StatsPic} alt="stats"/></span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>Statistic Overview</h3>
                            <p>Get monthly or daily date from website</p>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <a onClick={this.onSubmit}>
                                    <li className="list-group-item board">
                                        <i className="fas fa-file pr-1" > Download CSV</i>
                                    </li>
                                </a>
                                {this.state.CSV === true && (
                                    <a>
                                    <CSVLink data={this.state.data} separator={","}>
                                    Download me
                                    </CSVLink>
                                    </a>
                                    )}

                                <a href="#">
                                    <li className="list-group-item update">
                                        <i className="fas fa-sun"> Daily Statistics </i>
                                    </li>
                                </a>
                                <a href="">
                                    <li className="list-group-item delete">
                                        <i className="fas fa-moon"> Monthly Statistics</i>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, {getBookCSV})(Statistics);
