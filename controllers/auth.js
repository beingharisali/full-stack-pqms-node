// const { StatusCodes } = require('http-status-codes')
// const { BadRequestError, UnauthenticatedError } = require('../errors')
// const User = require('../models/User')

// const register = async (req, res) => {
//     const user = await User.create({ ...req.body })
//     // creating JWT token
//     // there's also alternate of creating JWT token using mongoose in Schema
//     // const token = jwt.sign({
//     //     userId: user._id,
//     //     name: user.name
//     // }, process.env.JWT_SECRET,
//     //     { expiresIn: "30d" }
//     // )
//     const token = user.createJWT()
//     res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
// }

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         throw new BadRequestError("Please provide email and password")
//     }

//     const user = await User.findOne({ email })

//     if (!user) {
//         throw new UnauthenticatedError('Invalid Credentials')
//     }

//     const isPasswordCorrect = await user.comparePassword(password)

//     // compare password
//     if (!isPasswordCorrect) {
//         throw new UnauthenticatedError("Invalid Credentials");
//     }

//     const token = user.createJWT()
//     res.status(StatusCodes.OK).json({
//         user: {
//             name: user.name
//         },
//         token
//     })
// }

// module.exports = {
//     register,
//     login
// }

const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const users = [];

const createJWT = (user) => {
  return jwt.sign(
    { userId: user.userId, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const user = {
    userId: users.length + 1,
    name,
    email,
    password,
    role: role || "user",
  };

  users.push(user);

  const token = createJWT(user);

  res.status(201).json({ user: { name: user.name, role: user.role }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = createJWT(user);

  res.status(200).json({ user: { name: user.name, role: user.role }, token });
};

module.exports = { register, login };
