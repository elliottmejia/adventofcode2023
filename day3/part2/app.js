#!/usr/bin/env node
const fs = require('fs');

// -----------
//    UTILS
const numberRegex = /\d+(\.\d+)?/g;
const gearRegex = /\*/g;

// ------------
//    GLOBALS
let sum = 0;
let data = [];

// ------------
//    FUNCTIONS

function parseData() {
    // iterates over each line and char and searches evokes a proximity search if it reaches a symbol.
    for(let i = 0; i < data.length; i++) { //line
        for(let j = 0; j < data[i].length; j++) { // char
            if (data[i].charAt(j).match(gearRegex)) {
                sum += iterateSurrounding(i, j);
            }
        }
    }
}

function iterateSurrounding(i, j) {
    // iterates over the surrounding positions, and evokes a line search once it reaches a number.
    let closeNumbers= [];
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
            // check if out of bounds or current char
            if (k < 0 || l < 0 || k >= data.length || l >= data[k].length || (k === i && l === j)) {
                continue;
            }
            let char = data[k][l];
            if (char.match(numberRegex)) {
                closeNumbers.push(
                    sortBufferAndParse(searchLineForNumber(k, l))
                );
            }
        }
    }
    if (closeNumbers.length !== 2) {
        return 0;
    }
    // multiply close numbers
    return Number(closeNumbers.reduce((a, b) => Number(a) * Number(b), 1));
}

function sortBufferAndParse(buffer){
    // pushes buffer to numbers array
    buffer.sort((a, b) => Number(Object.keys(a)[0]) - Number(Object.keys(b)[0]));

    let output = "";
    buffer.map((e) => {
        output += e[Object.keys(e)[0]];
    });

    return parseInt(output);
}

function replaceWithDot(i, j) {
    // replaces the char at position (i, j) with a dot.
    data[i] = data[i].substring(0, j) + '.' + data[i].substring(j + 1);
}

function searchLineForNumber(k, l) {
    // searches the current line (k) for a number starting at char (l).
    let char = data[k][l];
    let buffer = [];
    buffer.push({ [l]: char });
    replaceWithDot(k, l);

    // search left
    let left = l - 1;
    while (left >= 0 && data[k][left].match(numberRegex)) {
        buffer.push({ [left]: data[k][left] });
        replaceWithDot(k, left);
        left--;
    }

    // search right
    let right = l + 1;
    while (right < data[k].length && data[k][right].match(numberRegex)) {
        buffer.push({ [right]: data[k][right] });
        replaceWithDot(k, right);
        right++;
    }
    return buffer;
}


// -----------
//    MAIN

try{
    // data is global.
    data = fs.readFileSync('../input.txt', 'utf8').split('\n');
    console.table(data);
    parseData();
    // console.log("symbols", getSymbols());
} catch (err) {
    console.error(err);
}

console.log(sum);