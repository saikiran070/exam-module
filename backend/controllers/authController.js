const jwt = require("jsonwebtoken");
const SECRET = "supersecret"; // better keep in .env

let users = [];

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { username, email, password };
    users.push(newUser);

    res.status(201).json({
      message: "User registered successfully 🚀",
      user: { username, email }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful 🚀",
      token
    });
  } catch (err) {
    
    res.status(500).json({ message: "Server error" });
  }
};
