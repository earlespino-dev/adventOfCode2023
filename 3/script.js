const fs = require('fs');

// const inputArray = fs.readFileSync('./test.txt', 'utf-8').split('\n');
const inputArray = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const matrix = inputArray.reduce((rows, row) => {
    rows.push(row.trim().split(''));
    return rows;
}, []);

// fs.writeFileSync('./matrix.json', JSON.stringify(matrix));

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
    ];

    return adjacent.some(({ row, col }) => matrix[row] && matrix[row][col] && matrix[row][col].match(/[^\.\d\n\r]/));
};

const total = inputArray.reduce((sum, currentLine, row, arr) => {
    console.log(row-1, arr[row-1]);
    console.log(row, currentLine);
    console.log(row+1, arr[row+1]);
    currentLine.split(/\D/).filter(str => str).forEach((num) => {
        const indexOfNumber = currentLine.indexOf(num);
        const numArr = num.split('');
        for(let i in numArr) {
            const col = Number(i) + indexOfNumber;
            console.log(num, 'digit', numArr[i], 'indexOfNumber', indexOfNumber, `checking ${row}, ${col}`, isNumberAdjacentToSymbol({ row, col }));
            if (isNumberAdjacentToSymbol({ row, col })) {
                sum += Number(num);
                console.log('adjacent!', sum, row, col);
                break;
            }
        }
    });

    return sum;
}, 0);

console.log(total);
