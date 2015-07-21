String.prototype.insert = function (index, string) {
  return this.replace(/./g, function(v, i) { return i === index - 1 ? v + string : v; });
};

function List() {}
function EmptyList() {}

EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;

EmptyList.prototype.isEmpty = function() { return true; };
EmptyList.prototype.toString = function() { return "()"; };
EmptyList.prototype.length = function() { return 0; };
EmptyList.prototype.push = function(x) { return new ListNode(x, new EmptyList()); };
EmptyList.prototype.remove = function(x) { return new EmptyList(); };
EmptyList.prototype.append = function(xs) { return xs.push(this); };

function ListNode(value, next) { this.value = value; this.next = next || new EmptyList(); }
ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;

ListNode.prototype.isEmpty = function() { return false; };
ListNode.prototype.toString = function() {
	return "(" + (function t(l) { return (l.next instanceof ListNode) ? l.value + " " + t(l.next).toString() : l.value; })(this) + ")";
};
ListNode.prototype.head = function() { return this.value.toString(); };
ListNode.prototype.tail = function() {
	console.log(this);
	return this.next && this.next.tail && this.next.tail() || this.value;
};
ListNode.prototype.length = function() { return this.next.length() + 1 };
ListNode.prototype.push = function(x) { return new ListNode(x, this); };
ListNode.prototype.remove = function(x) {	return this.value == x && this.next || new ListNode(this.value, this.next.remove(x)) };
ListNode.prototype.append = function(xs) { return new ListNode(this.value, xs); };

var list0 = new EmptyList();        // => "()"
var list1 = list0.push(3);          // => "(3)"
var list2 = list1.push(2);          // => "(2 3)"
var list3 = list2.push(1);          // => "(1 2 3)"
var list13 = list1.append(list3);   // => "(3 1 2 3)"

console.log (
	  list0.toString()
	, list1.toString()
	, list2.toString()
	, list3.toString()
	, list13.toString()
)

module.exports = {
	ListNode: ListNode,
	EmptyList: EmptyList
}