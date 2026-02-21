import authRoutes from "./routes/auth.routes";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { env } from "./config/env";
import userRoutes from "./routes/user_routes";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: env.ALLOWED_ORIGIN,
        methods: ["GET", "POST","PATCH","PUT","DELETE"],
        credentials: true,
    }),
);

app.use("/auth", authRoutes);
app.use("/user",userRoutes)

app.get("/", (_req: Request, res: Response) => {
    res.json("i am alive!");
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});