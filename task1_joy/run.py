from task1_joy.calculator import calculate
from task1_joy.parser import parse
from task1_joy.display import display


def run(expr: str, mode='debug'):
    res = calculate(parse(expr), mode)
    print(display(res))
