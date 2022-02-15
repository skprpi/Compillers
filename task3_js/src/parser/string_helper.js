
function push_chank(splited_expr, chank) {
    if (chank.length > 0) {
        splited_expr.push(chank)
    }
    chank = ''
    return chank
}

function spilt_by_char(splited_expr, chr, chank) {
    if (chr === ' ') {
        chank = push_chank(splited_expr, chank)
    }
    else if (chr === '(') {
        chank = push_chank(splited_expr, chank)
        splited_expr.push('(')
    }
    else if (chr === ')') {
        chank = push_chank(splited_expr, chank)
        splited_expr.push(')')
    }
    else {
        chank += chr;
    }
    return chank;
}


function split_expr(expr) {
    var splited_expr = []

    var chank = ''
    for (let i = 0; i < expr.length; i++) {
        const chr = expr[i]
        chank = spilt_by_char(splited_expr, chr, chank)
    }
    if (chank.length > 0) {
        splited_expr.push(chank)
    }

    return splited_expr;
}

function parse_helper(deep, splited_expr) {
    var stack = []
    while (splited_expr.length > 0) {
        if (splited_expr[0] == '(') {
            splited_expr.shift()
            stack.push(parse_helper(deep + 1, splited_expr))
        }
        else if (splited_expr[0] == ')') {
            splited_expr.shift()
            if (deep == 0) {
                throw new Error('Needs ( for current )');
            }
            return stack;
        } else {
            stack.push(splited_expr[0])
            splited_expr.shift();
        }
    }
    if (deep != 0) {
        throw new Error('Expected )');
    }
    return stack
}


function parse(expr) {
    return parse_helper(0, split_expr(expr))
}


export { parse }
