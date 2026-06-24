import ApiError from "../utils/ApiError.js";

// Allow specific roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Access denied. Allowed roles: ${roles.join(", ")}`
      );
    }

    next();
  };
};

export { authorizeRoles };