import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import "./userDetails.js";
import nodeMailer from "nodemailer";

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
            const token = jwt.sign({ email: user.email }, JWT_SECRET, {
                expiresIn: 10,
            });

            if (res.status(201)) {
                return res.json({ status: "ok", data: token });
            } else {
                return res.json({ error: "error" });
            }
        } else {
            return res.json({ error: "Password is incorrect." });
        }
    } catch (error) {
        res.json({ status: "error", error: "Invalid Password" });
    }
});

app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });

        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired." });
        }

        const userEmail = user.email;
        User.findOne({ email: userEmail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {}
});

app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign(
            { email: oldUser.email, id: oldUser._id },
            secret,
            {
                expiresIn: "5m",
            }
        );
        var transporter = nodeMailer.createTransport({
            service: "gmail",
            logger: true,
            secure: true,
            debug: true,
            secureConnection: false,
            auth: {
                user: "Your email",
                pass: "password",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        var mailOptions = {
            from: "Your email",
            to: `${email}`,
            subject: "Reset your password",
            text: `http://localhost:5173/reset_password/${oldUser._id}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.send({ Status: "Success" });
            }
        });

    } catch (error) {
        res.send(error);
    }
});

// app.post("/reset-password/:id/:token", async (req, res) => {
//     const { id, token } = req.params;
//     const { password } = req.body;
//     const oldUser = await User.findOne({ _id: id });
//     if (!oldUser) {
//         return res.json({ status: "User Not Exists!!" });
//     }
//     // const secret = JWT_SECRET + oldUser.password;
//     try {
//         // const verify = jwt.verify(token, secret);
//         const encryptedPassword = await bcrypt.hash(password, 10);
//         await User.updateOne(
//             {
//                 _id: id,
//             },
//             {
//                 $set: {
//                     password: encryptedPassword,
//                 },
//             }
//         );
//          res.send({status: "Success"})
//     } catch (error) {
//         console.log(error);
//         res.send("Not Verified");
//     }
// });

app.post("/reset_password/:id", async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    // const secret = JWT_SECRET + oldUser.password;
    try {
        // const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );
         res.send({status: "Success"})
    } catch (error) {
        console.log(error);
        res.send("Not Verified");
    }
});

app.listen(5000, () => {
    console.log("Server Started");
});
