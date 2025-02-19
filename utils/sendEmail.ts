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
      await new Promise((resolve, reject) => {
        // verify connection configuration
        transport.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
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
    
      const result = await new Promise((resolve, reject) => {
        transport.sendMail(mailOption, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
                throw new Error ('error sending email' + err);
            } else {
                console.log(info);
                resolve(info);
                
            }
        });
      });
return result        
}