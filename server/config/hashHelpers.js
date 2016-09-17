const bcrypt = require("bcrypt-nodejs");
const Promise = require("bluebird");

module.exports = {};

module.exports.hashPassword = (password) => {
  return new Promise(
    (resolve, reject)=>{
      bcrypt.genSalt(10, (error, salt)=>{
        if(error){
          reject(error)
        }
        bcrypt.hash(password, salt, null, (err, hash)=>{
          if(err){
            reject(err)
          }
          resolve(hash);
        })
      })
    }
  )
};
