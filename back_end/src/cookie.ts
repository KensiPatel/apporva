import { Response,Request } from "express";
import { env } from "../src/config/env";
import dotenv from "dotenv";
dotenv.config();

const COOKIE_NAME = "token";

function isHttps(req: Request): boolean {
    return req.secure || req.headers["x-forwarded-proto"] === "https";
    }
const isprod = process.env.NODE_ENV === "prod";

export function setAuthCookie(
    req: Request,
    res: Response,
    token: string,
){
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: isHttps(req),
        sameSite: "lax",
    });
}