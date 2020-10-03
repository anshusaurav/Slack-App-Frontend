import Loader from "react-loader-spinner";
import React from "react";

export default class LoaderPage extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          zIndex: 99,
        }}
      >
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
}
