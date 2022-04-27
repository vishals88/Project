const models = require('../models'); // importing models.
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;
const paginationFUNC = require('../utils/pagination'); // importing pagination function.

exports.addUser = async(req,res)=>{
    const {firstName, lastName, email, password, mobileno, address} = req.body
    const createUser = await models.user.create({firstName, lastName, email, password, mobileno, address});
    if(!createUser){
        res.status(400).json({message:"User Not Created"})
    }
    else{
        res.status(201).json({message:"User Created Successfully",createUser})
    }
}

exports.readUserById = async(req,res)=>{
    try {
    
    const id = req.params.id;
    const userData = await models.user.readUserById(id)
    if(!userData){
        res.status(404).json({message:"User Not Found"})
    }
    else{
        res.status(200).json(userData)
    }
        
} catch (error) {
     console.log(error)   
}
}

exports.getUser = async(req,res)=>{
    const { search, offset, pageSize } = paginationFUNC.paginationWithFromTo(
        req.query.search,
        req.query.from,
        req.query.to
    );

    const searchQuery = {
        [Op.and]: [query, {
          [Op.or]: {
            "$user.firstName$": {
              [Op.iLike]: "%" + search + "%"
            },
            "$user.lastName$": {
              [Op.iLike]: "%" + search + "%"
            },
            "$user.email$": {
              [Op.iLike]: "%" + search + "%"
            },
            "$user.mobileno$": {
              [Op.iLike]: "%" + search + "%"
            }
          },
        }],
        isActive: true,
      };

    const userData = await models.user.findAll({
            where: searchQuery,
            isActive:true,
            limit: pageSize,
            offset: offset
    })
    if(!userData){
        res.status(404).json({message:"Users Not Found"})
    }
    else{
        res.status(200).json(userData)
    }
}

exports.editUser = async(req,res)=>{
    try {
    const id = req.params.id
    const { firstName,lastName,email,mobileno, address } = req.body;
    let updateData = await models.user.updateUser( id,firstName,lastName,email,mobileno, address )
    if(updateData[0] === 0){
        res.status(404).json({message:"User Not Found"})
    }
    else{
        res.status(200).json({message:`User ${id} Updated Successfully`})
    }
} catch (error) {
       console.log(error) 
}
}

exports.deleteUser = async(req,res)=>{
    const id = req.params.id
    const userData = await models.user.removeUser(id)
    if(!userData){
        res.status(404).json({message:"User Not Found"})
    }
    else{
        res.status(200).json({message:`User ${id} Deleted Successfully`})
    }
}