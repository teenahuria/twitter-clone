import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    // 🔑 USE TOKEN_SECRET (matches .env)
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
req.user = decoded.userId; // Now req.user is a string ID, which your controllers expect
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isAuthenticated;
