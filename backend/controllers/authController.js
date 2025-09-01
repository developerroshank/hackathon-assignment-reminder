const { USER } = require("../models/user.schema.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

let token = ''

function homeController(req, res) {
  res.send('Home Page');
}

const signUpController = async (req, res) => {
  const { username, email, contact, password } = req.body

  const user = await USER.findOne({ email: email });

  if (user) {
    res.status(401).json({ message: "user already exist", status: 401, success: false });
    return;
  }

  const saltVal = 10;
  const hashedPassword = await bcrypt.hash(password, saltVal);

  const newUser = new USER({
    username, email, contact, password: hashedPassword
  });

  await newUser.save();

  return res.status(200).json({ message: 'User Save Successfully!!', newUser, status: 200, success: true });

}

const loginController = async (req, res) => {
  const { email, password } = req.body

  const user = await USER.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "User Not Found", status: 404, success: false });
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return res.status(301).json({ message: "Ppassword Not Match!!", status: 301, success: false });
  }

  const payload = {
    username: user.username,
    contact: user.contact,
    email: user.email,
    password: user.password
  }

  token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1hr' });

  return res.status(200).json({ message: 'User Login Successfully!!', status: 200, success: true, token });
  // res.send(token);

}

const content = async (req, res) => {
  const { token } = req.body

  const decode = await jwt.verify(token, process.env.SECRET_KEY);
  return res.send(decode);

}

module.exports = { homeController, signUpController, loginController, content }