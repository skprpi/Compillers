from task1_joy.inner_logic.operations import _op, _is_op, _is_expr_op, _expr_op, stack_append, _is_symbol, run_func


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
        elif _is_symbol(el):
            run_func(expr, el)
        else:
            stack_append(stack, el)
    if mode == 'debug':
        print(f'expr = {expr}\nstack = {stack}\n')
    if len(stack) > 1:
        print('[WARNING] Your function has the side effect!')  # Warning
    return stack
