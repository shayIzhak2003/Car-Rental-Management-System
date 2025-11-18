import User from "../models/User.js";

//* Get all users (admin)
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

//* Get single user
export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.json(user);
};

//* Update user theme (DarkMode: true/false)
export const updateUserTheme = async (req, res) => {
  try {
    // Ensure the user is authenticated
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ msg: "Unauthorized" });

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Validate request body
    const { DarkMode } = req.body;
    if (typeof DarkMode !== "boolean") {
      return res.status(400).json({ msg: "Invalid or missing 'DarkMode' value" });
    }

    // Update and save theme
    user.DarkMode = DarkMode;
    await user.save();

    res.status(200).json({ msg: "Theme updated successfully", DarkMode: user.DarkMode });
  } catch (err) {
    console.error("Error updating theme:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

//* Update user (admin)
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, context: 'query' }
    ).select("-password");

    const updatedUser = await User.findById(user._id).select("-password");

    if (!updatedUser) return res.status(404).json({ msg: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// * Delete user (admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

//* Get all users count admin/users (admin)
export const getUserCount = async (req, res) => {
  try{
    const count = await User.countDocuments();
    res.json({ count });
  }catch(err){
    res.status(500).json({ msg: "Server error" });
  }
};

//* Get admin count (admin)
export const getAdminCount = async (req, res) => {
  try{
    const count = await User.countDocuments({ role: "admin" });
    res.json({ count });
  }catch(err){
    res.status(500).json({ msg: "Server error" });
  }
};

//* Get regular users count (admin)
export const getRegularUserCount = async (req, res) => {
  try{
    const count = await User.countDocuments({ role: "user" });
    res.json({ count });
  }catch(err){
    res.status(500).json({ msg: "Server error" });
  }
};