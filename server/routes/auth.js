import express from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

router.post('/', (request, response) => {
  const { identifier, password } = request.body;

  User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  })
    .fetch()
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(password, user.get('passwordDigest'))) {
            const token = jwt.sign({
              id: user.get('id'),
              username: user.get('username'),
              firstName: user.get('firstName') ? user.get('firstName') : '',
              surname: user.get('surname') ? user.get('surname') : ''
            }, config.jwtSecret);

            response.status(201).json({ token });
          } else {
            response.status(401).json({ errors: { form: 'Invalid Credentials' }});
          }
        } else {
          response.status(401).json({ errors: { form: 'Invalid Credentials' }});
        }
      });
});

export default router;
