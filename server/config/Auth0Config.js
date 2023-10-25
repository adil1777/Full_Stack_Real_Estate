import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience: 'http://localhost:8000' ,
    issuerBaseURL: 'https://dev-bkhop2updo2886ij.us.auth0.com' ,
    tokenSigningAlg: 'PS384' ,
});

export default jwtCheck;
       