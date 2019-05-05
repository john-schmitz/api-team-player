import {  Sequelize } from "sequelize";
const globalAny:any = global

if (!global.hasOwnProperty('db')) {
  const Sequelize = require("sequelize");
  let sequelize:Sequelize = null;

  if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL)
  } else {
    sequelize = new Sequelize('team_player', 'root', 'zapzap', {
      host: 'localhost',
      dialect: 'mysql'
    })
  }
 
  globalAny.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(__dirname + '/user') 
    // add your other models here
  }

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

export default globalAny.db;