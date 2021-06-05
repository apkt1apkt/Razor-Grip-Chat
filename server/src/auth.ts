import jwt, { GetPublicKeyOrSecret } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const { AUTH_AUDIENCE: audience, AUTH_ALGORITHM: algorithm, AUTH_URI: jwksUri, AUTH_ISSUER: issuer } = process.env;

const client = jwksClient({ jwksUri });

const getKey: GetPublicKeyOrSecret = (header, callback) => {
  client.getSigningKey(header.kid, (_: any, key: any) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

export const verify = (token?: string): Promise<Obj | null> => {
  token = (token || "").split(" ")[1];
  return new Promise((resolve) => {
    if (!token) return resolve(null);
    const options = { audience, issuer, algorithms: [algorithm as any] };
    jwt.verify(token, getKey, options, (err, decoded) => {
      if (err) resolve(null);
      resolve(decoded || {});
    });
  });
};
