import nodemailer from "nodemailer";

const getTransporter = () => {
  const host = process.env.SMTP_HOST || "server104.web-hosting.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || "ul@universalloan.us";
  const pass = process.env.SMTP_PASS || "Qpo1OnTLhpM2UsOn";

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });
};

const formatHTML = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb; }
    .container { max-width: 900px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #ffffff; padding: 24px; border-bottom: 3px solid #5B2E91; }
    .header-title { font-size: 24px; font-weight: bold; color: #1f2937; margin: 0; display: flex; align-items: center; }
    .header-icon { margin-right: 12px; }
    .timestamp-box { background-color: #F3E8FF; border-left: 4px solid #5B2E91; padding: 16px; margin: 24px; border-radius: 4px; }
    .timestamp-text { margin: 0; color: #5B2E91; font-weight: 600; }
    .section { margin: 24px; }
    .section-header { background-color: #f3f4f6; padding: 12px 16px; border-left: 4px solid #5B2E91; margin-bottom: 16px; }
    .section-title { font-size: 16px; font-weight: bold; color: #1f2937; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .field { background-color: #ffffff; border: 1px solid #e5e7eb; padding: 12px 16px; border-radius: 4px; }
    .field-label { font-size: 12px; font-weight: 600; color: #5B2E91; text-transform: uppercase; margin: 0 0 4px 0; }
    .field-value { font-size: 14px; color: #1f2937; margin: 0; word-wrap: break-word; }
    .full-width { grid-column: span 2; }
    .footer { background-color: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 12px; margin-top: 32px; }
    @media only screen and (max-width: 600px) {
      .grid { grid-template-columns: 1fr; }
      .full-width { grid-column: span 1; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="header-title">
        <span class="header-icon">📋</span>
        New Form Submission Received
      </h1>
    </div>
    
    <div class="timestamp-box">
      <p class="timestamp-text">Submitted: ${new Date().toISOString()}</p>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">📌 Submission Details</h2>
      </div>
      <div class="grid">
        ${Object.entries(data).map(([k, v]) => `
        <div class="field">
          <p class="field-label">${k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
          <p class="field-value">${v || "N/A"}</p>
        </div>
        `).join('')}
      </div>
    </div>
    
    <div class="footer">
      <p>This application was submitted successfully via the Website System.</p>
      <p>&copy; ${new Date().getFullYear()} Universal Loan. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const formatText = (data) => `New Form Submission Received

${Object.entries(data).map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${v}`).join('\n')}
`;

export const sendLoanApplicationEmail = async (data) => {
  const recipientEmail = process.env.RECIPIENT_EMAIL || "ul@universalloan.us";
  const emailFromName = process.env.EMAIL_FROM_NAME || "Universal Loan Applications";
  const smtpUser = process.env.SMTP_USER || "ul@universalloan.us";

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"${emailFromName}" <${smtpUser}>`,
    to: recipientEmail,
    subject: `New Loan Application - ${data.firstName || data['First Name'] || 'Applicant'} ${data.lastName || data['Last Name'] || ''}`.trim(),
    text: formatText(data),
    html: formatHTML(data),
  });
};
