import React from "react";
import "./home.css";

function Home({ scrollToCard }) {
  return (
    <div className="main-content">
      <div className="intro">
        <h1>
          Make Your Home.
          <br />
          Modern Design.
        </h1>
        <p>
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          minus modi illum cumque velit consectetur?
        </p>
        <button onClick={scrollToCard}>Learn More</button>
      </div>
    </div>
  );
}

export default Home;
