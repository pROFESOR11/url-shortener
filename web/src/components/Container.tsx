import React from "react";
import Div100vh from "react-div-100vh";

interface ContainerProps {
  padding: number;
}

export const Container: React.FC<ContainerProps> = ({ padding, children }) => {
  return (
    <Div100vh className="container" style={{ padding }}>
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        className="App-logo"
        alt="app-logo"
      />
      <h1 className="title">Url Shortener</h1>
      <div className="inner-container">{children}</div>
    </Div100vh>
  );
};
