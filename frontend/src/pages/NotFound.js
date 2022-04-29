import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-header">404</h1>
      <div className="notfound-message">
        SORRY BUT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST, HAVE BEEN
        REMOVED. NAME CHANGED OR IS TEMPORARILY UNAVAILABLE
      </div>
      <Link className="notfound-button">GO TO HOMEPAGE</Link>
    </div>
  );
};

export default NotFoundPage;
