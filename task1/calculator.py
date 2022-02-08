from task1.inner_logic.operations import _op, _is_op


def calculate(source_stack: list):
    stack = []
    for el in source_stack:
        if _is_op(el):
            _op[el](stack)
        else:
            stack.append(el)
    if len(stack) > 1:
        print('Your function has the side effect!')  # Warning
    return stack
