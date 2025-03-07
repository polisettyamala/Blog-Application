import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization denied...!" });
  }

  try {
    const token = authToken.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decodedToken.id;
    req.role = decodedToken.role;
    req.name = decodedToken.name;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Invaild token " });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    const userRole = user.role;

    // For user
    if (userRole === "user" && roles.includes("user")) {
      // Allow the user to run next function
      next();
    } else if (userRole === "admin" && roles.includes("admin")) {
      next();
    } else {
      return res
        .status(401)
        .json({
          success: false,
          message: `${userRole} is not allowed to access this API.`,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: " Server error...!" });
  }
};
