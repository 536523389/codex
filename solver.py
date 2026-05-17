import sys
from itertools import permutations

def main():
    data = sys.stdin.read().strip().split()
    if len(data) != 3:
        return
    try:
        A, B, C = map(int, data)
    except ValueError:
        return

    if A == 0 or B == 0 or C == 0:
        print("No!!!")
        return

    digits = '123456789'
    solutions = []

    for perm in permutations(digits, 9):
        x = int(''.join(perm[0:3]))
        y = int(''.join(perm[3:6]))
        z = int(''.join(perm[6:9]))

        if x * B == y * A and x * C == z * A:
            solutions.append((x, y, z))

    if solutions:
        solutions.sort(key=lambda triple: triple[0])
        for triple in solutions:
            print(f"{triple[0]} {triple[1]} {triple[2]}")
    else:
        print("No!!!")

if __name__ == "__main__":
    main()
