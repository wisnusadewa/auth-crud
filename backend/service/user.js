const User = require('../models/userModels');

const getUser = async () => {
  const user = await User.find({});
  return user;
};

module.exports = { getUser };
