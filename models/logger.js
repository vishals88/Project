module.exports = (sequelize, DataType) => {
    const Logger = sequelize.define('logger', {
        userId:{
            type: DataType.INTEGER,
            allowNull: false
        },
        token:{
            type: DataType.TEXT
        },
        createdDate:{
            type: DataType.DATE
        },
        expiryDate:{
            type: DataType.DATE
        }
    })

    return Logger;
}
