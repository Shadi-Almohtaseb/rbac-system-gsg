import express from 'express'
import { createPermission, createRole, createUser, getAllPermission, getAllRoles, getAllUsers, login } from '../controllers/user.js';
import { authenticate } from '../middleware/auth/auth.js';
const router = express.Router();


/* POST user. */
router.post("/", async (req, res) => {
  try {
    const { email, password, userName, displayName, role } = req.body;
    if (!email || !password || !userName || !displayName || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }
    await createUser(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


/* Login User. */
router.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    login(req.body.email, req.body.password).then((data) => {
      res.status(200).send(data)
    }).catch((error) => {
      res.status(400).send(error)
    })
  } else {
    res.status(404).send("email and password are required")
  }
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
