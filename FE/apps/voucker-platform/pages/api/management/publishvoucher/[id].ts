import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { getUserId } from '../../../../utls/userProfile';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = await getAccessToken(req, res);
  const {
    query: { id },
  } = req;
  const voucherId = id;
  const ownerId = getUserId(accessToken);

  try {
    const result = await axios.patch(
      `${process.env.BACKEND_URL}/voucher/publish/?voucherId=${voucherId}&ownerId=${ownerId}`
    );
    console.log(result.data);
    res.status(200).json(result.data);
  } catch (error) {}
}
