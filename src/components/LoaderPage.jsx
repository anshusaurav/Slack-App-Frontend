import Loader from "react-loader-spinner";
import React from "react";

class LoaderPage extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eee",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          zIndex: 99,
        }}>
        <Loader type="Audio" color="#00BFFF" height={100} width={100} />
      </div>
    )
  }
}

class MainSectionLoader extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eee",
          height: "100vh",
          width: "100%",
          position: "fixed",
          zIndex: 0,
        }}
      >
        <Loader type="Bars" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
}

class AllStandupsLoader extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(238, 238, 238)",
          zIndex: "0",
          width: "100%",
          height: "100vh"
        }}
      >
        <Loader type="Bars" color="#00BFFF" />
      </div>
    )
  }
}

class InsightsLoader extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(238, 238, 238)",
          zIndex: "0",
          width: "100%",
          height: "60vh"
        }}
      >
        <Loader type="Bars" color="#00BFFF" />
      </div>
    )
  }
}

export { LoaderPage, MainSectionLoader, AllStandupsLoader, InsightsLoader }