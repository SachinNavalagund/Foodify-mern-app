import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import {
  createCheckoutSession,
  stripeWebhookHandler,
} from "../controllers/orderController.js";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  createCheckoutSession
);

router.post("/checkout/webhook", stripeWebhookHandler);

export default router;

//shiny-gaily-trendy-gentle
//stripe listen --forward-to localhost:3000/api/order/checkout/webhook

//C:\Users\Sachin\Downloads\stripe_1.21.2_windows_x86_64\stripe login

//The Stripe CLI is configured for your account with account id acct_1PoJLg2NDAg7FGyY

//whsec_158d570f1ac8eb28058b6d379ddd0f59b918065a0a8824ae87283d6e2711425a
