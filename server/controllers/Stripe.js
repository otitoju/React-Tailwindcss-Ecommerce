const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

class Stripe {
    static async StripePayment(req, res) {
        try {
            stripe.charges.create(
                {
                  source: req.body.tokenId,
                  amount: req.body.amount,
                  currency: "usd",
                },
                (stripeErr, stripeRes) => {
                  if (stripeErr) {
                    res.status(500).json(stripeErr);
                  } else {
                    res.status(200).json(stripeRes);
                  }
                }
              );
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = Stripe;