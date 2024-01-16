import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import User from '../models/user';
import { generateToken } from '../utils/authUtils';
import "dotenv/config";

const router = express.Router();

// Generate a random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Store generated OTPs for users with expiration time (you may want to use a database for production)
const otpStore: { [email: string]: { otp: string; expires: number } } = {};

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
 service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// Function to send OTP email
const sendOTPEmail = (email: string, otp: string) => {


  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Email Confirmation OTP',
    html: `<p>Your OTP is: ${otp}</p>`, 
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
      return error; // Handle the error (e.g., log it, notify admin, etc.)
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Schedule cron job to clean up expired OTPs every minute
cron.schedule('30 15 * * *', () => {
  // Loop through the OTP store and remove expired entries
  for (const email in otpStore) {
    if (otpStore[email].expires < Date.now()) {
      delete otpStore[email];
    }
  }
});


// api/users/register
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Valid email is required").isEmail(),
    check("phoneNo", "Phone Number is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const existingUser = await User.findOne({
        email: req.body.email
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const otp = generateOTP();
      const otpExpiration = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes
      otpStore[req.body.email] = { otp, expires: otpExpiration };

      sendOTPEmail(req.body.email, otp);

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email, 
        phoneNo: req.body.phoneNo,
        password: req.body.password, 
      });

      await newUser.save();

      const token = generateToken(newUser.id);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).send({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);


export default router;