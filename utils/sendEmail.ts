import nodemailer from 'nodemailer';

export default async function sendEmail(quizName:string,
    bccArray:string[], 
    quizStatus: 'quizOpening' | 'quizClosing' 
) {
    console.log('quizName:', quizName);
    console.log('bccArray:', bccArray);

    const ENVIRONMENTS = {
        GMAIL_APP_USERNAME: process.env.GMAIL_APP_USERNAME || '',
        GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD || '',
      };
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: ENVIRONMENTS.GMAIL_APP_USERNAME,
              pass: ENVIRONMENTS.GMAIL_APP_PASSWORD,
        }
      });
      //Quiz status used to determine both message and Title
      const mailOption = {
        from: ENVIRONMENTS.GMAIL_APP_USERNAME,
        bcc: bccArray,
        subject: `Update about ${quizName}`,
        html: `
          <h2>Hello quiz user,</h2>
          <h3>Name of quiz: ${quizName}</h3>
          <p>message:${quizStatus === 'quizOpening' ? `A new quiz, ${quizName}, has opened` : quizStatus === 'quizClosing' ? `Your quiz, ${quizName}, is now overdue` : ''} </p> 
          `,
      };
    
      await transport.sendMail(mailOption);
    
}