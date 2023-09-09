import express from 'express'
import { createPermission, createRole, createUser, getAllPermission, getAllRoles, getAllUsers, login } from '../controllers/user.js';
import { authenticate } from '../middleware/auth/auth.js';
const router = express.Router();


/* POST user. */
router.post("/", (req, res) => {
  createUser(req.body).then(() => {
    res.status(201).send("User created successfully")
  }).catch((error) => {
    res.status(500).send(error)
  })
})

/* Login User. */
router.post("/login", (req, res) => {
  login(req.body.email, req.body.password).then((data) => {
    res.status(200).send(data)
  }).catch((error) => {
    res.status(400).send(error)
  })
})

/* GET users. */
router.get('/', authenticate, (req, res, next) => {
  getAllUsers().then(data => {
    res.status(200).send(data)
  }).catch(error => {
    res.status(404).send(error)
  })
});

/* POST permission. */
router.post('/permission', (req, res, next) => {
  try {
    createPermission(req.body)
    res.status(201).send("permission created successfully")
  } catch (error) {
    res.status(500).send("something went wrong")
  }
});

/* GET Permission . */
router.get('/permission', authenticate, function (req, res, next) {
  getAllPermission().then(data => {
    res.status(200).send(data)
  }).catch(error => {
    console.log(error);
    res.status(500).send("something went wrong")
  })
});

/* POST Role. */
router.post('/role', (req, res, next) => {
  createRole(req.body).then(data => {
    res.status(201).send(data)
  }).catch(error => {
    res.status(500).send("something went wrong")
  })
});


/* GET Roles . */
router.get('/roles', authenticate, function (req, res, next) {
  getAllRoles().then(data => {
    res.status(200).send(data)
  }).catch(error => {
    console.log(error);
    res.status(500).send("something went wrong")
  })
});

export default router;
