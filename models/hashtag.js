const Sequelize = require("sequelize");

class Hashtag extends Sequelize.Model{

    static initiate(sequelize){
        Hashtag.init({
            title:{
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true
            }
        },{
            sequelize,
            timestamps: true,
            underscore: false,
            modelName: "Hashtag",
            tableName: "hashtag",
            paranoid: false, 
            charset:"utf8",
            collate: "utf8mb5_general_ci"
        })
    }
    static associate(db){
        db.Hashtag.belongsToMany(db.Post, {through:"PostHashtag"});
    }
}

module.exports = Hashtag;