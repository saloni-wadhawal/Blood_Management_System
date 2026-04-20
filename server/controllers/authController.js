import User from "../models/user.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔥 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering user" });
  }
};
// export const register = async (req, res) => {
//   try {
//     const { name, email, password, bloodGroup } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       bloodGroup
//     });

//     await user.save();

//     res.status(201).json({ message: "User registered" });

//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // ❌ remove password before sending
    const { password: _, ...userData } = user._doc;

    res.json({ token, user: userData });

  } catch (err) {
    res.status(500).json(err);
  }
};