const Brevo = require('@getbrevo/brevo');

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendPasswordResetEmail = async (email, resetToken, userName) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  
  console.log('URL de réinitialisation générée:', resetUrl);
  
  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  
  sendSmtpEmail.sender = {
    name: process.env.SENDER_NAME || 'Speakmate',
    email: process.env.SENDER_EMAIL || 'noreply@speakmate.com'
  };
  
  sendSmtpEmail.to = [{ email, name: userName }];
  sendSmtpEmail.subject = "Réinitialisation de votre mot de passe";
  
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: #667eea; color: white; padding: 40px 20px; text-align: center; }
        .content { padding: 30px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Réinitialisation de mot de passe</h1>
        </div>
        <div class="content">
          <p>Bonjour <strong>${userName}</strong>,</p>
          <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" class="button">Réinitialiser mon mot de passe</a>
          </div>
          <p>Ou copiez ce lien :</p>
          <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
          <p><strong>Ce lien expire dans 1 heure.</strong></p>
          <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
        </div>
        <div class="footer">
          <p>Email automatique - Ne pas répondre</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email envoyé avec succès');
    return result;
  } catch (error) {
    console.error('Erreur envoi email:', error);
    throw new Error('Impossible d\'envoyer l\'email');
  }
};

module.exports = { sendPasswordResetEmail };