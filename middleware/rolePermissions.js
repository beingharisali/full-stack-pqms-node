const rolePermissions = {
  admin: ["create", "read", "update", "delete"],
  doctor: ["read", "update"],
  receptionist: ["read", "create"],
};

module.exports = rolePermissions;
