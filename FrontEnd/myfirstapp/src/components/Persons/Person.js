import React, { Component } from 'react'
import AdminPic from "./AdminPic.jpg"

class Person extends Component {
    render() {
        return (
            <div className="container" data-testid="person">
                            <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-2">
                                        <span className="mx-auto"><img src={AdminPic} alt="Dog"/></span>
                                    </div>
                                    <div className="col-lg-6 col-md-4 col-8">
                                        <h3>Admin Dashboard</h3>
                                        <p>Delete or ban a user...</p>
                                    </div>
                                    <div className="col-md-4 d-none d-lg-block">
                                        <ul className="list-group">
                                            <a href="#">
                                                <li className="list-group-item board">
                                                    <i className="fas fa-user"> Person Profile </i>
                                                </li>
                                            </a>
                                            <a href="#">
                                                <li className="list-group-item update">
                                                    <i className="fa fa-edit pr-1"> Update Person Info</i>
                                                </li>
                                            </a>
                                            <a href="">
                                                <li className="list-group-item delete">
                                                    <i className="fa fa-minus-circle pr-1"> Ban User</i>
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
export default Person;
