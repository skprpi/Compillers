from task1.inner_logic.decorators import check_last_n_instances_before, check_len_before,\
    check_last_n_expr_instances_before


@check_last_n_instances_before((int, tuple, list, str))
def _dup_op(stack: list):
    stack.append(stack[-1])


@check_last_n_instances_before((int, tuple, list, str))
def _drop_op(stack: list):
    stack.pop()


@check_last_n_instances_before(int, int)
def _swap_op(stack: list):
    stack[-1], stack[-2] = stack[-2], stack[-1]


@check_last_n_instances_before((list, tuple))
def _head_list_op(stack: list):
    head = _head(stack[-1])
    stack.pop()
    stack.append(head)


@check_last_n_instances_before((list, tuple))
def _tail_list_op(stack: list):
    tail = _tail(stack[-1])
    stack.pop()
    stack.append(tail)


# Parser unary logic op
@check_last_n_instances_before((list, tuple))
def _empty_list_op(stack: list):
    result = 'true' if len(stack[-1]) == 0 else 'false'
    stack.pop()
    stack.append(result)


# Parser sum mul butlast sorted member
@check_last_n_instances_before((list, tuple))
def _sum_list_op(stack):
    res = 0
    for el in stack[-1]:
        res += el
    stack.pop()
    stack.append(res)


@check_last_n_instances_before((list, tuple))
def _mul_list_op(stack):
    res = 1
    is_empty = len(stack[-1]) == 0
    for el in stack[-1]:
        res *= el
    stack.pop()
    stack.append(0 if is_empty else res)


@check_last_n_instances_before((list, tuple))
def _butlast_list_op(stack):
    if len(stack[-1]) == 0:
        raise ValueError('List have to be minimal length 1')
    stack[-1].pop()


@check_last_n_instances_before((list, tuple))
def _sorted_list_op(stack):
    res = 'true'
    for i in range(1, len(stack[-1])):
        if stack[-1][i - 1] >= stack[-1][i]:
            res = 'false'
            break
    stack.pop()
    stack.append(res)


@check_last_n_instances_before(int, (list, tuple))
def _member_list_op(stack):
    res = 'false'
    elem, lst = stack[-2], stack[-1]
    stack.pop(); stack.pop()
    for el in lst:
        if el == elem:
            res = 'true'
            break
    stack.append(res)


# Parser + / * -
@check_last_n_instances_before(int, int)
def _plus_op(stack):
    result = stack[-2] + stack[-1]
    stack.pop()
    stack[-1] = result


@check_last_n_instances_before(int, int)
def _minus_op(stack):
    result = stack[-2] - stack[-1]
    stack.pop()
    stack[-1] = result


@check_last_n_instances_before(int, int)
def _mul_op(stack):
    result = stack[-2] * stack[-1]
    stack.pop()
    stack[-1] = result


@check_last_n_instances_before(int, int)
def _div_op(stack):
    result = stack[-2] // stack[-1]
    stack.pop()
    stack[-1] = result


# Parse expr and stack op
@check_last_n_expr_instances_before(str, (list, tuple), (list, tuple))
def _if_op(expr, stack):
    is_ok, if_expr, else_expr = stack[-3], stack[-2], stack[-1]
    stack.pop(); stack.pop(); stack.pop()
    if is_ok == 'true':
        _preppend_list(expr, if_expr)
    else:
        _preppend_list(expr, else_expr)


@check_last_n_expr_instances_before((int, list, str, tuple), list)
def _dip_op(expr, stack):
    first, second = stack[-2], stack[-1]
    stack.pop(); stack.pop()
    second.append(first)
    _preppend_list(expr, second)


# Parser function
@check_last_n_instances_before(str, (list, tuple))
def _def_op(stack):
    _symbols[stack[-2]] = stack[-1]
    stack.pop(); stack.pop()


def run_func(expr, sym):
    if sym not in _symbols:
        raise KeyError(f'Can not find symbol {sym}')
    _preppend_list(expr, _symbols[sym])


# Parser helper op
@check_len_before(1)
def _head(p):
    return p[0]


@check_len_before(1)
def _tail(p):
    return p[1:]


def _is_op(op: str):
    if not isinstance(op, str):
        return False
    return op in _op


def _is_symbol(sym: str):
    if not isinstance(sym, str):
        return False
    return sym in _symbols


def _is_expr_op(op: str):
    if not isinstance(op, str):
        return False
    return op in _expr_op


def _preppend_list(change, new_begin):
    for el in reversed(new_begin):
        change.insert(0, el)


def stack_append(stack, el):
    if isinstance(el, str):
        if len(el) <= 1:
            raise ValueError('Too slow length')
        elif el[0] != ':' and el != 'true' and el != 'false':
            raise ValueError('Undefined operation')
        elif el[0] == ':':
            el = el[1:]
    stack.append(el)


_op = {
    '+': lambda stack: _plus_op(stack),
    '-': lambda stack: _minus_op(stack),
    '*': lambda stack: _mul_op(stack),
    '/': lambda stack: _div_op(stack),
    'dup': lambda stack: _dup_op(stack),
    'drop': lambda stack: _drop_op(stack),
    'swap': lambda stack: _swap_op(stack),
    'first': lambda stack: _head_list_op(stack),
    'rest': lambda stack: _tail_list_op(stack),
    'null': lambda stack: _empty_list_op(stack),
    'def': lambda stack: _def_op(stack),
    'sum': lambda stack: _sum_list_op(stack),
    'mul': lambda stack: _mul_list_op(stack),
    'butlast': lambda stack: _butlast_list_op(stack),
    'sorted': lambda stack: _sorted_list_op(stack),
    'member': lambda stack: _member_list_op(stack),
}

_expr_op = {
    'if': lambda expr, stack: _if_op(expr, stack),
    'dip': lambda expr, stack: _dip_op(expr, stack),
}

_symbols = {}
