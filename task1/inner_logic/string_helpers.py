def split_str(s: str, delimiter: str = ' '):
    if len(delimiter) != 1:
        print('Delimeter has to be the one symbhol')
        return []
    result = []
    is_split = True
    for i in range(len(s)):
        if s[i] == delimiter:
            is_split = True
            continue
        if is_split:
            is_split = False
            result.append('')
        result[-1] += s[i]
    return result


def split_single_world_by_brace(word, result):
    stack = []
    for latter in word:
        if latter == '[' or latter == ']':
            if len(stack) > 0:
                result.append(''.join(stack))
                stack = []
            result.append(latter)
        else:
            stack.append(latter)
    if len(stack) > 0:
        result.append(''.join(stack))


def split_nums_and_lists(splited_str: list):
    result = []
    for word in splited_str:
        split_single_world_by_brace(word, result)
    return result


def is_digit(num: str):
    def is_number(a: str):
        return 0 <= ord(a) - ord('0') <= 9

    for el in num:
        if not is_number(el):
            return False
    return True
