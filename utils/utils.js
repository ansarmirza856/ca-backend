var SibApiV3Sdk = require("sib-api-v3-sdk");

export const sendEmail = (email, subject, body) => {
  // Sendinblue email API integration
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `${body}`;
  sendSmtpEmail.sender = {
    name: "Crawley Accounts",
    email: "noreply@caaccounts.com",
  };
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.replyTo = { email: "noreply@caaccounts.com" };

  // Send the email
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("Email sent successfully");
    },
    function (error) {
      console.error("Error sending email: ", error);
    }
  );
};
