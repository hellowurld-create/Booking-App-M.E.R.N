import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/authUtils';
import verifyToken from '../middleware/auth';

const router = express.Router();

router.post("/login", [
    check("emailOrPhone", "Email or phone number is required").notEmpty(),
    check("password", "Password with 6 or more characters required").isLength({
        min: 6,
    }),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { emailOrPhone, password } = req.body;

    try {
        // Check if the user exists with the provided email or phone number
        const user = await User.findOne({
            $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }]
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = generateToken(user.id);

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });
        res.status(200).json({ userId: user._id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.send();
})

export default router;
