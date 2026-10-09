const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jdbase = require("./jdbase");

async function jlogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const juser = await jdbase.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (!juser.rows.length)
      return res.status(401).json({ error: "Invalid email or password" });

    const u = juser.rows[0];

    const ok = await bcrypt.compare(password, u.password);

    if (!ok)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      {
        id: u.id,
        email: u.email,
        role: u.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = jlogin;