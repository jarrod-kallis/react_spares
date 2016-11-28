// Importing  initialised bookshelf from our bookshelf.js file (not the bookshelf package)
import bookshelf from '../bookshelf';

export default bookshelf.Model.extend({
  tableName: 'users'
});
