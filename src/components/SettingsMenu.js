import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SettingsMenu extends Component {

    handleLogout = (event) => {
        event.preventDefault();
        localStorage.clear();
        this.props.toggleLoggedIn();
        this.props.history.push('/');
    }
    render() {
        return (

            <div className="rounded-md bg-white shadow-xs">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                        Account settings</button>
                    <button className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                        Support</button>
                    <button className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                        License</button>
                    <button onClick={this.handleLogout} className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                        Sign out
                    </button>

                </div>
            </div>
        )
    }
}
export default withRouter(SettingsMenu)