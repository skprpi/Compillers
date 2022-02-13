import pytest
from task1_joy.parser import parse

parse_test_data = (
    (" [1 23 15] first 2  [[2] [2 [[[]]]  3]]", [[1, 23, 15], 'first', 2, [[2], [2, [[[]]], 3]]]),
    ("   ", []),
    ("[[2]3]4", [[[2], 3], 4]),
    ("[[first]3]4    ", [[["first"], 3], 4]),
)


@pytest.mark.parametrize("string_expression, expected_result", parse_test_data)
def test_parse(string_expression, expected_result):
    assert parse(string_expression) == expected_result


# pytest ./task1_joy/tests/test_parser.py
