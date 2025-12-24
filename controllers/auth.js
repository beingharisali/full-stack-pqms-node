const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  if (!firstname || !lastname || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.create({
    name: `${firstname} ${lastname}`,
    email,
    password,
    role: role || "user",
  });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      firstname,
      lastname,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  const [firstname, ...lastnameParts] = user.name.split(" ");
  const lastname = lastnameParts.join(" ");

  res.status(StatusCodes.OK).json({
    user: {
      firstname,
      lastname,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

module.exports = { register, login };
