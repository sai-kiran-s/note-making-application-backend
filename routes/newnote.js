const express = require('express')
const router = express.Router()

const sql = require('../SQLInitialisation')



router.post('/createnote', (req, res, next) => {
  console.log(req.body.note);
  let command = `insert into notes values ('${req.body.username}','${req.body.note}','${req.body.notename}');`
  sql.query(command, function (err, result) {
    if (err) {
      res.send(`Error Occurred ${err}`);
      throw err;
    }
    res.status(200).json({
      notes: result
    })
    console.log(result);
  });
});
module.exports = router;