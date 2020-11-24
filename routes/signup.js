const express = require('express')
const router = express.Router()
const sql = require('../SQLInitialisation')
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: 'ASIAUGWKPN4SJZL7G3MA',
  secretAccessKey: 'bgNCHHDcZUR8Qw/uq/weW8nvnx/2h14xf8A0UqA/',
  sessionToken: 'FwoGZXIvYXdzEPn//////////wEaDOIlW74ODx93ZlkrZiLWAWspz6VT3GImk0F48DLOsS6TfodDUNwQMfLubLOALm9fqWVfCjIhsZq2rba8kobdp7AogMlmYiZc4/5nVUPJT+V8P4SWluYaHALe5rWNHf5CRyJgCB5N+2N9HBnMcRlFRJnDd9mVTn2PIXT7DrLRO5VoN2c2LWVbVf+ph6SzUtevjeUllymasxkO2YUp6S6pfOYWPiyLStto/1ChncCbJ6/lyhUCSOYXDWOc+kKi4/yrfwSyWyMxBLgY9FPkUNEq/P6311aCw/t7oZ0n2f9zW1gHTp9rOzko75La/QUyLe3JDA1CCN0yw6RbY8AwoWIOqTBdKY9BHbqbif7ikY93fLyQLAa+lYPl3yQVCw==',
  region: 'us-east-1'
});
var s3bucket = new AWS.S3();

var temp = 0;


router.post('/', (req, res, next) => {
  let base64 = req.body.base64;
  base64 = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  let command = `insert into users values ('${req.body.username}','${req.body.userpassword}','${req.body.fname}','${req.body.lname}')`
  sql.query(command, function (err, result) {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY')
      res.status(500).json({
        message:"User already Registered!"
      })
      else{
        res.send(`error occurred ${err.sqlMessage}`);
        res.status(500).json({
          message:"User already Registered!"
        })
      }
 
    }
    else {
      console.log("User Registered!")
      res.status(200).json({
        message:"User Successfully Registered!",
        token: "123456qwertyu1345"
      })
    }
    var params = {
      Bucket: 'note-making-application',
      Key: `${req.body.username}​​​​​.jpg`,
      Body: base64,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    };
    s3bucket.putObject(params, function (err, data) {
      if (err) {
        return res.end("Error storing picture");
      }
      else {
        return res.end("Successfully stored !");
      }
    })

    console.log("user registered");
  });
});
module.exports = router;