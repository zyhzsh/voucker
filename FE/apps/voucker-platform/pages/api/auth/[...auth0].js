// pages/api/auth/[...auth0].js
import { handleAuth } from '@auth0/nextjs-auth0';


// export default handleAuth({
//   async login(req, res) {
//     try {
//       await handleLogin(req, res, {
//         authorizationParams: {
//           audience: 'voucker-nestjs-api', // or AUTH0_AUDIENCE
//           onoffline:true,
//           // Add the `offline_access` scope to also get a Refresh Token
//           scope: 'openid profile email' // or AUTH0_SCOPE
//         }
//       });
//       // console.log()
//     } catch (error) {
//       res.status(error.status || 400).end(error.message);
//     }
//   }
// });

export default handleAuth();