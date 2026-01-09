const rolePermissions = {
  admin: ["create", "read", "update", "delete"],
  doctor: ["read", "update"],
  patient: ["read"],
};

module.exports = rolePermissions;
