import React from "react";
import { Link } from "react-router-dom";

class GMT extends React.Component {
    // const[collapseShow, setCollapseShow] = React.useState("hidden");
    state = { collapseShow: "hidden" };
    setCollapseShow = (collapseShow) =>
        this.setState({ collapseShow })

    render() {
        return (

            <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">

            </div>


        )
    }
}
export default GMT
