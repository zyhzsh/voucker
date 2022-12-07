
import { getAccessToken } from '@auth0/nextjs-auth0';
import { getUserId } from '../../utls/userProfile';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {


  if (req.method === 'POST') {
    try {
      const {  
        id,
        voucher_id,
        voucher_name,
        price,
        voucher_imageurl,
        voucher_description
      } = req.body;

      let user_id = '';
      try {
        const { accessToken } = await getAccessToken(req, res);
        // get user Id
        user_id = getUserId(accessToken);
      } catch (error) {
        res.redirect(303,'/');
        return;
      }
      const session = await stripe.checkout.sessions.create({
        line_items: [{
          price_data: {
            currency: 'usd',
            // To accept `ideal`, all line items must have currency: eur
            currency: 'eur',
            product_data: {
              name: voucher_name,
              description:voucher_description,
              images: [
                voucher_imageurl
              ],
            },
            unit_amount: `${price}00`,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin}/orders?success=true`,
        cancel_url: `${req.headers.origin}/orders?canceled=true`,
      });
     res.status(200).json(session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.redirect(303,'/')
  }
}