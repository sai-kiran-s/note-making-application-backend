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
  let username = req.body.username;
  let command = "select fname,lname,username from users where username='"+username+"'";
  sql.query(command, function (err, result) {
    if (err) {
      return res.send(`error occurred ${err.sqlMessage}`);
    }
    else {
      command = "select count(*) as count from notes where username='"+username+"'";
      sql.query(command, function (err, result1) {
        if(err){
          res.status(500).json({ message:`error occurred ${err.sqlMessage}` })
        }
        else{
          console.log(`${req.body.username}.jpg`);
      var params = { Bucket: 'note-making-application', Key: username+"​​​​​.jpg", ResponseContentType: 'application/jpg' };
      s3bucket.getObject(params, function (err, data) {
        if (err) {
          console.log(err);
          res.status(500).json({ message:`error retrieving picture ${err}` })
        }
        else {
          const picture = 'data:image/jpeg;base64,' + Buffer.from(data.Body).toString('base64');
          console.log({ result,result1, picture })
          res.status(200).json({ result,result1, picture })
        }
      });
        }
      })
      
    }


    console.log("user registered");
  });
});
module.exports = router;