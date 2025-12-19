const { UnauthorizedError } = require("../errors");

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Not authorized to access this route");
    }
    next();
  };
};

module.exports = authorizeRoles;
