import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { getUserId } from '../../../../utls/userProfile';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // let user_id = '';
  // //Authenticate user
  // try {
  //   const { accessToken } = await getAccessToken(req, res);
  //   // get user Id
  //   user_id = getUserId(accessToken);
  // } catch (error) {
  //   res.redirect('/');
  //   return;
  // }
  // const {
  //   query: { id },
  // } = req;
  // try {
  //   const result = await axios.post(
  //     `${process.env.BACKEND_URL}/order`,
  //     newOrder
  //   );
  //   if (result) {
  //     res.status(200).json({});
  //   } else {
  //     res.status(400).json({});
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
}
