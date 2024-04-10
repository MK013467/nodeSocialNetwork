const { sequelize, User, Post } = require('./index'); // Adjust path as necessary
const Sequelize = require("sequelize")
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env]

describe("db Test" , () =>{
    beforeAll(async () => {
        mockedSequelize = new Sequelize(config.database, config.username , config.password, config);
        await mockedSequelize.sync({ force: true });
      });
      
      afterAll(async () => {
        await sequelize.close();
      });
      
      test('User and Post models exist', () => {
        expect(User).toBeDefined();
        expect(Post).toBeDefined();
      });
      
      test('static associate', () => {
          const db = {
            User: {
              hasMany: jest.fn(),
              belongsToMany: jest.fn(),
            },
            Post: {},
          };
          User.associate(db);
          expect(db.User.hasMany).toHaveBeenCalledWith(db.Post);
          expect(db.User.belongsToMany).toHaveBeenCalledTimes(2);
        });
})

