import nodemailer from 'nodemailer' //biblioteca para enviar email
import 'dotenv/config.js' //variavel do meu email invisivel

//definindo o serviço de envio Gmail + o email que fará o envio (pede sua senha + email, usei senha de app)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL, //meu email na variavel global
        pass: process.env.PASS, //minha senha de app na variavel global
    }
})

//Envio da mensagem para o email do usuario + mensagem html
function sendEmail(email, bookTitle, userName, duaDate) {
    const mailOptions = {
        from: process.env.EMAIL, //quem envia
        to: email, //quem recebe
        subject: 'Reminder: Book Due Date Approaching',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #f60;">Community Library Reminder</h2>
            <p>Dear ${userName},</p>
            <p>This is a reminder that the book <strong>"${bookTitle}"</strong> is due on <strong>${duaDate}</strong>.</p>
            <p>Please make sure to return or renew it on time.</p>
            <p>Best regards,<br>Your Community Library</p>
        </div>
        `,
    };

    transporter.sendMail(mailOptions, (err, info)=> {
        if(err) {
            console.log('Erro sending email:', err);
        } else {
            console.log('Email set:', info.response)
        }
    });
}

export default sendEmail;