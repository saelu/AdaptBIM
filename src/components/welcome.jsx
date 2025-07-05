import React from "react";

export const Welcome = (props) => {
  return (
    <div id="welcome">
      <div className="container">
       
            <div className="welcome-text">
              <h2>Welcome to AdaptBIM</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
        </div>
      </div>
    </div>
  );
};
