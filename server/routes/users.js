import express from 'express';
// instead of 'bcrypt', because that gives problems if you don't have python installed
import bcrypt from 'bcryptjs';
// We don't Promise.all anymore
// import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import commonValidations from '../../shared/validations/signUp';
import User from '../models/user';
import authenticate from '../middlewares/authenticate';

let router = express.Router();

function validateInput(data, otherValidationFunc) {
  const { errors, isValid } = otherValidationFunc(data);

  if (isValid === true) {
    // One query to the DB
    return User.query({
      where: { username: data.username },
      orWhere: { email: data.email }
    })
      .fetch()
        .then(user => {
          if (user) {
            if (user.get('username') === data.username) {
              errors.username = 'Username already exists';
            }

            if (user.get('email') === data.email) {
              errors.email = 'Email already exists';
            }
          }

          return {
            errors,
            isValid: isEmpty(errors)
          };
        });

    // Two queries to the DB
    // return Promise.all([
    //   User.where({ username: data.username })
    //     .fetch()
    //       .then(user => {
    //         if (user) {
    //           errors.username = 'Username already exists';
    //         }
    //       }),

    //   User.where({ email: data.email })
    //     .fetch()
    //       .then(user => {
    //         if (user) {
    //           errors.email = 'Email address already exists';
    //         }
    //       })
    // ]).then(() => {
    //   return {
    //     errors,
    //     isValid: isEmpty(errors)
    //   };
    // });
  } else {
    return new Promise(function(resolve, reject) {
      resolve({
        errors,
        isValid
      });
    });
  }
}

// Create a user
// We use bodyParser so the data will be available in request.body
router.post('/', (request, response) => {
  // setTimeout(() => {
  validateInput(request.body, commonValidations)
    .then(({ errors, isValid }) => {
      if (isValid === true) {
        const { username, email, password, timezone } = request.body;
        // 10 = SALT: random characters attached to the password to make it even harder to guess
        const passwordDigest = bcrypt.hashSync(password, 10);

        // Create User Model and save it
        User.forge({
          username,
          email,
          passwordDigest,
          timezone
        }, { hasTimestamps: true })
          .save()
            .then(user => response.json({ success: true }))
            .catch(error => response.status(500).json({ error }));
      } else {
        response.status(400).json(errors);
      }
    });

  // }, 5000);
});

// Get a specific user
router.get('/:identifier', (request, response) => {
  User.query({
    // Select certain columns
    select: [ 'username', 'email' ],
    where: { username: request.params.identifier },
    orWhere: { email: request.params.identifier }
  })
    .fetch()
      .then(user => {
        response.json({ user });
      });
});

// Update a specific user
router.put('/update', authenticate, (request, response) => {
  const { id, firstName, surname } = request.body;

  User.forge({
    id
  })
    .save({
      firstName,
      surname
    })
      .then(user => {
        User.query({
          select: [ 'id', 'username', 'email', 'firstName', 'surname', 'timezone' ],
          where: { id: user.id }
        })
          .fetch()
            .then(user => {
              response.json({ user });
              // response.json({ user: request.currentUser })
            });
      });
});

export default router;
