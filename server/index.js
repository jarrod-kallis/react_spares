// Reserved word 'import' requires babel (preset: es2015) to transpile to browser understandable code
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import users from './routes/users';
import auth from './routes/auth';

let app = express();

// We're using json formatted data
// So the data will be available in request.body
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true // Eliminate verbose info from webpack when server starts up
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (request, response) => {
  // response.send('hello world!');
  response.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => console.log('Running on localhost:3000'));
