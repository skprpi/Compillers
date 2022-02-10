from task1.calculator import calculate
from task1.parser import split_str, split_nums_and_lists, parse
from task1.display import display


# print(calculate(parse('3 true [2 *] [1 *] if')))
print(calculate([3, 1, [2, '*'], 'dip', '+']))