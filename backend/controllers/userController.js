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

//* update user theme
export const updateUserTheme = async (req, res) => {
  try{
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User not found" });
      if(req.body.DarkMode === undefined 
       || req.body.DarkMode === null ||
        typeof req.body.DarkMode !== 'boolean'
      ){
      return res.status(400).json({ msg: "No theme provided" });  
    }
    user.DarkMode = req.body.DarkMode;
  
    await user.save();
    res.json({ msg: "Theme updated", DarkMode: user.DarkMode });
  }catch(err){
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

