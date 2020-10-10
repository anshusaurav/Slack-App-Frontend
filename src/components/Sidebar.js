import React from "react";
import { Link } from "react-router-dom";
import StandupSidebar from "./StandupSidebar";
import { RiBarChartHorizontalLine } from "react-icons/ri"
import SettingsMenu from "./SettingsMenu"

class Sidebar extends React.Component {
    // const[collapseShow, setCollapseShow] = React.useState("hidden");
    state = { isVisible: false, isMenuVisible: false, profile: null, isUpdated: false };
    setCollapseShow = (isVisible) =>
        this.setState({ isVisible })
    setMenuShow = (isMenuVisible) =>
        this.setState({ isMenuVisible })

    render() {
        const { userProfile, toggleLoggedIn, slackUser } = this.props;
        return (
            <>
                {/* <nav className={`md:left-0 md:block md:fixed top-0 bottom-0 h-full 
                md:overflow-y-auto md:flex-row  
                bg-white flex flex-wrap items-center justify-between w-24 z-20 ${this.state.isVisible ? "" : "shadow-2xl"}`}>
                    <aside className="md:flex-col md:items-center md:min-h-full md:flex-no-wrap px-0 flex flex-wrap 
                    items-center justify-between py-6"> */}
                <nav className="fixed min-h-full top-0 left-0 bottom-0 w-24 z-20 bg-white flex-shrink-0 flex-grow-0">
                    <aside className=" flex flex-col flex-wrap justify-between h-full py-6">
                        <div className="w-full">
                            <div className="w-16 h-16 mb-8 flex items-center justify-center overflow-hidden rounded-circle mx-auto">
                                <Link to="/dashboard">
                                    <img src="/images/bot.png" alt="logo" />
                                </Link>
                            </div>
                            <div className={`transition-all duration-500 ease-in-out flex justify-center p-6 
                            cursor-pointer ${this.state.isVisible ? 'bg-gray-200' : ''}`}
                                onMouseEnter={e => this.setCollapseShow(true)}
                                onMouseLeave={e => this.setCollapseShow(false)}>
                                <RiBarChartHorizontalLine className="font-extrabold text-2xl text-center" />
                            </div>
                        </div>
                        <div className="w-full"
                            onMouseEnter={e => this.setMenuShow(true)}
                            onMouseLeave={e => this.setMenuShow(false)}>
                            <div className="w-12 h-12 mb-8 flex items-center justify-center overflow-hidden rounded-circle mx-auto cursor-pointer"
                            >
                                <img src={`${userProfile.profile.image_72}`}
                                    alt={userProfile.profile.real_name} />

                            </div>
                        </div>
                        <div className={`z-30 fixed left-6 bottom-1 mt-2 w-56 rounded-md shadow-lg ${this.state.isMenuVisible ? 'block' : 'hidden'}`}
                            onMouseEnter={e => this.setMenuShow(true)}
                            onMouseLeave={e => this.setMenuShow(false)} >
                            <SettingsMenu toggleLoggedIn={toggleLoggedIn} />
                        </div>

                    </aside>
                </nav>
                <nav onMouseEnter={e => this.setCollapseShow(true)}
                    onMouseLeave={e => this.setCollapseShow(false)}
                    className={` transition-all duration-500 ease-in-out  fixed top-0 bottom-0 
                    bg-gray-200 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl 
                    flex flex-wrap  justify-between w-64 z-10   
                    ${this.state.isVisible ? "left-6" : "-left-192"}`}>
                    <StandupSidebar slackUser={slackUser} />
                </nav>
            </>
        )
    }
}
export default Sidebar
