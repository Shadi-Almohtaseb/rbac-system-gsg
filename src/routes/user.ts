import express from 'express'
import { createUser, getAllUsers, login } from '../controllers/user.js';
import { authorized } from '../middleware/auth/auth.js';
const router = express.Router();


/* POST user. */
router.post("/", (req, res) => {
  createUser(req.body).then(() => {
    res.status(201).send("User created successfully")
  }).catch((error) => {
    res.status(500).send(error)
  })
})

/* POST user. */
router.post("/login", (req, res) => {
  login(req.body.email, req.body.password).then((data) => {
    res.status(200).send(data)
  }).catch((error) => {
    res.status(400).send(error)
  })
})

/* GET users. */
router.get('/', authorized, (req, res, next) => {
  getAllUsers().then(data => {
    res.status(200).send(data)
  }).catch(error => {
    res.status(404).send(error)
  })
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

export default router;
