const { validateToken } = require("../config/token");

function validateUser (req,res,next) {
const token = req.cookies.token ;
if(!token) return res.sendStatus(401) ;

const {user} = validateToken(token) ;
if(!user) return res.sendStatus(401)

req.user = user ;

next();
}

const isAdmin = (req, res, next) => {
  console.log("Req User", req.user);
  if (req.user.is_admin) {
    next();
  } else {
    res.status(403).send("Acceso denegado"); 
  }
};

module.exports= {validateUser, isAdmin}