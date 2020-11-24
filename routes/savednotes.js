const express = require('express')
const router = express.Router()
const sql = require('../SQLInitialisation')


router.post('/', (req, res, next) => {
  console.log(req.body)
  let command = `select username,notename,note from notes where username='${req.body.username}'`
  sql.query(command, function (err, result) {
    if (err) {
      console.log("viewsavednotes error");
      res.send(`Error Occurred ${err}`);
      throw err;
    }
    res.status(200).json({
      notes: result
    })
    console.log("viewsavednotes", result);
  });
})

module.exports = router;
