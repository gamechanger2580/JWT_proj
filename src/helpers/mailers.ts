// domain.com/verifytoken/asssafdfag = server side Component

// domain.com/verifytoken?token=asdsfadf  = client side Component
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3bfc026d9df9a7",
                pass: "4c421e2380ac19"
            }
        })

        const mailOptions = {
            from: 'aditya.ningule@spit.ac.in',
            to: email,
            subject: emailType === 'VERIFY' ? "VERIFY YOUR MAIL" : "RESET YOUR PASSWORD",
            html: `<p> Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to 
            ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} or copy and paste the below link in your browser.<br> ${process.env.domain}/verifyemail?token=${hashedToken}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse


    } catch (error: any) {
        throw new Error(error.message);
    }
}