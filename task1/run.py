from task1.calculator import calculate
from task1.parser import parse
from task1.display import display


def run(expr: str, mode='debug'):
    res = calculate(parse(expr), mode)
    print(display(res))
