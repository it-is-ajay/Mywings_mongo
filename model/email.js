import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    //  let testAccount = await nodemailer.createTestAccount();
    service : "gmail",
    auth : {
        user : "ajey6162@gmail.com",
        pass : "aagdyeekdzhmkhft"
    }
});