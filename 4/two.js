const fs = require('fs');

// const inputArray = fs.readFileSync('./test.txt', 'utf-8').split('\n');
const inputArray = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const parseLine = (cards, numbers, cardNumber) => {
    const [winningNumbers, numbersIhave] = numbers.split('|').map(str => str.trim().split(' ').map(s => s.trim()).filter(d => d));
    numbersIhave.filter((num) => winningNumbers.includes(num)).forEach((w, i) => {
        const index = i + 1;
        if (cards[cardNumber + index] === undefined) {
            cards[cardNumber + index] = 0;
        }
        cards[cardNumber + index] += 1;
    });
};

const cardCounts = inputArray.reduce((cards, line) => {
    const [cardInfo, numbers] = line.split(':').map(str => str.trim());
    const [cardNumber] = cardInfo.split(' ').map(s => s.trim()).filter(s => s.match(/\d/)).map(s => Number(s));
    if (cards[cardNumber] === undefined) {
        cards[cardNumber] = 0;
    }
    cards[cardNumber] += 1;
    if (cards[cardNumber] > 1) {
        for (let i = 0; i < cards[cardNumber]; i++) {
            parseLine(cards, numbers, cardNumber)
        }
    } else {
        parseLine(cards, numbers, cardNumber);
    }
    return cards;
}, {});

// console.log(cardCounts);
console.log(Object.values(cardCounts).reduce((sum, val) => sum += val, 0));
