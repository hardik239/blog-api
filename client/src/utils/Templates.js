let message = "";

let subject = "";

let toEmail = "";

export const ContactTemplate = (Details) => {
  subject = `New message from ${Details.name}`;

  message = `
        <div style="font-family: 'times new roman', times, serif;">
            <h1 style="font-size: 18pt;">Hello sir,</h1>
            <p style="font-size: 14pt;">You got a new message from ${Details.name}:</p>
            <p style="font-size: 14pt;">${Details.message}</p>
            <p style="font-size: 14pt;">you can contact me on ${Details.email}</p>
        </div>
    `;

  toEmail = "ultimateblog.official@gmail.com";

  return {
    message,
    subject,
    toEmail
  };
};

export const VerifyOtpTemplate = ({ username, email, otp }) => {
  message = `
        <div style="font-family: 'times new roman', times, serif;">
            <h1 style="font-size: 18pt;">Hey ${username},</h1>
            <p style="font-size: 14pt;">You're just one step away from setting up your UltimateBlog account.verify your email address by confirming otp.</p>
            <p style="font-size: 14pt;">your otp is : ${otp}</p>
        </div>
    `;

  subject = `Confirm Your Email`;

  toEmail = email;

  return {
    subject,
    toEmail,
    message
  };
};

export const ResetPasswordTemplate = (Details) => {
  message = `
        <div style="font-family: 'times new roman', times, serif;">
            <h1 style="font-size: 18pt;">Hey there,</h1>
            <p style="font-size: 14pt;">We've received a request to reset your password. if you did'nt request it - simply ignore this email.</p>
            <p style="font-size: 14pt;">To reset your password verify otp,</p>
            <p style="font-size: 14pt;">your otp is : ${Details.otp}</p>
        </div>
    `;

  subject = `Reset Your password`;

  toEmail = Details.email;

  console.log(message);

  return {
    subject,
    toEmail,
    message
  };
};
