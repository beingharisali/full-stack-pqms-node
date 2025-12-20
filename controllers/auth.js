const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

// ===================== REGISTER =====================
const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Required fields validation
  if (!firstName || !lastName || !email || !password || !role) {
    throw new BadRequestError("All fields are required");
  }

  // Role validation
  const allowedRoles = ["Admin", "Doctor", "Receptionist"];
  if (!allowedRoles.includes(role)) {
    throw new BadRequestError("Invalid role provided");
  }

  // Check if user already exists
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  // Create JWT token (method from User model)
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

// ===================== LOGIN =====================
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // Compare password (method from User model)
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // Generate token
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    message: "Login successful",
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

module.exports = {
  register,
  login,
};
