import React, { Component } from 'react'
import Navbar from '../Components/Navbar/Navbar';
export class Team extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className='user'>
                    <h1>Team</h1>
                </div>
            </div>
        )
    }
}

export default Team
