export const isVendor = (token: string) => {
  if (parseJwt(token)['voucker-platform/role'].includes('Vendor')) {
    return true;
  }
  return false;
};

const parseJwt = (token: string) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};
