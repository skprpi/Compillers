from task1.calculator import calculate
from task1.parser import split_str, split_nums_and_lists, parse
from task1.display import display

print(*calculate([11, 13, '+', 42, '*', 13, '-']))  # 995
print(parse(" [1 23 15] first 2  [[2] [2 [[[2 3 5]]1] 2 13 3]]"))
print(parse(" [[2]3]4"))

print(display(parse(" [1 23 15] first 2  [[2] [2 [[[2 3 5]]1] 2 13 3]]")))
print(display(parse(" [[2]3]4")))
