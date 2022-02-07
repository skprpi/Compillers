import pytest
from task1.parser import SimpleParser

parse_test_data = (
    ([1, 2, '+'], [3]),
    ([10, 2, '-'], [8]),
    ([15, -3, '*'], [-45]),
    ([16, 2, '/'], [8]),
    ([1, 2, 3, 'dup'], [1, 2, 3, 3]),
    ([1, 2, 3, 'drop'], [1, 2]),
    ([1, 2, 3, 'swap'], [1, 3, 2]),
    ([1, 2, (3, 4, 5), 'first'], [1, 2, 3]),
    ([1, 2, (3, 4, 5), 'rest'], [1, 2, (4, 5)]),
    ([1, 2, (3, 4, 5), 'null'], [1, 2, False]),
    ([1, 2, (), 'null'], [1, 2, True]),
)


@pytest.mark.parametrize("stack, expected_result", parse_test_data)
def test_parse(stack, expected_result):
    parser = SimpleParser()
    assert parser.parse(stack) == expected_result

# cd ./task1
# pytest ./test_parser.py
