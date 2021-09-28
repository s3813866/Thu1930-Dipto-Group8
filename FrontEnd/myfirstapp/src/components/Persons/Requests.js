import React, { Component } from 'react'
import Request from "./requests-suggestion-box-wants-desires-submit-ideas-the-word-requests-on-a-suggestion-box-for-drawing_csp14024007.jpg";

class Requests extends Component {
    render() {
        return (
            <div className="container" data-testid="Request">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto"><img src={Request} alt="Requests"/></span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>Requests and Enquiries</h3>
                            <p>Reject or accept user requests and answer Enquiries...</p>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <a href="#">
                                    <li className="list-group-item board">
                                        <i className="fa fa-edit pr-1"> Requests from users</i>
                                    </li>
                                </a>
                                <a href="#">
                                    <li className="list-group-item update">
                                        <i className="far fa-question-circle"> Questions from users</i>
                                    </li>
                                </a>
                                <a href="">
                                    <li className="list-group-item delete">
                                        <i className="fas fa-user-check" > Account verification</i>
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
export default Requests;
