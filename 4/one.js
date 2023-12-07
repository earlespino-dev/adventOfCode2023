const fs = require('fs');

// const inputArray = fs.readFileSync('./test.txt', 'utf-8').split('\n');
const inputArray = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const totalPoints = inputArray.reduce((points, line) => {
    console.log(line);
    const [ _cardInfo, numbers ] = line.split(':').map(str => str.trim());
    // console.log(numbers);
    const [ winningNumbers, numbersIhave ] = numbers.split('|').map(str => str.trim().split(' ').map(s => s.trim()).filter(d => d));
    // console.log(line);
    console.log('winningNumbers', winningNumbers);
    console.log('numbersIhave', numbersIhave);
    const pointPerCard = winningNumbers.reduce((pts, winner) => {
        if (numbersIhave.includes(winner)) {
            console.log('winner!', winner, pts);
            if (pts === 0) {
                pts += 1;
            } else {
                pts *= 2;
            }
            console.log('pts after', pts);
        }
        return pts;
    }, 0);

    return points += pointPerCard;

}, 0);

console.log(totalPoints);
