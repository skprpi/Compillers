function deepCloneHelper(inLst) {
    if (typeof inLst === 'string') {
        return inLst.slice()
    } else if (typeof  inLst === 'number') {
        return inLst
    } else if (typeof inLst === 'function' ){
        return inLst
    } else if (Array.isArray(inLst)) {
        let res = []
        for (const value of inLst) {
            res.push(deepCloneHelper(value))
        }
        return res
    }
    throw new Error('Unexpected type got')
}

function deepClone(symbols) {
    let res = {}
    for (const [key, value] of Object.entries(symbols)) {
        res[key.slice()] = deepCloneHelper(value)
    }
    return res
}

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

function condOpArgumentCheck(lst) {
    if (!Array.isArray(lst)) {
        throw new Error(`Expected Array type for argument`)
    }
    for (let i = 0; i < lst.length; i++) {
        fixedSizeListArgumentException(lst[i], 2)
    }
}

function lambdaArgumentCheck(lst) {
    if (!Array.isArray(lst)) {
        throw new Error(`Expected Array type for argument`)
    }

    fixedSizeListArgumentException(lst, 3)
    if (!Array.isArray(lst[1])) {
        throw new Error(`Expected Array type for argument`)
    }
    // argument list
    for (let i = 0; i < lst[1].length; i++) {
        if (!is_posible_symbol(lst[1][i])) {
            throw new Error(`Expected name of function`)
        }
    }
}

function letArgumentCheck(lst) {
    if (!Array.isArray(lst)) {
        throw new Error(`Expected Array type for argument`)
    }
    if (lst.length < 2) {
        throw new Error(`Expected at least 2 arguments`)
    }
    for (let i = 0; i < lst[0].length; i++) {
        fixedSizeListArgumentException(lst[0][i], 2)
        const newSymbolName = lst[0][i][0]
        if (!is_posible_symbol(newSymbolName)) {
            throw new Error(`In can not be the name of variable`)
        }
    }
}

function sum_op(lst) {
    // (+)       -> 0
    // (+ 2)     -> 2
    // (+ 2 3 4) -> 10
    let res = 0
    for (let i = 0; i < lst.length; i++) {
        numberExceptionCheck(lst[i])
        res += Number(lst[i]) 
    }
    return res
}

function mul_op(lst) {
    // (*)  -> 1
    let res = 1
    for (let i = 0; i < lst.length; i++) {
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
    let res = 0
    for (let i = 0; i < lst.length; i++) {
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
    if (lst.length === 1) {
        return 1 / lst[0]
    }
    let res = lst[0]
    for (let i = 1; i < lst.length; i++) {
        numberExceptionCheck(lst[i])
        res /= Number(lst[i])
    }
    return res
}

function car_op(lst) {
    oneListArgumentCheck(lst)
    if (!is_data(lst[0])) {
        throw new Error(`Expected data as argument`)
    }

    const lstArg = lst[0][1]
    if (lstArg.length === 0) {
        throw new Error(`Car op needs to have at least 1 element of array`)
    }

    if (Array.isArray(lstArg[0])) {
        return ['quote', lstArg[0].slice()]
    }
    if (is_digit(lstArg[0])) {
        return lstArg[0]
    }
    return ['quote', lstArg[0].slice()]
}

function cdr_op(lst) {
    oneListArgumentCheck(lst)
    if (!is_data(lst[0])) {
        throw new Error(`Expected data as argument`)
    }
    return ['quote', lst[0][1].slice(1)] 
}

function cons_op(lst) {
    // (cons 'a '(2)) -> '(a 2)
    fixedSizeListArgumentException(lst, 2)
    const lstArgs = lst[1][1]
    if (!is_data(lst[1]) || !Array.isArray(lstArgs)) {
        throw new Error(`Expected data array as second argument`)
    }
    let arg = is_digit(lst[0]) ? '' + lst[0] : lst[0].slice()
    return ['quote', [arg].concat(lstArgs.slice())]
}

function logic_op(lst, func) {
    emptyListArgumentException(lst)
    let res = true
    for (let i = 0; i < lst.length; i++) {
        if (!is_digit(lst[i]) && !isLispBool(lst[i])) {
            throw new Error(`The expected number or bool of arguments does not match the given number`)
        } else if (i > 0) {
            if (is_digit(lst[i])) {
                res = res && func(Number(lst[i - 1]), Number(lst[i]))
            } else {
                res = res && func(lst[i - 1], lst[i])
            }
        }
    }
    return toLispBool(res)
}

function eq_op(inLst) {
    return logic_op(inLst.slice(), (a, b) => { return a === b; })
}

function gr_op(inLst) {
    return logic_op(inLst.slice(), (a, b) => { return a > b; })
}

function greq_op(inLst) {
    return logic_op(inLst.slice(), (a, b) => { return a >= b; })
}

function lo_op(inLst) {
    return logic_op(inLst.slice(), (a, b) => { return a < b; })
}

function loeq_op(inLst) {
    return logic_op(inLst.slice(), (a, b) => { return a <= b; })
}

function null_op(inLst) {
    oneListArgumentCheck(inLst)
    if (!is_data(inLst[0])) {
        throw new Error(`Expected data as argument`)
    }
    return toLispBool(inLst[0][1].length === 0)
}

function or_op(inLst) {
    let res = false
    for (let i = 0; i < inLst.length; i++) {
        if (!isLispBool(inLst[i])) {
            throw new Error(`Expected bool argument`)
        }
        res = res || toJSBool(inLst[i])
    }
    return toLispBool(res)
}

function if_op(inLst, inSymbols) {
    let lst = inLst.slice(1)
    fixedSizeListArgumentException(lst, 3)
    let condition = calc(lst[0], inSymbols)
    if (toJSBool(condition)) {
        return calc(lst[1], inSymbols)
    }
    return calc(lst[2], inSymbols)
}

function cond_op(inLst, inSymbols) {
    let lst = inLst.slice(1)
    condOpArgumentCheck(lst)
    for (let i = 0; i < lst.length; i++) {
        if (toJSBool(calc(lst[i][0], inSymbols))) {
            return lst[i][1]
        }
    }
    throw new Error(`Once of condition have to be #t`)
}

function let_op(inLst, inSymbols) {
    let lst = inLst.slice(1)
    let symbols = deepClone(inSymbols)
    let dupCheck = new Set()
    letArgumentCheck(lst)

    // Create new symbols
    for (let i = 0; i < lst[0].length; i++) {
        const newSymbolName = lst[0][i][0]
        if (dupCheck.has(newSymbolName)) {
            throw new Error(`Can not create symbols with the same name`)
        }
        const newSymbolVal = isLambda(lst[0][i][1]) ? func_op['lambda'](inLst, inSymbols) : calc(lst[0][i][1], inSymbols)
        
        dupCheck.add(newSymbolName)
        symbols[newSymbolName] = newSymbolVal
    }

    // Calculate the rest values
    let res = 0
    for (let i = 1; i < lst.length; i++) {
        res = calc(lst[i], symbols)
    }
    return res
}

function lambda_op(inLambdaExpr, inSymbols) {
    let symbols = deepClone(inSymbols)
    const lambdaExpr = inLambdaExpr.slice()

    function calcLambda(lambdaInArgs) {
        lambdaArgumentCheck(lambdaExpr)
        const valueList = lambdaInArgs.slice(1)
        const lambdaArgsName = lambdaExpr[1]

        if (valueList.length !== lambdaArgsName.length) {
            throw new Error(`Lambda got least or few arguments`)
        }

        let dupCheck = new Set(lambdaArgsName)
        if (dupCheck.size !== lambdaArgsName.length) {
            throw new Error(`Can not create symbols with the same name`)
        }
        
        for (let i = 0; i < lambdaArgsName.length; i++) {
            const newSymbolName = lambdaArgsName[i]
            symbols[newSymbolName] = Array.isArray(valueList[i]) ? valueList[i].slice() : valueList[i]
        }
        if (isLambda(lambdaExpr[2])) {
            return func_op['lambda'](lambdaExpr[2], symbols)
        }
        return calc(lambdaExpr[2], symbols)

    }
    return calcLambda
}

function define_op(inLst, inSymbols) {
    fixedSizeListArgumentException(inLst, 3)
    const symbol = inLst[1]
    let value = Array.isArray(inLst[2]) ? inLst[2].slice() : inLst[2]
    if (isLambda(value)) {
        value = func_op['lambda'](value, inSymbols)
    }
    global_symbol[symbol] = value
    return NaN
}

function toLispBool(val) {
    if (typeof val !== 'boolean') {
        throw new Error(`Expected Boolean type as an argument`)
    }
    return val ? '#t' : '#f'
}

function isLispBool(val) {
    return val === '#t' || val === '#f'
}

function isLambda(inLst) {
    if (!Array.isArray(inLst) || inLst.length === 0) {
        return false
    }
    return typeof inLst[0] === 'string' && inLst[0] === 'lambda'
}

function isParsedLambda(arg) {
    return typeof arg === 'function'
}

function toJSBool(val) {
    if (typeof val !== 'string') {
        throw new Error(`Expected String type as an argument`)
    }
    if (val === '#t') {
        return true;
    } else if  (val === '#f') {
        return false;
    }
    throw new Error(`Expected #t or #f as an argument`)
}


function is_op(op) {
    return op in ops || is_special_op(op);
}

function is_special_op(op) {
    return op in special_op
}

function is_data_op(op) {
    return op === 'quote';
}

function is_data(lst) {
    return Array.isArray(lst) && is_data_op(lst[0]);
}

function is_symbol(symbol, symbols) {
    return symbol in symbols || symbol in global_symbol;
}

function get_symbol(symbol, symbols) {
    if (!(symbol in symbols) && !(symbol in global_symbol)) {
        throw new Error(`Undefined symbol`)
    }
    const res = symbol in symbols ? symbols[symbol] : global_symbol[symbol]

    if (Array.isArray(res)) {
        return res.slice()
    }
    if (is_digit(res)) {
        return res
    }
    // got string
    if (typeof res === 'string') {
        return res.slice();
    }
    // function
    return res
}

function is_posible_symbol(val) {
    return (!(is_digit(val) || Array.isArray(val) || typeof val !== 'string'))
}

function make_op(inLst) {
    let lst = inLst.slice()
    const head = lst[0]
    lst.shift()
    return ops[head](lst)
}

function is_digit(elem) {
    let i = 0
    if (typeof elem == 'number') {
        return true
    }
    if (Array.isArray(elem) || typeof elem !== 'string') {
        return false
    }
    if (elem[0] === '-') {
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


function calc(inLst, inSymb) {
    // считает сначал все аргументы
    // потом на посчитанных аргументах просто выполняет операцию
    const inSymbols = deepClone(inSymb)

    if (is_digit(inLst)) {
        return Number(inLst)
    } else if (isLispBool(inLst)) {
        return inLst
    } else if (is_data(inLst)) {
        return inLst
    } else if (is_symbol(inLst, inSymbols)) {
        return get_symbol(inLst, inSymbols)
    }

    let op = inLst[0]


    if (op in definition_op) {
        return definition_op[op](inLst, inSymbols) // return Nan
    } else if (is_symbol(op, inSymbols)) {
        op = get_symbol(op, inSymbols)
    } else if (is_special_op(op)) {
        return special_op[op](inLst, inSymbols)
    }


    if (!isLambda(op) && Array.isArray(op)) {
        op = calc(op, inSymbols)
    }
    if (isLambda(op)) {
        op = func_op['lambda'](inLst, inSymbols)
    }

    if (!is_op(op) && !isParsedLambda(op) && !is_data_op(op)) {
        throw new Error('Expected a procedure that can be applied to arguments')
    }
    let lst = inLst.slice()

    if (lst[0] !== op) {
        lst[0] = op;
    }

    for (let i = 1; i < lst.length; i++) {
        if (is_symbol(lst[i], inSymbols)) {
            lst[i] = get_symbol(lst[i], inSymbols)
        } else if (isLambda(lst[i])) {
            lst[i] = func_op['lambda'](lst[i], inSymbols)
        } else if (Array.isArray(lst[i])) {
            lst[i] = calc(lst[i], inSymbols)
        } 

        if (!isParsedLambda(op) && is_op(lst[i])) {
            throw new Error('Wrong expression! Expected single operation')
        }
    }

    if (isParsedLambda(op)) {
        return op(lst)
    }

    return make_op(lst)
}

function first_level_calc(lst) {
    // считает сначал все аргументы
    // потом на посчитанных аргументах просто выполняет операцию
    let res = []
    for (let i = 0; i < lst.length; i++) {
        if (Array.isArray(lst[i])) {
            res.push(calc(lst[i], {}))
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
    'car': car_op,
    'cdr': cdr_op,
    'cons': cons_op,
    '=': eq_op,
    '>': gr_op,
    '>=': greq_op,
    '<': lo_op,
    '<=': loeq_op,
    'null?': null_op,
    'or': or_op,
}

const special_op = {
    'if': if_op,
    'cond': cond_op,
    'let': let_op,
}

const func_op = {
    'lambda': lambda_op,
}

const definition_op = {
    'define': define_op,
}

var global_symbol = {}

export { first_level_calc }
