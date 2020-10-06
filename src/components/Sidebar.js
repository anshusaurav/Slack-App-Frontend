import React from "react";
import { Link } from "react-router-dom";
import StandupSidebar from "./StandupSidebar";
import { RiBarChartHorizontalLine } from "react-icons/ri"
import SettingsMenu from "./SettingsMenu"

class Sidebar extends React.Component {
    // const[collapseShow, setCollapseShow] = React.useState("hidden");
    state = { isVisible: false, isMenuVisible: false };
    setCollapseShow = (isVisible) =>
        this.setState({ isVisible })
    setMenuShow = (isMenuVisible) =>
        this.setState({ isMenuVisible })
    render() {
        return (
            <>
                <nav className={`md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap  bg-white flex flex-wrap items-center justify-between relative md:w-24 z-20 ${this.state.isVisible ? "" : "shadow-2xl"}`}>
                    <aside className="md:flex-col md:items-center md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full py-6">
                        <div className="w-full">
                            <div className="w-16 h-16 mb-8 flex items-center justify-center overflow-hidden rounded-circle mx-auto">
                                <Link to="/dashboard">
                                    <img src="/images/bot.png" alt="logo" />
                                </Link>
                            </div>
                            <div className={`transition-all duration-500 ease-in-out flex justify-center p-6 cursor-pointer ${this.state.isVisible ? 'bg-gray-200' : ''}`} onMouseEnter={e => this.setCollapseShow(true)} onMouseLeave={e => this.setCollapseShow(false)}>
                                <RiBarChartHorizontalLine className="font-extrabold text-2xl text-center" />
                            </div>
                        </div>
                        <div className="w-full" onMouseEnter={e => this.setMenuShow(true)} onMouseLeave={e => this.setMenuShow(false)}>
                            <div className="w-12 h-12 mb-8 flex items-center justify-center overflow-hidden rounded-circle mx-auto"
                            >
                                <img src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="logo" />

                            </div>
                        </div>
                        <div className={`z-30 fixed left-6 bottom-1 mt-2 w-56 rounded-md shadow-lg ${this.state.isMenuVisible ? 'block' : 'hidden'}`}
                            onMouseEnter={e => this.setMenuShow(true)}
                            onMouseLeave={e => this.setMenuShow(false)} >
                            <SettingsMenu />
                        </div>

                    </aside>
                </nav>
                <nav onMouseEnter={e => this.setCollapseShow(true)}
                    onMouseLeave={e => this.setCollapseShow(false)}
                    className={` transition-all duration-500 ease-in-out md:block md:fixed md:top-0 md:bottom-0 bg-gray-200 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10   ${this.state.isVisible ? "left-6" : "-left-192"}`}>
                    <StandupSidebar />
                </nav>
            </>
        )
    }
}
export default Sidebar
