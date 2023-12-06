#!/usr/bin/env node

const fs = require('node:fs');

let data;
let output = 0;


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
function calculatePower(r,g,b) {
    return r*g*b;
}

const parseColorData = (lineArray) => {
    let storeBound = {red: 0, green: 0, blue: 0};

    for (let i = 0; i < lineArray.length; i++) {
        let currentBound = {red: 0, green: 0, blue: 0};
        for (let j= 0; j < lineArray[i].length; j++) {
            const color = lineArray[i][j][1];
            const value = parseInt(lineArray[i][j][0]);

            switch (color) {
                case "red":
                    currentBound.red += value;
                    break;
                case "green":
                    currentBound.green += value;
                    break;
                case "blue":
                    currentBound.blue += value;
                    break;
            }
        }
        if (currentBound.red > storeBound.red) storeBound.red = currentBound.red;
        if (currentBound.green > storeBound.green) storeBound.green = currentBound.green;
        if (currentBound.blue > storeBound.blue) storeBound.blue = currentBound.blue;

    }
    return calculatePower(storeBound.red, storeBound.green, storeBound.blue);
}

data.forEach((line, index) => {
    let id = index + 1;
    data[index] = splitString(line);
    // if(index===0)console.log(data[index]);
    output += parseColorData(data[index])
});

console.log("output:", output);
