def check_stack_len(stack, min_len):
    if len(stack) < min_len:
        print('Operation is not possible!')


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
        print('Instances length > stack length')
    for i in range(-len(instances), 0):
        if not isinstance(stack[i], instances[i]):
            print('Exception!')


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
