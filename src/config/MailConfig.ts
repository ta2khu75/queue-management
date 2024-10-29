import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "phamngoclansr123@gmail.com",
        pass: " ydcfqgmurhhscsvs",
    },
});
export default transporter