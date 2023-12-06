const fs = require('fs');

// const inputArray = fs.readFileSync('./test.txt', 'utf-8').split('\n');
const inputArray = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const isNumberAdjacentToSymbol = ({ row, col }) => {

    const adjacent = [
        { row: row + 1, col },
        { row: row - 1, col },
        { row, col: col + 1 },
        { row, col: col - 1 },
        { row: row + 1, col: col + 1},
        { row: row - 1, col: col - 1 },
        { row: row - 1, col: col + 1 },
        { row: row + 1, col: col - 1 },
    ].filter(({ row, col }) => row >= 0 && col >= 0);

    console.log(`adjacent to { row: ${row}, col: ${col} }`, adjacent);

    return adjacent.some(({ row: adjacentRow, col: adjacentCol }) => {
        return symbols.some(({ row: symbolRow, col: symbolCol }) => {
            return adjacentRow === symbolRow && adjacentCol === symbolCol;
        });
    });
};

const symbols = inputArray.reduce((syms, currentLine, row) => {
    currentLine.split('').forEach((char, col) => {
        if (char.match(/[^\.\d]/)) {
            syms.push({ row, col, char });
        }
    });
    return syms;
}, []);
// console.log(symbols);

const total = inputArray.reduce((sum, currentLine, row, arr) => {
    console.log(arr[row-1]);
    console.log(currentLine);
    console.log(arr[row+1]);
    currentLine.split(/\D/).filter(str => str).forEach((num) => {
        const indexOfNumber = currentLine.indexOf(num);
        
        for(let i in num.split('')) {
            const col = Number(i) + indexOfNumber;
            console.log(num, 'indexOfNumber', indexOfNumber, `checking ${row}, ${col}`, isNumberAdjacentToSymbol({ row, col }));
            // console.log(`checking ${row}, ${col}`);
            if (isNumberAdjacentToSymbol({ row, col })) {
                // console.log('adjacent!', sum += Number(num));
                sum += Number(num);
                console.log('adjacent!', sum);
                break;
            }
        }
    });

    return sum;
}, 0);

console.log(total);
// console.log(symbols.length);