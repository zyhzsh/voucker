import { NextApiResponse, NextApiRequest } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);
  console.log(accessToken);
  return res.status(200).json(`acc token is:${accessToken}`);
}
