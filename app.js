const express = require('express');
const cors = require('cors');
const router = express.Router();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const students = [];

router.get('/', function (req, res) {
  return res.send(students).status(200).end();
});

router.post('/students', function (req, res) {
  console.log('post', req.body);
  students.push(req.body);

  return res.send(req.body).status(200).end();
});

// router.put('/students', function (req, res) {
//   console.log('put', req.body, req.query);

//   const student = students.find((_student) => _student._id === Number(req.query.id));
//   console.log({ student });

//   Object.assign(student, req.body);

//   return res.send(req.body).status(200).end();
// });

router.put('/students/:id', function (req, res) {
  if (!Number(req.params.id)) {
    return res.status(400).send({ error: `${req.params.id} is not a valid id` }).end();
  }

  const body = {
    score: req.body.score,
    age: req.body.age,
    name: req.body.name,
    surname: req.body.surname,
  };

  console.log('put', req.body, req.params);

  const student = students.find((_student) => _student._id === Number(req.params.id));
  console.log({ student });

  Object.assign(student, body);

  return res.send(body).status(200).end();
});

router.delete('/students/:id', function (req, res) {
  const student = students.findIndex((_student) => _student._id === Number(req.params.id));
  if (student === -1) {
    return res.send({ deleted: true }).status(200).end();
  }

  students.splice(student, 1);

  return res.send({ deleted: true }).status(200).end();
});

app.use('/', router);

app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000')
});
