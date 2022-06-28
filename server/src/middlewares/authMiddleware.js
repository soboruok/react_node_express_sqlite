//Grab the token that is sent through the front end.
//validate by using jwt function to verify to see if it is valid.

const { verify } = require("jsonwebtoken");

// next() : request move forward,
const validateToken = (req, res, next) => {
  //1)grab the token from front end.
  const accessToken = req.header("accessToken");

  //2)if there is no token, then no access
  if (!accessToken) return res.json({ error: "User not logged in!" });

  //3)verify a token. decode token
  try {
    //if accessToken is importantsecret then token verify.
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    console.log(req.user);

    if (validToken) {
      return next();
    }
  } catch (err) {
    console.error("Something went wrong");
    console.error(err);
  }
};

module.exports = { validateToken };
