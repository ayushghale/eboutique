import NodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export function OtpMail(email, subject, otpCode) {
  const adminEmail = process.env.MAIL_USERNAME;
  const password = process.env.MAIL_PASSWORD;

  const transporter = NodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: adminEmail,
      pass: password,
    },
  });

  const html = `
        <h1>Dear valued customer,</h1>
        <p>
          To verify your email address <u>${email}</u>, please enter the following code in the verification page:
        </p>
    
        <b>${otpCode}</b>
    
        <p>It is important that we have your correct e-mail address on our records for us to send you important notices,
        This process will ensure just that.</p>
    
        <p>Thank you for your business!</p>
    
        <p>With best regards,</p>`;

  const sendMail = () => {
    const mailOptions = {
      from: adminEmail,
      to: email,
      subject: subject,
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error.message, 500; // Handle error response here
      } else {
        return "Email sent", 200; // Handle success response here
      }
    });
  };

  sendMail();
}

export function OrderBill(email, subject, data) {
  const adminEmail = process.env.MAIL_USERNAME;
  const password = process.env.MAIL_PASSWORD;

  const transporter = NodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: adminEmail,
      pass: password,
    },
  });

  const html = `
        <h1>Dear valued customer,</h1>
        <p>
          Thank you for shopping with us. Please find your order details below:
        </p>

        <table>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          ${data.map((item) => {
            return `
              <tr>
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
              </tr>
            `;
          })}
        </table>

        <p>Thank you for your business!</p>

        <p>With best regards,</p>`;

  const sendMail = () => {
    const mailOptions = {
      from: adminEmail,
      to: email,
      subject: subject,
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error.message, 500; // Handle error response here
      } else {
        return "Email sent", 200; // Handle success response here
      }
    });
  };
  sendMail();
}
