'use strict';

const query = (() => {
  const compose = (f, g) => (...x) => g(f(...x));
  const id = x => x;

  class Query {    
    constructor(select, from, where, stack = id, group = 0) {
      Object.defineProperty(this, '_from', { value: from });
      Object.defineProperty(this, 'stack', { value: stack });
      Object.defineProperty(this, '_whered', { value: where });
      Object.defineProperty(this, '_grouped', { value: group });
      Object.defineProperty(this, '_selected', { value: select });
    }

    from(...sets) {
      if (this._from)
        throw "Multiple FROM clauses";

      return (sets.length === 1)
        ? new Query(this._selected, sets[0], this._whered, this.stack, this._grouped)
        : new JoinedQuery(this._selected, sets, this._whered, this.stack, this._grouped);
    }

    select(apply = id) {
      if (this._selected)
        throw "Multiple SELECT clauses";

      const newStack = compose(this.stack, (arr) => arr.map(apply));
      return new Query(1, this._from, this._whered, newStack, this._grouped);
    }

    where(predicate) {
      const newStack = compose(this.stack, (arr) => arr.filter(predicate));
      return new Query(this._selected, this._from, 1, newStack, this._grouped);
    }

    groupBy(...props) {
      const groupBy = (prop, ...props) => (arr) => {
        const groups = Object.keys(arr.map(prop).reduce((ob, x) => (ob[x] = 1) && ob, {}));

        const innerGroupBy = (props, arr) => (props.length ? groupBy(...props) : id)(arr);

        return groups.map(x => [x, innerGroupBy(props, arr.filter(y => prop(y) == x))]);
      }

      const newStack = compose(this.stack, groupBy(...props));
      return new Query(this._selected, this._from, this._whered, newStack, 1);
    }

    orderBy(comparator) {
      const newStack = compose(this.stack, (arr) => arr.sort(comparator));
      return new Query(this._selected, this._from, this._whered, newStack, this._grouped);
    }

    having(predicate) {
      if (!this._grouped)
        throw "Cannot use HAVING clause before GROUP BY";

      const having = (predicate) => (groups) => {
        const [ [h, ...content] ] = groups.filter(predicate);

        const traverseGroups = ([ [first, ...next] ]) =>
          first && typeof first[0] == 'string' && first[1] instanceof Array
            ? first[1].concat(traverseGroups([ next ])).sort()
            : [];

        return [[h, traverseGroups(content)]]
      }

      const newStack = compose(this.stack, having(predicate));
      return new Query(this._selected, this._from, this._whered, newStack, this._grouped);
    }

    execute() {
      return this.stack(this._from);
    }
  }

  class JoinedQuery extends Query {
    constructor(select, [first, ...next], where, stack = id, group = 0) {

      const join = first.reduce((join, f) => {
        next.forEach((col, i) => {
          join[i] = [];
          col.forEach(n => join.push([f, n]))
        });
        return join;
      },[]);

      super(select, join, where, stack, group);
    }
  }

  return () => new Query();
})();

const set = [...(function*(n) { var l = n; while(n-- > 0) yield l - n; })(9)];

const parity = (n) => !(n % 2) ? 'even' : 'odd';

const isPrime = (number) => {
  if (number < 2) {
    return false;
  }

  var divisor = 2;
  for(; number % divisor !== 0; divisor++);
  return divisor === number;
}

const prime = (number) => isPrime(number) ? 'prime' : 'divisible';
const lessThan = (lt) => (n) => n < lt ? `less than ${lt}` : `bigger than ${lt}`;
const inGroup = (identifier) => (group) => group[0] === identifier;

/*console.log
(
  query()
    .from(set)
    .groupBy(parity, prime)
    .having(inGroup('even'))
    .execute()
)*/

var teachers = [
  { teacherId: '1', teacherName: 'Peter' },
  { teacherId: '2', teacherName: 'Anna' }
];

var students = [
  { studentId: '1', studentName: 'Michael', tutor: '1' },
  { studentId: '2', studentName: 'Rose', tutor: '2' }
];

var classes = [
  { className: 'A', tutor: '1', student: '1' },
  { className: 'A', tutor: '1', student: '2' },
  { className: 'B', tutor: '2', student: '1' },
  { className: 'B', tutor: '2', student: '2' }
];

const teacherJoin = (join) => join[0].teacherId === join[1].tutor && join[1].studentId === join[2].student;
const student = (join) => ({ studentName: join[1].studentName, teacherName: join[0].teacherName });

const data = [teachers, students, classes];

for (const set of data) {
}

const d = [[1, 2], [4, 5], [7, 8]];

const cartesian_product = ([[head, ...tail], ...all]) => {
  console.log(head, tail, all);

  return head
    ? [[head].concat(cartesian_product(all.concat([tail])))]
    : [];
}

var join = [];
d[0].forEach(t => {
  d[1].forEach(e => {
    d[2].forEach(c => {
      join.push([t, e, c]);
    });
  });
});

console.log
(
  //join,
  cartesian_product(d)
  //query().from(teachers, students)/*.where(teacherJoin)*/.select().execute()
)