from task1_joy.inner_logic.operations import _is_op
from task1_joy.inner_logic.string_helpers import split_nums_and_lists, split_str, is_digit


def get_items_before_open_brace(stack):
    """
    :example:
    stack = ['[', '[', 2, 13, 4 -> [2, 13, 4]
    """
    st = []
    while len(stack) > 0 and stack[-1] != '[':
        st.append(stack[-1])
        stack.pop()
    if stack[-1] != '[':
        raise ValueError('Missing "[" bracket ')
    stack.pop()  # delete [
    st.reverse()
    return st


def append_element_by_deep(stack, ans, el, list_member_deep):
    if el == '[':
        list_member_deep += 1
        stack.append(el)
    elif _is_op(el):
        if list_member_deep == 0:
            ans.append(el)
        else:
            stack.append(el)
    else:
        new_el = el
        if is_digit(el):
            new_el = int(new_el)
        if list_member_deep == 0:
            ans.append(new_el)
        else:
            stack.append(new_el)
    return list_member_deep


def parse(expr: str):
    res = split_nums_and_lists(split_str(expr))
    stack = []
    ans = []
    list_member_deep = 0
    for el in res:
        if el == ']':
            items = get_items_before_open_brace(stack)
            list_member_deep -= 1
            if list_member_deep == 0:
                ans.append(items)
            else:
                stack.append(items)
            continue
        list_member_deep = append_element_by_deep(stack, ans, el, list_member_deep)
    return ans
