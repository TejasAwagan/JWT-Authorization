const admin = async (req, res) => {
  res.json({ message: "Welcome Admin" });
};
const manager = async (req, res) => {
  res.json({ message: "Welcome manager" });
};
const user = async (req, res) => {
  res.json({ message: "Welcome User" });
};

module.exports = {
  admin,
  manager,
  user,
};
