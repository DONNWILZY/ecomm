
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    /// if user has token, veify here, using jwt verify function
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ error: 'Token is not valid' });
       
      } else {
     return req.user = user;
      next();
      }
    });
  } else {
    return res.json({
      status: "FAILED",
      message: "You are not authenticated"
    })
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not aloowed to that");
    }
  });
};

/////admin routes
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not an admin");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
