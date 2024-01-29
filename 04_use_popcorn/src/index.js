import React from "react";
import ReactDOM from "react-dom/client";
/* import "./index.css";
import App from "./App"; */
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*     <App />
     */}
    <StarRating maxRating={10} />
    <StarRating maxRating={5} />
    <StarRating
      size={32}
      color={"#f433"}
      maxRating={3}
      messages={["bad", "ok", "good"]}
    />
  </React.StrictMode>
);
