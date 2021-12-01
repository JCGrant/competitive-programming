from challenge_utils import read_input_ints, sliding_windows, count_if

VALUES = read_input_ints(__file__)
WINDOW_LENGTH = 3


def is_greater_than_and_exists(a, b):
    return b is not None and a > b


def part_1():
    num_times_increased = count_if(VALUES, is_greater_than_and_exists)
    print(num_times_increased)


def part_2():
    window_sums = [sum(window) for window in sliding_windows(VALUES, WINDOW_LENGTH)]
    num_times_increased = count_if(window_sums, is_greater_than_and_exists)
    print(num_times_increased)


part_1()
part_2()
