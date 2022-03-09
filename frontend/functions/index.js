const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    // eslint-disable-next-line max-len
    "sk_test_51KW15bIE280HGVnbOMa0dE8HDd9iQAltlPZQTDPRnHd8VnJ7j2mYvzj8hAdc4DNyk42gzWfoDEergs0Ipll4P2uz00tWycv4bs",
);

// API

// - APP config
const app = express();

// - Middlewares

app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());

// - API routes
app.get("/", (request, response) => {
  response.status(200).send("test api");
});

app.post("/payments/create", async (req, resp) => {
  const total = req.query.total;

  console.log("payment request receive    ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK - Created successfully
  resp.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command

exports.api = functions.https.onRequest(app);

