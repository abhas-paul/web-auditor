declare module "jsonwebtoken" {
  import { JwtPayload } from "jsonwebtoken";
  const jwt: {
    sign(payload: string | object | Buffer, secretOrPrivateKey: string, options?: any): string;
    verify(token: string, secretOrPublicKey: string, options?: any): string | JwtPayload;
    decode(token: string, options?: any): null | { [key: string]: unknown } | string;
  };
  export default jwt;
}
