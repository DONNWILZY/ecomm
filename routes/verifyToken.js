const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.toekn;
  if (authHeader) {
    const token = authHeader.split('')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ error: 'Token is not valid' });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({ error: 'You are not allowed' });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: 'Not allowed' });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization };
