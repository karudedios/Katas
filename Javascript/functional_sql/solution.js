'use strict';

var query = function(selectFn, collection, where, orderBy, groupBy, failure) {
  if (!(this instanceof query)) return new query(selectFn, collection, where, orderBy , groupBy);
  var defaultFn = function(x) { return x; }
  var defaultFilter = function() { return true; }

  this.select = function(q) {
    return new query(q, collection, where, orderBy, groupBy, failure || (selectFn && "Duplicate SELECT"));
  }

  this.from = function() {
    var args = [].slice.call(arguments, 0);
    args = args.length == 1 ? args[0] : args;
    return new query(selectFn, args, where, orderBy, groupBy, failure || (collection && "Duplicate FROM"));
  }

  this.where = function(clause) {
    return new query(selectFn, collection, (where || []).concat([clause]), orderBy, groupBy, failure);
  }

  this.groupBy = function(g) {
    return new query(selectFn, collection, where, orderBy, g, failure || (groupBy && "Duplicate GROUP BY"));    
  }

  this.execute = function() {
    if (failure) throw failure;
    var filtered = where && where.reduce(function(arr, fn) { return collection.filter(fn); }, collection) || collection;

    console.log(filtered, selectFn)
    return filtered.map(selectFn || defaultFn);
  }
};

var teachers = [
  {
    teacherId: '1',
    teacherName: 'Peter'
  },
  {
    teacherId: '2',
    teacherName: 'Anna'
  }
];


var students = [
  {
    studentName: 'Michael',
    tutor: '1'
  },
  {
    studentName: 'Rose',
    tutor: '2'
  }
];

function teacherJoin(join) {
  console.log(join)
  return join[0].teacherId === join[1].tutor;
}

function student(join) {
  return {studentName: join[1].studentName, teacherName: join[0].teacherName};
}

console.log(
  [teachers, students].filter(teacherJoin)
)

/*
console.log (
  query().select(student).from(teachers, students).where(teacherJoin).execute()
)
*/