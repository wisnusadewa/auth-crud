const userService = require('../service/user');

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { getUser };
