const models = require("../models");
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATIONTIME, JWT_SECRETKEY } = require('../utils/constant');


exports.login = async(req,res)=>{
    try {
    const { userName , password } = req.body;
    let checkUser = await models.user.findOne({ where :{
        [Op.or]:[{email:userName}],
        isActive: true
    }})
    if(!checkUser){
        res.status(401).json({message:"User  Not Found"})
    }
    else{
        let userDetail = await checkUser.comparePassword(password);
        console.log('UserDetail--', userDetail);
        if(userDetail === true){
                let Token = jwt.sign({
                    id:checkUser.dataValues.id,
                    email:checkUser.dataValues.email,
                    isActive:true
                },
                    JWT_SECRETKEY,{
                    expiresIn: JWT_EXPIRATIONTIME
                })
                console.log('Token---', Token);
                const decoded = jwt.verify(Token, JWT_SECRETKEY);
                const createdTime = new Date(decoded.iat * 1000).toGMTString();
                const expiryTime = new Date(decoded.exp * 1000).toGMTString();
                models.logger.create({
                    userId: decoded.id,
                    token: Token,
                    expiryDate: expiryTime,
                    createdDate: createdTime
                });
                res.status(200).json({ message:"login successful", Token, user:checkUser})
        }else{
            res.status(401).json({message:"You Have Entered Wrong Crendials"})
        }
    }
          
} catch (error) {
    console.log(error)    
}
}

exports.logout = async (req, res, next) => {
    let token = await req.headers.authorization.split(" ")[1];
    let logout = await models.logger.destroy({ where: { token: token } });

    client.del(token, JSON.stringify(token));

    return res.status(202).json({ message: `Logout Successfully` })
}