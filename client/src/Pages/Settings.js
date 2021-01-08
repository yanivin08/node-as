import React, { Component } from 'react'
import Navbar from '../Components/Navbar/Navbar';

export class Settings extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className='settings'>
                    <h1>Settings</h1>
                </div>
            </div>
        )
    }
}

export default Settings
