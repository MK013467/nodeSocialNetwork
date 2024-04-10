const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static initiate(sequelize){
        User.init({
            email: {
                type:Sequelize.STRING(40),
                allowNull:true,
                unique:true,
            },
            nick: { 
                type: Sequelize.STRING(15),
                allowNull:false,
                unique:true
            },
            password:{
                type:Sequelize.STRING(40),
                allowNull:false
            },
            provider:{
                type: Sequelize.ENUM("local", "kakao"),
                allowNull:false
            },
            snsid:{
                type: Sequelize.STRING(40),
                allowNull:false
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "User",
            tableName: "users",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
        );
    }
    static associate(db){
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User,{
            foreignKey: "followingId",
            as: "Followers",
            through: "Follow"
        });
        db.User.belongsToMany(db.User, {
            foreignKey: "followingId",
            as: "Followings",
            through: "Follow",
        })
    }
}

module.exports = User;