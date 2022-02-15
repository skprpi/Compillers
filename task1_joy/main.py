from task1_joy.run import run
from task1_joy.parser import parse

with open('examples/example.txt', 'r') as file:
    print(parse(file.read()))
