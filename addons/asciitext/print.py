import re, sys

function = sys.argv[1]
msg = sys.argv[2]

msg_r = msg.replace('_', " ")

index = 0
index2 = 0

chars = list(msg_r)
translate = []

# Simple translation from text to ascii
if function == 'to':
    for letter in chars:
        translate.append(ord(chars[index]))
        index += 1

    print(*translate)
    sys.stdout.flush()

# Whoa there; ascii to text
if function == 'from':
    split = msg.split()
    # Appends all the numbers split to list
    try:
        for integer in chars:
            translate.append(split[index])
            index += 1
    # Then takes those and converts it to integers
    except IndexError:
        for i in range(0, len(translate)):
            translate[i] = int(translate[i])
        letters = []
        # And translate those to letters
        try:
            for ints in chars:
                letters.append(chr(translate[index2]))
                index2 += 1
        # And finally puts it in an acceptable format.
        except IndexError:
            nospace = ' '.join([str(elem) for elem in letters])
            pattern = re.compile(r'\s+')

            print(re.sub(pattern, '', nospace))
            sys.stdout.flush()
