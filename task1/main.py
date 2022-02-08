from task1.calculator import calculate
from task1.parser import split_str, split_nums_and_lists, parce

print(*calculate([11, 13, '+', 42, '*', 13, '-']))  # 995
print(parce(" [1 23 15] first 2  [[2] [2 [[[]]]  3]]"))
print(parce(" [[2]3]4"))
