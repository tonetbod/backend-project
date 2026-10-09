const bcrypt = require("bcryptjs");
const jdbase = require("./jdbase");

async function jreg(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const jhash = await bcrypt.hash(password, 10);

    const juser = await jdbase.query(
      `INSERT INTO users(name, email, password)
       VALUES($1, $2, $3)
       RETURNING id, name, email, role`,
      [name, email, jhash]
    );

    res.status(201).json({
      message: "Registration successful",
      user: juser.rows[0]
    });

  } catch (err) {
    if (err.code === "23505")
      return res.status(400).json({ error: "Email already exists" });

    res.status(500).json({ error: "Server error" });
  }
}

module.exports = jreg;