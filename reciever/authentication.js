const jwt = require("jsonwebtoken");

module.exports = async function isAuth(req, res, next) {
    //const token = req.headers["authorization"].split(" ")[1];
    const token = req.get("Authorization").replace('bearer ','')
    if (!token) {
      return res.status(404).json({
        Message: "Not found",
      });
    }
    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.json({ message: err });
        } else {
            req.user = user;
            next();
        }

    })
    }
