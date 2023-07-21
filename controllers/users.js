const { Users } = require("../models");

exports.register = (req,res) => {
  console.log("body",req.body) ;
  Users.create(req.body).then((user)=> {
    console.log("user",user);
    res.status(201).send(user)
})}

exports.login = (req,res) => {
    const{email, password} = req.body ;

    Users.findOne({where:{email}}).then((user)=>{
      if(!user) return res.sendStatus(401)

      user.validatePassword(password)
      .then(isValid => {
if (!isValid) return res.sendStatus(401)
      

});
    })

}



/* exports.signUp = async (req, res) => {
  try {
    const searchUser = await Users.findOne({
      where: { email: req.body.email },
    });

    if (searchUser) {
      return res.status(400).send("Este usuario ya existe");
    }
    const newUser = await Users.create(req.body);
    res.status(200).send(newUser);
  } catch (error) {
    console.log("ERROR", error);
    res.send(error.message);
  }
};
 */