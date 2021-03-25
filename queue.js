let Queue =  {}
Queue.new = function() {
    return {
        a : [],
        b : 0
    }
}
Queue.getLength=function(q) {
    return q.a.length-q.b
};

Queue.isEmpty=function(q) {
    return 0==q.a.length
};

Queue.enqueue=function(q, b) {
    q.a.push(b)
};

Queue.dequeue=function(q) {
    if(0!=q.a.length){
        var c = q.a[q.b];
        2*++q.b >= q.a.length && (q.a=q.a.slice(q.b), q.b=0);
        return c
    }
};

Queue.peek=function(q){
    return 0 < q.a.length? q.a[q.b] : void 0
}

module.exports = Queue