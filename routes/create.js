// var express = require('express');
// var router = express.Router();

var router = require('express').Router();
var pg = require('pg');

var config = {database: 'SoloProject'};
var pool = new pg.Pool(config);



router.post('/addNewQuestion', function(req, res) {
  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB, err');
      res.sendStatus(500);
      done()
    } else {
        client.query('INSERT INTO multiple(question, answer1, answer2, answer3, answer4, test_id) VALUES($1, $2, $3, $4, $5, $6)',
        [req.body.question, req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4, req.body.test_id],
          function(err, result) {
          done();
          if (err) {
            console.log('req.params: ', req.params);
            console.log('Error querying DB', err);
            res.sendStatus(500);
          } else {
            console.log('Got info from DB addNewQuestion()', result.rows);
            res.send(result.rows);
          }
        }
      )
    }
  })
})

router.post('/createTestName', function(req, res) {
  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB, err');
      res.sendStatus(500);
      done()
    } else {
      client.query('WITH new_test AS (INSERT INTO tests(testname) VALUES($1) RETURNING *) INSERT INTO test_joins(tests_id, users_id) VALUES((SELECT test_id FROM new_test), $2) RETURNING *;',
      [req.body.testName, req.user.id],
          function(err, result) {
          done();
          if (err) {
            console.log('Error querying DB', err);
            res.sendStatus(500);
          } else {
            console.log('Got info from DB createTestName()', result.rows);
            res.send(result.rows);
          }
        }
      )
    }
  })
})

router.get('/showQuestions/:test_id', function(req, res) {
  console.log('req/res: ', req.params);
  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB, err');
      res.sendStatus(500);
      done()
    } else {
      client.query('SELECT * FROM multiple WHERE test_id = $1',
        // client.query('SELECT * FROM test_joins JOIN multiple ON tests_id = test_id WHERE test_id = $1',
          [req.params.test_id],
          function(err, result) {
            console.log('Grabbing test_id: ', req.params.test_id);
          done();
          if (err) {
            console.log('Error querying DB', err);
            res.sendStatus(500);
          } else {
            console.log('Got saved questions from DB', result.rows);
            res.send(result.rows);
          }
        }
      )
    }
  })
})

// router.post('/saveTest', function(req, res) {
//   console.log(req.body);
//   pool.connect(function(err, client, done) {
//     if(err) {
//       console.log('Error connecting to DB, err');
//       res.sendStatus(500);
//       done()
//     } else {
//         // client.query('WITH new_test AS (INSERT INTO tests(testname) VALUES($1) RETURNING *) INSERT INTO test_joins(tests_id, users_id) VALUES((SELECT test_id FROM new_test), $2);',
//         // [req.body.testName, req.user.id],
//           function(err, result) {
//           done();
//           if (err) {
//             console.log('Error querying DB', err);
//             res.sendStatus(500);
//           } else {
//             console.log('Got info from DB', result.rows);
//             res.send(result.rows);
//           }
//         }
//       // )
//     }
//   })
// })



module.exports = router;
