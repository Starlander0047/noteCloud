const jwt = require('jsonwebtoken');
const JWT_SECRET = "IamAboy";

const fetchuser = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).json({error: "Please authenticate using a valid token"})
    }
    try {
            const data = jwt.verify(token, JWT_SECRET); // this will return the data in the token that you inserted
            req.user = data.user;
            next();

    } catch (error) {
        res.status(401).json({error: "Please authenticate using a valid token"})
        }

}

module.exports = fetchuser;