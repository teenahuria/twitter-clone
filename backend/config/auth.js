import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const isAuthenticated= (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(decode);
    req.user = decode.id;
    next();
  } catch (error) {
    console.log("Authentication Error:", error);
    return res.status(401).json({
        message: "Unauthorized: Invalid token",
        success: false,
      });
  }
};

export default isAuthenticated;
    