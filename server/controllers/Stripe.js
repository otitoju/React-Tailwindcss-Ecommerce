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

  static async StripeCheckout(req, res) {
    try {
      const YOUR_DOMAIN = 'http://localhost:3000';
      console.log(`Checking`)
      
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/products`,
      });
      console.log(session);

      res.send({ url: session.url });
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = Stripe;