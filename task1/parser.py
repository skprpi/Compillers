from task1.decorators import check_len_before, check_last_n_instances_before

class SimpleParser:
    # Parser task 1 op
    @check_last_n_instances_before(int)
    def _dup_op(self, stack: list):
        stack.append(stack[-1])

    @check_last_n_instances_before(int)
    def _drop_op(self, stack: list):
        stack.pop()

    @check_last_n_instances_before(int, int)
    def _swap_op(self, stack: list):
        stack[-1], stack[-2] = stack[-2], stack[-1]

    @check_last_n_instances_before(list)
    def _head_list_op(self, stack: list):
        head = self._head(stack[-1])
        stack.pop()
        stack.append(head)

    @check_last_n_instances_before(list)
    def _tail_list_op(self, stack: list):
        tail = self._tail(stack[-1])
        stack.pop()
        stack.append(tail)

    # Parser unary logic op
    @check_last_n_instances_before(list)
    def _empty_list_op(self, stack: list):
        result = len(stack[-1]) == 0
        stack.pop()
        stack.append(result)

    # Parser + / * -
    @check_last_n_instances_before(int, int)
    def _plus_op(self, stack):
        result = stack[-2] + stack[-1]
        stack.pop()
        stack[-1] = result

    @check_last_n_instances_before(int, int)
    def _minus_op(self, stack):
        result = stack[-2] - stack[-1]
        stack.pop()
        stack[-1] = result

    @check_last_n_instances_before(int, int)
    def _mul_op(self, stack):
        result = stack[-2] * stack[-1]
        stack.pop()
        stack[-1] = result

    @check_last_n_instances_before(int, int)
    def _div_op(self, stack):
        result = stack[-2] // stack[-1]
        stack.pop()
        stack[-1] = result

    # Parser helper op
    @check_len_before(1)
    def _head(self, p):
        return p[0]

    @check_len_before(1)
    def _tail(self, p):
        return p[1:]

    def _is_op(self, op: str):
        return op in self._op

    # Constructor
    def __init__(self):
        self._op = {
            '+': lambda stack: self._plus_op(stack),
            '-': lambda stack: self._minus_op(stack),
            '*': lambda stack: self._mul_op(stack),
            '/': lambda stack: self._div_op(stack),
            'dup': lambda stack: self._dup_op(stack),
            'drop': lambda stack: self._drop_op(stack),
            'swap': lambda stack: self._swap_op(stack),
            'first': lambda stack: self._head_list_op(stack),
            'rest': lambda stack: self._tail_list_op(stack),
            'null': lambda stack: self._empty_list_op(stack),
        }

    # Main functional
    def parse(self, source_stack: list):
        stack = []
        for el in source_stack:
            if self._is_op(el):
                self._op[el](stack)
            else:
                stack.append(el)
        if len(stack) > 1:
            print('Your function has the side effect!')  # Warning
        return stack
