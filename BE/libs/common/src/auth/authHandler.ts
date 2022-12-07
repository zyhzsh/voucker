const parseJwt = (token: string) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};
const parseToken = (auth: string) => {
  return auth.replace('Bearer ', '');
};

export const GetUserId = (auth) => parseJwt(parseToken(auth)).sub;
