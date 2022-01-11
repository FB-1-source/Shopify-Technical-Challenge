import { React, useEffect, useState } from "react";
import axios from "axios";

function Main() {
  const [apod, setapod] = useState();
  const [like, setlike] = useState("");
  const likefeat = () => {
    if (localStorage.getItem("liked") === "true") {
      setlike("Unlike");
      localStorage.setItem("liked", "false");
    } else {
      setlike("Like ❤️");
      localStorage.setItem("liked", "true");
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setapod(response.data);
      });
  }, []);
  return (
    <div>
      <section id="top-sec">
        <h1>Spacestagram</h1>
        <div>Brought to you by NASA Astronomy Picture of the Day API</div>
      </section>
      <div id="container">
        <div id="test">
          {apod ? (
            <section className="sec1">
              {apod.media_type === "image" ? (
                <img id="img-1" alt="astronomy-image" src={apod.url} />
              ) : (
                <iframe
                  id="vid"
                  title="Astronomy Picture of the Day"
                  src={apod.url}
                ></iframe>
              )}
              <div id="info">
                <div id="line-1">
                  {apod.title} - {apod.date}
                </div>
              </div>
              <button onClick={likefeat}>
                {localStorage.getItem("liked") === "true"
                  ? "Unlike"
                  : "Like ❤️"}
              </button>
            </section>
          ) : (
            <h1>Loading...</h1>
          )}
          {console.log(localStorage)}
        </div>
      </div>
    </div>
  );
}

export default Main;
