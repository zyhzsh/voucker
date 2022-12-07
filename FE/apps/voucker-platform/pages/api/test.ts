import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function getAnswersByQuestionId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);
  console.log('tttttttttttttt');
  res.status(200).json({ accessToken });
}
