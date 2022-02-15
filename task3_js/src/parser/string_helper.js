
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


module.exports = { split_expr }
