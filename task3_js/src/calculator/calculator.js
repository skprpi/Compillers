function numberExceptionCheck(el) {
    if (!is_digit(el)) {
        throw new Error('Wrong expression! Expected digit')
    }
}

function emptyListArgumentException(lst) {
    if (lst.length === 0) {
        throw new Error('Expected arguments! Zero argument got!')
    }
}

function fixedSizeListArgumentException(lst, cnt) {
    if (lst.length !== cnt) {
        throw new Error(`Expected ${cnt} arguments, but ${lst.length} got!`)
    }
}

function oneListArgumentCheck(lst) {
    fixedSizeListArgumentException(lst, 1)
    if (!Array.isArray(lst[0])) {
        throw new Error(`Expected Array type for argument`)
    }
}

function sum_op(lst) {
    // (+)       -> 0
    // (+ 2)     -> 2
    // (+ 2 3 4) -> 10
    var res = 0
    for (var i = 0; i < lst.length; i++) {
        numberExceptionCheck(lst[i])
        res += Number(lst[i]) 
    }
    return res
}

function mul_op(lst) {
    // (*)  -> 1
    var res = 1
    for (var i = 0; i < lst.length; i++) {
        numberExceptionCheck(lst[i])
        res *= Number(lst[i]) 
    }
    return res
}

function minus_op(lst) {
    // (-)    ->  Error. List missmached
    // (-100) -> Error
    // (- 100) -> -100
    // (-100 3 2) -> 95
    emptyListArgumentException(lst)
    var res = 0
    for (var i = 0; i < lst.length; i++) {
        numberExceptionCheck(lst[i])
        res -= Number(lst[i]) 
    }
    return lst.length > 1 ? res + lst[0] * 2: res
}

function div_op(lst) {
    // (/)          ->  Error. List missmached
    // (/100)       -> 0   (1 / 100)
    // (/ 100 2)    -> 50
    // (/ 100 2 2)  -> 25
    emptyListArgumentException(lst)
    if (lst.length == 1) {
        return 1 / lst[0]
    }
    var res = lst[0]
    for (var i = 1; i < lst.length; i++) {
        numberExceptionCheck(lst[i])
        res /= Number(lst[i])
    }
    return res
}

function quote_op(lst) {
    oneListArgumentCheck(lst)
    return lst[0].slice()
}

function car_op(lst) {
    oneListArgumentCheck(lst)
    if (Array.isArray(lst[0][0])) {
        return lst[0][0].slice()
    }
    if (is_digit(lst[0][0])) {
        return Number(lst[0][0])
    }
    // got string
    return lst[0][0]
}

function cdr_op(lst) {
    oneListArgumentCheck(lst)
    const res = lst[0].slice(1)
    return res
}

function cons_op(lst) {
    // (cons 'a '(2)) -> '(a 2)
    fixedSizeListArgumentException(lst, 2)
    if (!Array.isArray(lst[1])) {
        throw new Error(`Expected Array type for argument`)
    }
    var arg = is_digit(lst[0]) ? '' + lst[0] : lst[0].slice()
    return [arg].concat(lst[1].slice())
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
    const head = lst[0]
    lst.shift()
    return ops[head](lst)
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

function calc(inLst) {
    // считает сначал все аргументы
    // потом на посчитанных аргументах просто выполняет операцию

    const op = inLst[0]

    if (!is_op(op)) {
        throw new Error('Expected a procedure that can be applied to arguments')
    }

    var lst = inLst.slice()

    if (is_data_op(op)) {
        return make_op(lst)
    }

    for (var i = 1; i < lst.length; i++) {
        if (Array.isArray(lst[i])) {
            lst[i] = calc(lst[i])
        }
        if (is_op(lst[i]) || is_data_op(lst[i])) {
            throw new Error('Wrong expression! Expected single operation')
        }
    }
    return make_op(lst)
}

function first_level_calc(lst) {
    // считает сначал все аргументы
    // потом на посчитанных аргументах просто выполняет операцию
    var res = []
    for (var i = 0; i < lst.length; i++) {
        if (Array.isArray(lst[i])) {
            res.push(calc(lst[i]))
        } else {
            // number, op, data_op
            res.push(lst[i])
        }
    }
    return res
}

const ops = {
    '+': sum_op,
    '-': minus_op,
    '/': div_op,
    '*': mul_op,
    'quote': quote_op,
    'car': car_op,
    'cdr': cdr_op,
    'cons': cons_op,
}

var symbols = {}

export { first_level_calc }
