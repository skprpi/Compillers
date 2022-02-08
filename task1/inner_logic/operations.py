from task1.inner_logic.decorators import check_last_n_instances_before, check_len_before


@check_last_n_instances_before(int)
def _dup_op(stack: list):
    stack.append(stack[-1])


@check_last_n_instances_before(int)
def _drop_op(stack: list):
    stack.pop()


@check_last_n_instances_before(int, int)
def _swap_op(stack: list):
    stack[-1], stack[-2] = stack[-2], stack[-1]


@check_last_n_instances_before(list)
def _head_list_op(stack: list):
    head = _head(stack[-1])
    stack.pop()
    stack.append(head)


@check_last_n_instances_before(list)
def _tail_list_op(stack: list):
    tail = _tail(stack[-1])
    stack.pop()
    stack.append(tail)


# Parser unary logic op
@check_last_n_instances_before(list)
def _empty_list_op(stack: list):
    result = len(stack[-1]) == 0
    stack.pop()
    stack.append(result)


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


# Parser helper op
@check_len_before(1)
def _head(p):
    return p[0]


@check_len_before(1)
def _tail(p):
    return p[1:]


def _is_op(op: str):
    return op in _op


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
}
