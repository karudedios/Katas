function List() {}

function EmptyList() {}

EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;

EmptyList.prototype.isEmpty = function() { return true; };
EmptyList.prototype.toString = function() { return "()"; };
EmptyList.prototype.length = function() { return 0; };
EmptyList.prototype.push = function(x) { return new ListNode(x, new EmptyList()); };
EmptyList.prototype.remove = function(x) { return new EmptyList(); };
EmptyList.prototype.append = function(xs) { return new ListNode(xs, new EmptyList()) };

function ListNode(value, next) { this.value = value; this.next = next; }
ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;

ListNode.prototype.isEmpty = function() { return false; };
ListNode.prototype.toString = function() {
	var all = this.value.toString() + " " + this.next.toString();
	return ("(" + all + ")").replace("()", "").replace(") ", " ").replace(" )", "").replace(" (", " ").replace("))", ")").replace("((", "(");
};
ListNode.prototype.head = function() { return this.value.toString(); };
ListNode.prototype.tail = function() { 
	return this.value instanceof ListNode && this.next || (this.next.tail && this.next.tail()) || this.value;
};
ListNode.prototype.length = function() { return this.next.length() + 1 };
ListNode.prototype.push = function(x) { return new ListNode(x, this); };
ListNode.prototype.remove = function(x) {	return this.value == x && this.next || new ListNode(this.value, this.next.remove(x)) };
ListNode.prototype.append = function(xs) { return xs.push(this); };

module.exports = {
	ListNode: ListNode,
	EmptyList: EmptyList
}