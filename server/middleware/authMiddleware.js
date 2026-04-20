import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // ✅ Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;