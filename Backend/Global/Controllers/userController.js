// controllers/userController.js
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // تحقق إذا كان المستخدم موجود مسبقًا
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // إنشاء مستخدم جديد
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

module.exports = { registerUser };