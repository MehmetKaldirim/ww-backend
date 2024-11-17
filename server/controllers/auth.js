module.exports.signin = (req, res) => {
  res.status(200).json({
    signin: true,
  });
};

module.exports.signup = (req, res) => {
  res.status(200).json({
    signup: true,
  });
};
