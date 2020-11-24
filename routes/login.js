const express = require('express')
const router = express.Router()
const sql = require('../SQLInitialisation')


router.post('/', (req, res) => {
  let command = `select username,userpassword from users`
  sql.query(command, function (err, result) {
    if (err) {
      console.log(err);
      res.send(`Error Occurred ${err}`);
      throw err;
    }
    var check = false;
    result.map((user) => {
      if (req.body.username == user.username && req.body.userpassword == user.userpassword)
        check = true
    })
    console.log(result, "serdftghju");
    if (check == true) {
      console.log(result);
      res.status(200).json({
        token: "123456qwertyu1345"
      })
    }
    else {
      res.status(500).json({
        message: 'Incorrect username or password'
      })
    }

  });

})
module.exports = router;