import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --- REGISTER (Handles both Student & Admin) ---
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Validation check (Prevents crashing if fields are missing)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // 2. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
    });

    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    // This sends the actual error message to your frontend console
    console.error("Registration Error:", error); 
    res.status(500).json({ message: error.message });
  }
};
// --- LOGIN (Verifies Role for Dashboard) ---
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,   // ✅ NO fallback
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login Error" });
  }
};
