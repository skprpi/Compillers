import pytest
from task1.display import display

parse_test_data = (
    ([[1, 23, 15], 'first', 2, [[2], [2, [[[2, 3, 5]], 1], 2, 13, 3]]], "[1 23 15] first 2 [[2] [2 [[[2 3 5]] 1] 2 13 3]]"),
    ([[[2], 3], 4], "[[2] 3] 4"),
)


@pytest.mark.parametrize("lst, expected_result", parse_test_data)
def test_parse(lst, expected_result):
    assert display(lst) == expected_result


# pytest ./task1/tests/test_display.py
