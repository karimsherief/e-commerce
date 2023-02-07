import {
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Confirmation = ({ order }) => {
  if (!order.customer) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase, {order.customer.firstname}
          {order.customer.lastname}!
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="subtitle2">
          Order ref: {order.customer_reference}
        </Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">
        Back to home
      </Button>
    </>
  );
};

export default Confirmation;
