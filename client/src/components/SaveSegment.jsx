import React from "react";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";


function SaveSegment({ toggleModal }) {
  return (
    <div className="main-div">
     <Navbar/>
      <div className="button-div">
      <Button className="save-button" onClick={toggleModal}>Save segment</Button>
      </div>
    </div>
  );
}

export default SaveSegment;
