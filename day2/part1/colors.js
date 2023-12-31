#!/usr/bin/env node

const fs = require('node:fs');

let data;
let passingIds = [];

const amounts = {red: 12, green: 13, blue: 14}

try {
    data = fs.readFileSync('../input.txt', 'utf8').split('\n');
} catch (err) {
    console.error(err);
}


function splitString(inputString) {
    // remove header
    const dataWithoutHeader = inputString.replace(/^Game \d+: /, '');
    // semicolons
    const semicolonSeparated = dataWithoutHeader.split(/;\s*/);
    // commas and spaces
    const commaSeparated = semicolonSeparated.map(element => element.split(/,\s*/));
    // split by spaces
    return commaSeparated.map(element => element.map(element => element.split(" ")));
}


const parseColorData = (lineArray) => {
    let sums = {red: 0, green: 0, blue: 0};

    for (let i = 0; i < lineArray.length; i++) {
        for (let j= 0; j < lineArray[i].length; j++) {
            const color = lineArray[i][j][1];
            const value = parseInt(lineArray[i][j][0]);

            switch (color) {
                case "red":
                    sums.red += value;
                    break;
                case "green":
                    sums.green += value;
                    break;
                case "blue":
                    sums.blue += value;
                    break;
            }
        }
        if (sums.red > amounts.red || sums.green > amounts.green || sums.blue > amounts.blue)
            return false;
        sums = {red: 0, green: 0, blue: 0};
    }
    return true;
}


data.forEach((line, index) => {
    let id = index + 1;
    data[index] = splitString(line);
    // if(index===0)console.log(data[index]);
    if (parseColorData(data[index])) passingIds.push(id);
});

console.log("passing:", passingIds)

let output = 0;
passingIds.forEach((id) => output += id);

console.log("output:", output);




