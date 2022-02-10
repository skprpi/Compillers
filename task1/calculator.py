from task1.inner_logic.operations import _op, _is_op, _is_expr_op, _expr_op


def calculate(expr: list, mode='debug'):
    stack = []
    while expr:
        if mode == 'debug':
            print(f'expr = {expr}\nstack = {stack}\n')
        el = expr[0]; expr.pop(0)
        if _is_op(el):
            _op[el](stack)
        elif _is_expr_op(el):
            _expr_op[el](expr, stack)
        else:
            stack.append(el)
    if mode == 'debug':
        print(f'expr = {expr}\nstack = {stack}\n')
    if len(stack) > 1:
        print('[WARNING] Your function has the side effect!')  # Warning
    return stack
