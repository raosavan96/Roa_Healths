const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const { usertoken } = req.headers;

    if (!usertoken) {
      return res.json({
        success: false,
        message: "User Not Authorized Login Again.."
      });
    }

    const token_decode = jwt.verify(usertoken, process.env.JWT_SECRET_KEY);

    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false,   message: "Session time out.." || error.message,});
  }
};

module.exports = authUser;
