const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');

dotenv.config()


const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    
    if (!token) return res.status(401).json("Access Denied");
  
    try {
      const verified = jwt.verify(token,  process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json("Invalid Token");
    }
  };

module.exports = verifyToken;