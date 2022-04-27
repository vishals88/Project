const bcrypt = require('bcrypt'); 
module.exports=(sequelize , DataTypes)=>{
    const User = sequelize.define('user',{
        firstName:{
            type:DataTypes.STRING
        },
        lastName:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        },
        mobileno:{
            type:DataTypes.STRING
        },
        address:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.TEXT
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    },{
        freezeTableName: true,
        tableName: 'user',
    })

// This hook is always run before create.
User.beforeCreate(function (user, options, cb) {
    if (user.password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return err;
                }
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) {
                        return err;
                    }
                    user.password = hash;
                    return resolve(user, options);
                });
            });
        });
    }
});

// This hook is always run before update.
User.beforeUpdate(function (user, options, cb) {
    if (user.password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return err;
                }
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) {
                        return err;
                    }
                    user.password = hash;
                    return resolve(user, options);
                });
            });
        });
    }
});

// Instance method for comparing password.
User.prototype.comparePassword = function (passw, cb) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return err;
            }
            return resolve(isMatch)
        });
    });
};


    //Add_User
    User.addUser = (firstName, lastName, email, mobileno, address) => User.create({ firstName, lastName, email, mobileno, address });

    //Read User By Id
    User.readUserById = (id) => User.findOne({ where: { id, isActive: true }});

    //Update User
    User.updateUser = async (id, firstName, lastName, email, mobileno, address) => {
        let userData = await User.findOne({ where: { id: id, isActive: true } });
        if (userData) {
            delete userData.dataValues.password;
            let userUpdated = await User.update({ firstName, lastName, email, mobileno, address }, { where: { id: id, isActive: true } });
            return userUpdated;
        }
    }

    //Remove User.
    User.removeUser = (id) => User.update({ isActive: false }, { where: { id: id, isActive: true } });


    return User;
}