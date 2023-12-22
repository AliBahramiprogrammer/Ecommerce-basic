import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import "./userDetails.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoUrl = "mongodb://localhost:27017/LoginSignUpTutorial";

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));

const JWT_SECRET =
    "fdjlsj4657498d7f9s6fdre87w6d54fg4r8f#sfl@lkfsd&(fghf)sli$sdfas[s;]";

app.use(cors());

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
    const { userName, email, password, isAgree } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        await User.create({
            userName,
            email,
            password: encryptedPassword,
            isAgree,
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.json({ error: "User Not Found" });
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email }, JWT_SECRET);

            if (res.status(201)) {
                return res.json({ status: "ok", data: token });
            } else {
                return res.json({ error: "error" });
            }
        }
    } catch (error) {
        res.json({ status: "error", error: "Invalid Password" });
    }
});

app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;
        User
            .findOne({ email: userEmail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {}
});

app.listen(5000, () => {
    console.log("Server Started");
});
