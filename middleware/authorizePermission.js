const rolePermissions = require("./rolePermissions");

const authorizePermission = (permission) => {
  return (req, res, next) => {
    const permissions = rolePermissions[req.user.role] || [];
    if (!permissions.includes(permission)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};

module.exports = { authorizePermission };
