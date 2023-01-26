import { h } from "preact";
import style from "./style.css";
import React, { Component } from "react";
import { render } from "react-dom";

const Home = () => {
  console.log("hellow world");
  if ("geolocation" in navigator) {
    console.log("Available");
  } else {
    console.log("Not Available");
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  return (
    <div class={style.home}>
      <section>
        <Resource
          title="I know your location"
          description="Your location is ... "
        />
      </section>
    </div>
  );
};

const Resource = (props) => {
  return (
    <a href={props.link} class={style.resource}>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </a>
  );
};

export default Home;
