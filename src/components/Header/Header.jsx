import React, { useState } from "react";
import "./_header.scss";
import { NavLink } from "react-router-dom";
import BitcoinLogo from "../../assets/images/wrapped-bitcoin-wbtc-logo.svg";
import Hamburger from "../../assets/images/menu.svg";

export function Header() {
  const [display, setDisplay] = useState("hide");

  function changeBtnDisplay() {
    setDisplay((prevState) => prevState === "show"? "hide": "show");
  }
  return (
    <div className="header main-container">
      <div className="header-container">
        <h2>
          <img className="logo" src={BitcoinLogo} alt="" /> Mister Bitcoin
        </h2>
        <div className={"flex btn-container" + " " + display}>
          <button className="clean-btn">
            <NavLink exact to="/">
              Home
            </NavLink>
          </button>
          <button className="clean-btn">
            <NavLink exact to="/Contacts">
              Contacts
            </NavLink>
          </button>
          <button className="clean-btn">
            <NavLink exact to="/Statistics">
              Statistics
            </NavLink>
          </button>
          <button className="clean-btn">
            <NavLink exact to="/signup">
              Log Out
            </NavLink>
          </button>
        </div>
        <img
          onClick={changeBtnDisplay}
          className="hamburger"
          src={Hamburger}
          alt=""
        />
      </div>
    </div>
  );
}
