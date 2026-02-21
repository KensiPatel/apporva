import authRoutes from "./routes/auth.route";
import Team from "./routes/team.route";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { env } from "./config/env";
<<<<<<< HEAD
import userRoutes from "./routes/user_routes";
import cookieParser from "cookie-parser";

=======
import cookieParser from "cookie-parser";
>>>>>>> origin/main

const app = express();

app.use(express.json());
app.use(cookieParser());
<<<<<<< HEAD

=======
>>>>>>> origin/main
app.use(
    cors({
        origin: env.ALLOWED_ORIGIN,
        methods: ["GET", "POST","PATCH","PUT","DELETE"],
        credentials: true,
    }),
);

app.use("/auth", authRoutes);
<<<<<<< HEAD
app.use("/user",userRoutes)

=======
app.use("/team", Team);
>>>>>>> origin/main
app.get("/", (_req: Request, res: Response) => {
    res.json("i am alive!");
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});