const jwt = require("jsonwebtoken");

function jauth(req, res, next) {
  const jtoken = req.headers.authorization?.split(" ")[1];

  if (!jtoken)
    return res.status(401).json({ error: "Token required" });

  try {
    req.user = jwt.verify(
      jtoken,
      process.env.JWT_SECRET
    );

    next();

  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = jauth;