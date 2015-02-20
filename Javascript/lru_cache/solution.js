function LRUCache (capacity, initialValue) {
	this.capacity = capacity;
	this.size = Object.keys(initialValue || {}).length;
	//return initialValue || {};
}

var lru = new LRUCache(2, {a:1, b:2});
console.log(lru);
console.log(lru.size);
module.exports.LRUCache = LRUCache;	