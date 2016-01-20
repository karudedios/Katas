const query = (() => {
  const id = x => x;

  const compose = (f, g) => !f ? g : (...x) => g(f(...x));
  const composeMany = (f, ...gs) => gs.reduce(compose, f);

  const ret = (val) => () => val;

  class Query {
    constructor(select, from, where, group, having, order) {
      Object.defineProperty(this, '_from', { value: from });
      Object.defineProperty(this, '_where', { value: where });
      Object.defineProperty(this, '_orderBy', { value: order });
      Object.defineProperty(this, '_having', { value: having });
      Object.defineProperty(this, '_groupBy', { value: group });
      Object.defineProperty(this, '_select', { value: select });
    }

    from(...sets) {
      if (this._from)
        throw new Error("Duplicate FROM");

      const map = (arr, fn) => arr.map(fn);
      const mapMany = (arr, fn) => [].concat.apply([], map(arr, fn));

      const cartesian_product = (list) =>
        list.reduce((cps, item) => mapMany(cps, previous => map(item, i => previous.concat([i]))), [[]]);

      const buildQuery = (from) =>
        new Query(this._select, from, this._where, this._groupBy, this._having, this._orderBy);

      return (sets.length === 1) ? buildQuery(sets[0]) : buildQuery(cartesian_product(sets));
    }

    select(apply = id) {
      if (this._select)
        throw new Error("Duplicate SELECT");

      const newSelect = arr => arr.map(apply);
      return new Query(newSelect, this._from, this._where, this._groupBy, this._having, this._orderBy);
    }

    where(...predicates) {
      const newWhere = compose(this._where, (arr) => arr.filter(i => predicates.some(p => p(i))));
      return new Query(this._select, this._from, newWhere, this._groupBy, this._having, this._orderBy);
    }

    groupBy(...props) {
      if (this._groupBy)
        throw new Error("Duplicate GROUPBY");

      const groupBy = (prop, ...props) => (arr) => {
        const groups = arr.map(prop).reduce((col, x) => col.indexOf(x) === -1 ? col.concat([x]) : col, []);

        const innerGroupBy = (props, arr) => (props.length ? groupBy(...props) : id)(arr);

        return groups.map(x => [x, innerGroupBy(props, arr.filter(y => prop(y) == x))]);
      }

      const newGroupBy = groupBy(...props);
      return new Query(this._select, this._from, this._where, newGroupBy, this._having, this._orderBy);
    }

    orderBy(comparator) {
      if (this._orderBy)
        throw new Error("Duplicate ORDERBY");

      const newOrderBy = compose(this.stack, (arr) => arr.sort(comparator));
      return new Query(this._select, this._from, this._where, this._groupBy, this._having, newOrderBy);
    }

    having(...predicates) {
      if (!this._groupBy)
        throw "Cannot use HAVING clause before GROUP BY";

      const having = (predicates) => (groups) => {
        const inner = (group) =>
          group instanceof Array
            ? group.length && group[0] instanceof Array
              ? [].concat.apply([], group.map(inner)).sort()
              : group[1] instanceof Array
                ? inner(group[1])
                : group
            : group;

        return groups.filter(group => predicates.some(p => p(group))).map(rr => rr.map(x => typeof x === 'string' ? x : inner(x)));
      }

      const newHaving = compose(this._having, having(predicates));
      return new Query(this._select, this._from, this._where, this._groupBy, newHaving, this._orderBy);
    }

    execute() {
      if (!this._from || !this._from.length)
        return [];

      const skipFalseys = (...args) => args.filter(x => x != undefined);
      const workflow = composeMany(...skipFalseys(id, this._where, this._groupBy, this._having, this._select, this._orderBy));
      return workflow(this._from);
    }
  }

  return () => new Query();
})();

export default query;

/*const set = [...(function*(n) { var l = n; while(n-- > 0) yield l - n; })(9)];

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
const inGroup = (identifier) => (group) => identifier instanceof Function ? identifier(group) : group[0] === identifier;
const divisibleBy = (by) => (n) => n % by === 0 ? `divisibleBy ${by}` : `not divisibleBy ${by}`;

console.log
(
    query()
      .from(set)
      .groupBy(parity)
      .having(inGroup('odd'))
      .execute()
);

var teachers = [
  { teacherId: '1', teacherName: 'Peter' }, { teacherId: '2', teacherName: 'Anna' }
];

var students = [
  { studentId: '1', studentName: 'Michael', tutor: '1' },
  { studentId: '2', studentName: 'Rose', tutor: '2' }
];

var classes = [
  { className: 'A', tutor: '1', student: '1' }, { className: 'A', tutor: '1', student: '2' },
  { className: 'B', tutor: '2', student: '1' }, { className: 'B', tutor: '2', student: '2' }
];

const teacherJoin = (join) => join[0].teacherId === join[1].tutor;
const student = (join) => ({ studentName: join[1].studentName, teacherName: join[0].teacherName });

const teacherClassJoin = (join) => teacherJoin(join) && join[2].tutor === join[0].teacherId && join[2].student === join[1].studentId;
const studentClass = (join) => ({ studentName: join[1].studentName, teacherName: join[0].teacherName, classroom: join[2].className });
const tutorEquals = (id) => (join) => join[1].tutor == id;

console.log
(
  query().select(studentClass).from(teachers, students, classes).where(teacherClassJoin).where(tutorEquals(1)).execute()
);

const numbers = [1, 2, 3, 4, 5, 4, 2, 6, 5, 4, 6, 7, 5];

console.log
(
  query().from(numbers).groupBy(x => x).having(([h]) => h > 1).having(([h]) => !(h%2)).select(([x, y]) => ({value: x, frequency: y.length})).execute()
);*/