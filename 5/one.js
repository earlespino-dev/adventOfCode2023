const fs = require('fs');

const inputArray = fs.readFileSync('./test.txt', 'utf-8').split('\r\n\r\n');
const [ogSeeds, ...ogMappings] = inputArray;
const seeds = ogSeeds.replace('seeds: ', '').split(' ').filter(s => s.match(/\d/));
// const inputArray = fs.readFileSync('./input.txt', 'utf-8').split('\n');
// const maps = 
// console.log(inputArray);
// console.log(seeds);
// console.log(ogMappings);

const map = ogMappings.reduce((mappings, m, i) => {
    console.log(i, m);
    const mappingName = m.match(/^(.*) map:/)[1];

    if (mappings[mappingName] === undefined) {
        mappings[mappingName] = {}
    }

    const innerMappingsArrays = m.match(/(\d*) (\d*) (\d*)/g)
    innerMappingsArrays.forEach((line) => {
        const [
            destinationRangeStart,
            sourceRangeStart,
            range
        ] = line.split(' ');
        console.log(destinationRangeStart, sourceRangeStart, range);
        for (let r = 0; r < range; r++) {
            mappings[mappingName][Number(sourceRangeStart) + r] = Number(destinationRangeStart) + r;
            // console.log(mappings[mappingName][Number(sourceRangeStart) + r], Number(destinationRangeStart) + r);
        }
    })
    return mappings;
}, {});

console.log(map);