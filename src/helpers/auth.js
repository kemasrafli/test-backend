const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, 'secret-key', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
    });
};

module.exports = verifyToken;