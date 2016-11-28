import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/user';

export default (request, response, next) => {
  const authorisationHeader = request.headers.authorization;
  // const authorisationHeader = request.headers['authorization'];

  let token;

  if (authorisationHeader) {
    token = authorisationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        response.status(401).json({
          error: { form: 'Failed to authenticate' }
        });
      } else {
        // This will select all columns in the users table (including passwordDigest)
        // new User({ id: decoded.id })
        User.query({
          select: [ 'id', 'username', 'email', 'firstName', 'surname', 'timezone' ],
          where: { id: decoded.id }
        })
          .fetch()
            .then(user => {
              if (!user) {
                response.status(404).json({
                  error: { form: 'User does not exist' }
                });
              } else {
                // Put the user on the request so it can be used further down in the method chain
                request.currentUser = user;
                next();
              }
            });
      }
    });
  } else {
    response.status(403).json({
      error: { form: 'No token provided' }
    });
  }
};
