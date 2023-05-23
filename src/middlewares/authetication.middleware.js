const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {

        const token = req.headers["acces-token"];
        if (!token) {
            res.status(401).json({
                error: "No token provided",
            })
        }

        const decoded = jwt.verify(token, "Arbelaez", {
            algorithms: "HS512",
        });

        req.user = decoded;
        next();
        
    } catch (error) {
        res.status(401).json(error);
    }
}

module.exports = authenticate;