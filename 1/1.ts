var fs = require("fs");
const r = fs.readFileSync("./1/input.txt", "utf8");
const input = r.split("\n");

// part 1
let sum = 0;
for (let i = 0; i < input.length; i++) {
    let j = 0;
    let k = input[i].length - 1;
    while (j < k) {
        if (isNaN(input[i][j])) {
            j++;
        }
        if (isNaN(input[i][k])) {
            k--;
        }
        if (!isNaN(input[i][j]) && !isNaN(input[i][k])) {
            break;
        }
    }
    sum += parseInt(input[i][j] + input[i][k]);
}

console.log(sum);

//part 2

function findSubstring(string: string, backward: boolean = false) {
    const nums = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];
    const places: { index: number; number: number }[] = [];
    for (let i = 0; i < nums.length; i++) {
        if (string.includes(nums[i])) {
            if (
                (string.indexOf(nums[i]) === 0 && !backward) ||
                (string.lastIndexOf(nums[i]) ===
                    string.length - nums[i].length &&
                    backward)
            ) {
                places.push({
                    index: backward
                        ? string.lastIndexOf(nums[i])
                        : string.indexOf(nums[i]),
                    number: i + 1,
                });
            }
        }
    }
    if (backward) {
        places.sort((a, b) => {
            return b.index - a.index;
        });
    } else {
        places.sort((a, b) => {
            return a.index - b.index;
        });
    }
    if (places[0]) {
        return places[0].number;
    } else return false;
}

let sum2 = 0;
for (let i = 0; i < input.length; i++) {
    let j = 0;
    let k = input[i].length - 1;

    let x = 0;
    let y = 0;
    while (j < k) {
        if (!isNaN(input[i][j])) {
            x = parseInt(input[i][j]);
            break;
        } else {
            const m = findSubstring(input[i].slice(j));
            if (m) {
                x = m;
                break;
            } else {
                j++;
            }
        }
    }
    j = 0;
    k = input[i].length - 1;
    while (j < k) {
        if (!isNaN(input[i][k])) {
            y = parseInt(input[i][k]);
            break;
        } else {
            const m = findSubstring(input[i].slice(0, k + 1), true);
            if (m) {
                y = m;
                break;
            } else {
                k--;
            }
        }
    }
    if (x === 0) x = y;
    if (y === 0) y = x;
    console.log(`${i + 1}: ${x}${y}`);
    sum2 += parseInt(`${x}${y}`);
}

console.log(sum2);
