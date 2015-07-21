'use strict';

var movieDatabase = require('./db.js');

class SQLEngine {
  constructor(database) {
    Object.defineProperty(this, 'database', { value: database, writable: true });
  }

  execute(query) {
    let consult = query.match(/SELECT ([\w\S ]+) FROM ([a-z]+)/i);

    let select = consult[1].split(',').map((x) => x.trim().split('.'));
    let from = consult[2];

    return this;
  }
}

console.log(
  new SQLEngine(movieDatabase).execute("SELECT movie.name, movie.directorId FROM movie")
)