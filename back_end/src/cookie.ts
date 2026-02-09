import { Response,Request } from "express";
import { env } from "../src/config/env";

const COOKIE_NAME = "token";

const isprod = env.NODE_ENV === "prod";


function isHttps(req: Request): boolean {
    return req.secure || req.headers["x-forwarded-proto"] === "https";
    }

export function setAuthCookie(
    req: Request,
    res: Response,
    token: string,
){
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
<<<<<<< HEAD
        secure: isprod,
=======
        secure: isHttps(req),
>>>>>>> 1de8b50 (feat: add cookie-based auth middleware with secure detection)
        sameSite: "lax",
    });
}