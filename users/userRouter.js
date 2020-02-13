const express = require('express');
const userDB = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => { //validateuser
  const name = req.body.name;
  if(name){
    userDB.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "There was a failure spell cast while saving to the database"});
    });
  } else {
    res.status(400).json({ message: "Please provide a name for your quest seeker"});
  }  
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  //validateuserid
});

router.get('/', (req, res) => {
  userDB.get(req.query)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    res.status(500).json({ message: 'Error retrieving users'});
  });
});

router.get('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  userDB.getById(id)
  .then(user => {
    if(user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "User with specified ID does not exist"});
    }
  })
  .catch(error => {
    res.status(500).json({ message: "The user information could not be retrieved"});
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if(!id){
    res.status(400).json({ message: "The user with the specified ID does not exist"});
  } else {
    userDB.remove(id)
    .then(user => {
      res.status(200).json({ message: "The user has succumb to the Eye of Sauron!"})
    })

  }
  
  
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if(!id) {
    res.status(404).json({ message: "The user you seek does not exist"});
  } else {
    userDB.update(id, changes)
    .then(change => {
      res.status(200).json(change);
    })
    .catch(error => {
      res.status(500).json({ message: "Your magic is too weak to change the world."});
    });
  }
});

//custom middleware

function validateUserId(req, res, next) {
  const userID = req.params.id

  if(!userID){
    res.status(400).json({ message: "Invalid user id"});
  } else {
    userDB.getById(userID)
    .then(user => {
      console.log("Yay user id matches")
      next();
    })
    .catch(error => {
      res.status(500).json({ message: " Dark magic was involved. Our powers were too weak."});
    })
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
