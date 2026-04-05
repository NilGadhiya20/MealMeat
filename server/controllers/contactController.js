// POST /api/contact  — saves or emails contact form submission
exports.submitContact = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ msg: 'name, email, subject and message are required' });
  }

  // In production: integrate nodemailer / SendGrid here
  // For now, log and acknowledge
  console.log(`📬 Contact form — [${subject}] from ${name} <${email}>`);

  res.status(200).json({ msg: 'Message received. We will get back to you shortly!' });
};
