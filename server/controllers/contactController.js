const Contact = require('../models/Contact');

// POST /api/contact  — saves or emails contact form submission
exports.submitContact = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ msg: 'name, email, subject and message are required' });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newContact.save();

    console.log(`📬 Contact form saved — [${subject}] from ${name} <${email}>`);

    res.status(200).json({ msg: 'Message received. We will get back to you shortly!' });
  } catch (error) {
    console.error('Contact save error:', error);
    res.status(500).json({ msg: 'Server error while saving contact info' });
  }
};
