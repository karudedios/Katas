function List() {}

function EmptyList() {}
EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;

EmptyList.prototype.toString = function() { return "()"; };
EmptyList.prototype.isEmpty = function() { return true; };
EmptyList.prototype.length = function() { return 0; };
EmptyList.prototype.push = function(x) { return new ListNode(x, this); };
EmptyList.prototype.remove = function(x) { return undefined; };
EmptyList.prototype.append = function(xs) {
	var l = [];
	var list = new ListNode();
	while (xs.value) {
		l.push(xs.value);
		xs = xs.next;
	}
	l = l.reverse();
	for (var index in l) {
		list = list.push(l[index]);
	}
	return list;
};

function ListNode(value, next) { if (value) { this.value = value; this.next = next; } else return new EmptyList(); }
ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;

ListNode.prototype.isEmpty = function() { return false; };
ListNode.prototype.toString = function() { var r = []; var l = this; while (l.value) { r.push(l.value); l = l.next; } return "(" + r.join(" ") + ")"; };

ListNode.prototype.head = function() { return this; };
ListNode.prototype.tail = function() { return this.next; };
ListNode.prototype.length = function() { var l = this; var c = 0; while (l.value) { c++; l = l.next; } return c; };
ListNode.prototype.push = function(x) { return new ListNode(x, this); };
ListNode.prototype.remove = function(x) {
	var l = this;
	var list = [];
	var resultList = new ListNode();
	while (l.next) {
		if (l.value != x) {
			list.push(l.value);
		}
		l = l.next;
	}

	for (i in list.reverse()) {
		resultList = resultList.push(list[i]);
	}

	return resultList;
};

ListNode.prototype.append = function(xs) {
	var arr = [];
	var l = this;
	var rl = new ListNode();
	while (l.next) { arr.push(l.value); l = l.next; };
	for (i in arr.reverse()) { xs = xs.push(arr[i]); }
	return xs;
};

var mt, l1, l2, l3, l4;  
mt = new EmptyList();
l1 = mt.push('c').push('b').push('a');
l2 = l1.append(l1);
l3 = l1.remove('b');
l4 = l2.remove('b');

console.log(l3.tail())
console.log(l1.tail().tail())