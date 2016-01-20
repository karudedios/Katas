'use strict';

import query from '../solution.js';
import { expect } from 'chai';

describe('Functional SQL', () => {
  const numberSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  it("should have the properties defined", () => {
    const props = "from where groupBy having select orderBy".split(' ');
    const q = query();

    props.forEach(prop => {
      expect(q[prop]).to.exist;
    });
  });

  describe("The good", () => {
    const  isEven = x => x % 2 === 0;
    const [odd, even] = ['odd', 'even'];
    const  parity = n => isEven(n) ? even : odd;
    const timesTwo = x => x * 2;
    const lessThanTen = x => x < 10;

    it("should work with a from and no select", () => {
      const result = query().from(numberSet).execute();
      expect(result).be.equal(numberSet);
    });

    it("should apply transformation to set", () => {
      const result = query().from(numberSet).select(timesTwo).execute();
      expect(result).to.deep.equal(numberSet.map(timesTwo));
    });

    it("should filter the set based on a predicate", () => {
      const result = query().from(numberSet).where(lessThanTen).execute();
      expect(result).to.deep.equal(numberSet.filter(lessThanTen));
    });

    it("should allow `select`, `from` and `where` to be used in any order and yield same result", () => {
      const predicate = lessThanTen;
      const expected = numberSet.filter(predicate).map(timesTwo);
      
      const selectFirst = query().select(timesTwo).from(numberSet).where(predicate).execute();
      const whereFirst = query().where(predicate).select(timesTwo).from(numberSet).execute();
      const fromFirst = query().from(numberSet).where(predicate).select(timesTwo).execute();

      expect(selectFirst).to.deep.equal(whereFirst);
      expect(whereFirst).to.deep.equal(fromFirst);
      expect(fromFirst).to.deep.equal(expected);
    });

    it("should allow you to sort the set", () => {
      const reverseSet = numberSet.slice().reverse();
      const result = query().from(reverseSet).orderBy((a, b) => a - b).execute();

      expect(result).to.deep.equal(numberSet);
    });

    it("should allow you to group the set", () => {
      const [oddSet, evenSet] = query().from(numberSet).groupBy(parity).execute();

      expect(oddSet[0]).to.be.equal(odd, "head of first set should be 'odd'");
      expect(oddSet[1]).to.be.deep.equal(numberSet.filter(x => !isEven(x)));

      expect(evenSet[0]).to.be.equal(even, "head of second set should be 'even'");
      expect(evenSet[1]).to.be.deep.equal(numberSet.filter(isEven));
    });

    it("should allow you to use `having` clause after grouping", () => {
      const oddSet = query().from(numberSet).groupBy(parity).having(g => g[0] === 'odd').execute();

      expect(oddSet.length).to.be.equal(1, 'result having clause should\'ve brought a single result set');
      expect(oddSet[0][0]).to.be.equal(odd, 'head of result set should equal `odd`');
      expect(oddSet[0][1]).to.be.deep.equal(numberSet.filter(x => !isEven(x)));
    });
  });

  describe("The bad", () => {
    it("should throw when duplicate FROM clause is presented", () => {
      expect(query().from().from).to.throw(Error);
    });

    it("should throw when duplicate SELECT clause is presented", () => {
      expect(query().select().select).to.throw(Error);
    });

    it("should throw when duplicate GROUPBY clause is presented", () => {
      expect(query().groupBy().groupBy).to.throw(Error);
    });

    it("should throw when duplicate ORDERBY clause is presented", () => {
      expect(query().orderBy().orderBy).to.throw(Error);
    });
  });

  describe("The ugly", () => {
    const numberSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const divisibleBy = (mod) => (n) => n % mod === 0;

    it("should allow multiple predicates on WHERE clause and treat them as an OR", () => {
      const result = query()
        .from(numberSet)
        .where(divisibleBy(2), divisibleBy(3))
        .select()
        .execute();

      expect(result).to.deep.equal(numberSet.filter(x => divisibleBy(2)(x) || divisibleBy(3)(x)));
    });

    it("should allow multiple WHERE clauses and treat them as an AND", () => {
      const result = query()
        .from(numberSet)
        .where(divisibleBy(2))
        .where(divisibleBy(3))
        .select()
        .execute();

      expect(result).to.deep.equal(numberSet.filter(x => divisibleBy(2)(x) && divisibleBy(3)(x)));
    });


    it("should allow multiple predicates on WHERE clause and treat them as an OR", () => {      
    });

    it("should allow multiple HAVING clauses and treat them as an AND", () => {
    });

    it("should allow multiple sets in FROM clause", () => {
      var teachers = [
        { teacherId: '1', teacherName: 'Peter' },
        { teacherId: '2', teacherName: 'Anna' }
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

      const data = query()
        .where(teacherClassJoin)
        .where(tutorEquals(1))
        .from(teachers, students, classes)
        .select(studentClass).execute();

      expect(data).to.not.be.undefined;
      expect(data[0]).to.deep.equal({ 'studentName':'Michael', 'teacherName': 'Peter', 'classroom': 'A' });
    });
  });
});