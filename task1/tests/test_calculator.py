import pytest
from task1.calculator import calculate

parse_test_data = (
    ([1, 2, '+'], [3]),
    ([10, 2, '-'], [8]),
    ([15, -3, '*'], [-45]),
    ([16, 2, '/'], [8]),
    ([1, 2, 3, 'dup'], [1, 2, 3, 3]),
    ([1, 2, 3, 'drop'], [1, 2]),
    ([1, 2, 3, 'swap'], [1, 3, 2]),
    ([1, 2, [3, 4, 5], 'first'], [1, 2, 3]),
    ([1, 2, [3, 4, 5], 'rest'], [1, 2, [4, 5]]),
    ([1, 2, [3, 4, 5], 'null'], [1, 2, 'false']),
    ([1, 2, [], 'null'], [1, 2, 'true']),
    (['true', 'false'], ['true', 'false']),
    ([['true', 4, 5], 'first', 'false'], ['true', 'false']),
    ([['true', [2, 3, '+', [2, 11], 'first', '*']], 'rest', 'false'], [[[2, 3, '+', [2, 11], 'first', '*']], 'false']),
    ([3, 'true', [2, '*'], [1, '*'], 'if', 2, '+'], [8]),
    ([3, 1, [2, '*'], 'dip', '+'], [7]),
)


@pytest.mark.parametrize("stack, expected_result", parse_test_data)
def test_calculator(stack, expected_result):
    assert calculate(stack, 'test') == expected_result


# pytest ./task1/tests/test_calculator.py
