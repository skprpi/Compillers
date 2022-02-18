function numberExceptionCheck(el) {
    if (is_op(el)) {
        throw new Error('Wrong expression! Expected single operation')
    }
    if (!is_digit(el)) {
        throw new Error('Wrong expression! Expected digit')
    }
}

function cloneArr(arr) {
    return arr
}

function sum_op(lst) {
    // (+)       -> 0
    // (+ 2)     -> 2
    // (+ 2 3 4) -> 10
    var sum = 0
    for (var i = 0; i < lst.length; i++) {
        var el = lst[i]
        if (Array.isArray(el)) {
            el = make_op(cloneArr(el))
        }
        numberExceptionCheck(el)
        sum += Number(el) 
    }
    return sum
}

function mul_op(lst) {
    // (*)  -> 1
    var mul = 1
    for (var i = 0; i < lst.length; i++) {
        var el = lst[i]
        if (Array.isArray(el)) {
            el = make_op(cloneArr(el))
        }
        numberExceptionCheck(el)
        mul *= Number(el) 
    }
    return mul
}

function minus_op(lst) {
    // (-)    ->  Error. List missmached
    // (-100) -> Error
    // (- 100) -> -100
    // (-100 3 2) -> 95
    if (lst.length == 0) {
        throw new Error('List argument missmached')
    }
    var res = 0
    for (var i = 0; i < lst.length; i++) {
        var el = lst[i]
        if (Array.isArray(el)) {
            el = make_op(cloneArr(el))
        }
        numberExceptionCheck(el)
        res -= Number(el) 
    }
    if (lst.length > 1) {
        res += lst[0] * 2
    }
    return res
}

function div_op(lst) {
    // (/)          ->  Error. List missmached
    // (/100)       -> 0   (1 / 100)
    // (/ 100 2)    -> 50
    // (/ 100 2 2)  -> 25
    if (lst.length == 0) {
        throw new Error('List argument missmached')
    }
    if (lst.length == 1) {
        return 1 / lst[0]
    }

    var res = lst[0]
    for (var i = 1; i < lst.length; i++) {
        var el = lst[i]
        if (Array.isArray(el)) {
            el = make_op(cloneArr(el))
        }
        numberExceptionCheck(el)
        res /= Number(el)
    }
    return res
}



function is_op(op) {
    return op in ops;
}

function is_data_op(op) {
    return op === 'quote';
}

function is_symbol(symbol) {
    return symbol in symbols;
}

function make_op(lst) {
    var head = cloneArr(lst[0])
    lst.shift()
    if (is_op(head)) {
        return ops[head](lst)
    } else if (is_symbol(head)) {
        return symbols[head](lst)
    }
    console.log(lst)
    throw new Error('Wrong expression! Expected single operation')
}

function is_digit(elem) {
    var i = 0
    if (Array.isArray(elem)) {
        return false
    }
    if (elem[0] == '-') {
        i = 1
    }
    for (i; i < elem.length; i++) {
        const num = elem.charCodeAt(i) - '0'.charCodeAt(0)
        if (!(0 <= num && num <= 9)) {
            return false
        }
    }
    return true
}

function calc(lst) {
    var res = []
    for (var i = 0; i < lst.length; i++) {
        const tmp = make_op(cloneArr(lst[i]))
        res.push(tmp)
    }
    return res
}

const ops = {
    '+': sum_op,
    '-': minus_op,
    '/': div_op,
    '*': mul_op,
}

var symbols = {}


export { calc }
