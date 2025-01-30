import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function GET(request) {
  const ENVIRONMENTS = {
    GMAIL_APP_USERNAME: process.env.GMAIL_APP_USERNAME || '',
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD || '',
  };
  try{
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: ENVIRONMENTS.GMAIL_APP_USERNAME,
          pass: ENVIRONMENTS.GMAIL_APP_PASSWORD,
    }
  });
  const mailOption = {
    from: ENVIRONMENTS.GMAIL_APP_USERNAME,
    to: 'anderssji94@gmail.com',
    subject: 'New quiz Message',
    html: `
      <h2>Hello quiz user,</h2>
      <h3>Name of item: </h3>
      <p>message: </p> 
      `,
  };

  await transport.sendMail(mailOption);

  return NextResponse.json(
    { message: 'Email Sent Successfully' },
    { status: 200 }
  );
} catch (error) {
  return NextResponse.json(
    { message: 'Failed to Send Email' },
    { status: 500 }
  );
}
  
  // return NextResponse.json({ message: "Hello World" }, { status: 200 });

}