import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { RiLogoutBoxRLine, RiWindow2Line, RiListSettingsLine, RiCapsuleLine } from 'react-icons/ri'
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
                    <button className="block px-4 py-2 align-baseline text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                        <RiListSettingsLine className="w-4 h-4 inline-block text-blue-500" /> Account settings(soon)</button>
                    <button className="block px-4 py-2 align-baseline text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                        <RiCapsuleLine className="w-4 h-4 inline-block text-blue-500" /> Support(soon)</button>
                    <button className="block px-4 py-2 align-baseline text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                        <RiWindow2Line className="w-4 h-4 inline-block text-blue-500" />   License(soon)</button>
                    <button onClick={this.handleLogout} className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                        <RiLogoutBoxRLine className="w-4 h-4 inline-block text-blue-500" />    Sign out
                    </button>

                </div>
            </div>
        )
    }
}
export default withRouter(SettingsMenu)