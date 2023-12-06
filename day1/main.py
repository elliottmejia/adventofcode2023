# This is a sample Python script.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

day1f = open('day1.txt', 'r').read()

def day1():
    fa = day1f.split('\n\n')
    for idx, block in enumerate(fa):
        fa[idx] = block.split('\n')
    for idx, block in enumerate(fa):
        block_sum = 0
        for item in block:
            block_sum += int(item)
        fa[idx] = block_sum
    high_score = 0
    second = 0
    third = 0
    for block in fa:
        if block > high_score:
            third = second
            second = high_score
            high_score = block
            continue
        if block > second:
            third = second
            second = block
            continue
        if block > third:
            third = block

    print(high_score + second + third)

def main():
    pass

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    main()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
