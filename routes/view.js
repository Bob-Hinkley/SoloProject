
var router = require('express').Router();
var pg = require('pg');

var config = {database: 'SoloProject'};
var pool = new pg.Pool(config);


router.get('/showTests', function(req, res) {
  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB, err');
      res.sendStatus(500);
      done()
    } else {
        client.query('SELECT * FROM multiple JOIN test_joins ON multiple.test_id = test_joins.tests_id JOIN tests ON test_joins.tests_id = tests.test_id WHERE users_id = $1',
          [req.user.id],
          function(err, result) {
          done();
          if (err) {
            console.log('Error querying DB', err);
            res.sendStatus(500);
          } else {
            console.log('Got Test list from tests DB', result.rows);
            res.send(result.rows);
          }
        }
      )
    }
  })
})

router.get('/showQuestions/:test_id', function(req, res) {
  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB, err');
      res.sendStatus(500);
      done()
    } else {
        client.query('SELECT * FROM multiple WHERE test_id = $1',
        [req.params.test_id],
          function(err, result) {
          done();
          console.log('Getting test_id: ', req.params.test_id);
          // console.log('req.body.test_id  = ', req.body.test_id);
          if (err) {
            console.log('Error querying DB', err);
            res.sendStatus(500);
          } else {
            console.log('Got questions from multiple table', result.rows);
            res.send(result.rows);
          }
        }
      )
    }
  })
})

router.delete('/deleteTests/:test_id', function(req, res) {
  pool.connect(function(err, client, done) {
    var test = req.params.test_id;
    var tests = req.params.tests_id;
    console.log('IDs');
    if(err) {
      console.log('Error connecting to DB, err');
      res.sendStatus(500);
      done()
    } else {
        client.query('DELETE FROM tests WHERE test_id = $1', [test],
        // client.query('DELETE FROM test_joins WHERE tests_id = $1', [tests]);
        // client.query('DELETE FROM tests WHERE test_id = $1', [test],
        // 'DELETE FROM test_joins WHERE tests_id = $2; DELETE FROM tests WHERE test_id = $3; COMMIT;',
        // [req.body.test_id, req.body.test_id, req.body.test_id],
          function(err, result) {
          done();
          console.log('Deleted Test: ', test);
          // res.send(result.rows);
          if (err) {
            console.log('Error querying DB', err);
            res.sendStatus(500);
          } else {
            console.log('Got Test list from tests DB', result.rows);
            res.send(result.rows);
          }
        }
      )
    }
  })
})

module.exports = router;
