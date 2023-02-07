import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/commerce.png";
import useStyles from "./styles";

import { Link, useLocation } from "react-router-dom";
const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          className={classes.title}
          color="inherit"
          variant="h6"
        >
          <img
            src={logo}
            alt="commerce.js"
            height="25px"
            className={classes.image}
          />
          E-Commerce
        </Typography>
        <div className={classes.grow} />
        {location.pathname === "/" && (
          <div className={classes.button}>
            <IconButton
              aria-label="Show cart items"
              color="inherit"
              component={Link}
              to="cart"
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
