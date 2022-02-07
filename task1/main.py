from task1.parser import SimpleParser

parser_ = SimpleParser()
print(*parser_.parse([11, 13, '+', 42, '*', 13, '-']))  # 995
