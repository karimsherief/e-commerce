import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "../../components/CheckoutForm/AddressForm";
import PaymentForm from "../../components/CheckoutForm/PaymentForm";
import Confirmation from "../../components/CheckoutForm/Confirmation";
import { commerce } from "../../lib/commerce";
import { useNavigate, Link } from "react-router-dom";

const STEPS = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const classes = useStyles();
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    generateToken(cart.id);
  }, [cart]);

  async function generateToken(id) {
    try {
      setCheckoutToken(
        await commerce.checkout.generateToken(id, {
          type: "cart",
        })
      );
    } catch {
      if (activeStep !== STEPS.length) navigate("/");
    }
  }
  function nextStep() {
    setActiveStep((step) => step + 1);
  }
  function prevStep() {
    setActiveStep((step) => step - 1);
  }

  async function next(data) {
    setShippingData(data);
    nextStep();
  }

  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        setShippingData={setShippingData}
        next={next}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        prevStep={prevStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        shippingData={shippingData}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {STEPS.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === STEPS.length ? (
            <Confirmation order={order} />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
