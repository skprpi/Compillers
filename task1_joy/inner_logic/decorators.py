def check_stack_len(stack, min_len):
    if len(stack) < min_len:
        raise ValueError(f'Stack size have to be {min_len} length minimal')


def check_len_before(min_len):
    """
    Check length of stack before make an operation
    """
    def func_wrap(func):
        def inner_wrap(stack):
            check_stack_len(stack, min_len)
            return func(stack)
        return inner_wrap
    return func_wrap


def check_instances(stack: list, instances):
    if len(stack) < len(instances):
        raise ValueError(f'Stack size have to be {len(instances)} length minimal')
    for i in range(-len(instances), 0):
        if not isinstance(stack[i], instances[i]):
            raise TypeError(f'Expected type {instances[i]} got {stack[i]}')


def check_last_n_instances_before(*args):
    """
    Check the last n-th instances of classes
    :example
    stack = [1, 2, 2.3, "123"], instances = (int, float, str) -> OK!
    stack = [1, 2, 2.3, "123"], instances = (str, float, str) -> Exception!
    """
    def func_wrap(func):
        def inner_wrap(stack):
            check_instances(stack, args)
            return func(stack)
        return inner_wrap
    return func_wrap


def check_last_n_expr_instances_before(*args):
    """
    Check the last n-th instances of classes
    :example
    stack = [1, 2, 2.3, "123"], instances = (int, float, str) -> OK!
    stack = [1, 2, 2.3, "123"], instances = (str, float, str) -> Exception!
    """
    def func_wrap(func):
        def inner_wrap(expr, stack):
            check_instances(stack, args)
            return func(expr, stack)
        return inner_wrap
    return func_wrap
