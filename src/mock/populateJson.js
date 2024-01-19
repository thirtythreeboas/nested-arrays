/* eslint-disable */
import { readFileSync, writeFileSync } from 'fs';

const inputFile = 'src/mock/db.json';
const outputFile = 'src/mock/db_new.json';

const jsonData = JSON.parse(readFileSync(inputFile, 'utf8'));

const N = 10;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

for (let i = 0; i < N; i++) {
  jsonData.products.push({
    id: `${i + 1}_${Date.now()}`,
    name: `products${i + 1}`,
    sum: 0,
    count: 0,
    price: getRandomNumber(1, 10),
  })
}

writeFileSync(outputFile, JSON.stringify(jsonData, null, 2), 'utf8');

console.log(`File '${outputFile}' has been sucks ass fully updated.`);
