import os


def read_input(file):
    challenge_dir = os.path.dirname(os.path.abspath(file))
    with open(os.path.join(challenge_dir, "input.txt")) as f:
        return f.read()


def read_input_lines(file):
    return read_input(file).split("\n")


def read_input_ints(file):
    return [int(line) for line in read_input_lines(file)]


def sliding_windows(array, length):
    windows = []
    for i in range(len(array) - (length - 1)):
        windows.append(array[i : i + length])
    return windows


def count_if(array, predicate):
    count = 0
    previous_elem = None
    for elem in array:
        if predicate(elem, previous_elem):
            count += 1
        previous_elem = elem
    return count
