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

    where(...predicates) {
      const newStack = compose(this.stack, (arr) => arr.filter(i => predicates.some(p => p(i))));
      return new Query(this._selected, this._from, 1, newStack, this._grouped);
    }

    groupBy(...props) {
      const groupBy = (prop, ...props) => (arr) => {
        const groups = arr.map(prop).reduce((col, x) => col.indexOf(x) === -1 ? col.concat([x]) : col, []);

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

    having(...predicates) {
      if (!this._grouped)
        throw "Cannot use HAVING clause before GROUP BY";

      const having = (predicates) => (groups) => {
        const [ xs, ...ys ] = groups.filter(group => predicates.some(p => p(group)));

        const traverseGroups = ([first, ...next]) => first ? [first].concat(traverseGroups(next)).sort() : [];

        return [xs && traverseGroups(xs) || [], ...(ys.length && ys.map(traverseGroups) || [])];
      }

      const newStack = compose(this.stack, having(predicates));
      return new Query(this._selected, this._from, this._whered, newStack, this._grouped);
    }

    execute() {
      return this.stack(this._from);
    }
  }

  const map = (arr, fn) => arr.map(fn);
  const mapMany = (arr, fn) => [].concat.apply([], map(arr, fn));

  const cartesian_product = (list) => {
    return list.reduce((cps, item) => {
      return mapMany(cps, previous => {
        return map(item, i => {
          return previous.concat([i]);
        })
      })
    }, [[]]);
  }

  class JoinedQuery extends Query {
    constructor(select, arrays, where, stack = id, group = 0) {
      super(select, cartesian_product(arrays), where, stack, group);
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

console.log
(
  query()
    .from(set)
    .groupBy(parity, prime)
    .having(inGroup('even'))
    .execute()
)

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

const teacherJoin = (join) => join[0].teacherId === join[1].tutor;
const student = (join) => ({ studentName: join[1].studentName, teacherName: join[0].teacherName });

const classJoin = (join) => teacherJoin(join) && join[2].tutor === join[0].teacherId && join[2].student === join[1].studentId;
const studentClass = (join) => ({ studentName: join[1].studentName, teacherName: join[0].teacherName, classroom: join[2].className });
const tutor1 = (join) => join[1].tutor === "1";

console.log
(
  query().from(teachers, students, classes).where(classJoin).where(tutor1).select(studentClass).execute()
)
console.log
(
  query().from(numbers).groupBy(x => x).having(([h]) => h > 1).having(([h]) => !(h%2)).select(([x, y]) => ({value: x, frequency: y.length})).execute()
)