import React, { Component } from 'react'
import Person from './Persons/Person'
import CreatePersonButton from './Persons/CreatePersonButton';
import Statistics from "./Persons/Statistics";

class Dashboard extends Component {
    render() {
        return (
            <div className="Persons">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Admin</h1>
                        <br />
                       <CreatePersonButton />
                        <br />
                        <hr />
                        <Person/>
                        <Statistics/>
                    </div>
                </div>
            </div>
        </div>
    
        )
    }
}
export default Dashboard;
