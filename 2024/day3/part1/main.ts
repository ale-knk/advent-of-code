import * as fs from 'fs';
import * as path from 'path';

const inputFilePath = path.join(__dirname, 'input.txt');

function readInputFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(`Error while loading input file: ${err.message}`);
            } else {
                resolve(data);
            }
        });
    });
}

function sumValidMultiplications(memory: string): number {
    const regex = /\bmul\((\d{1,3}),(\d{1,3})\)/g;

    let sum = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(memory)) !== null) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        sum += x * y;
    }

    return sum;
}

async function main() {
    try {
        const memory = await readInputFile(inputFilePath);
        const totalSum = sumValidMultiplications(memory);
        console.log(`Total sum of valid multiplications is: ${totalSum}`);
    } catch (error) {
        console.error(error);
    }
}

main();
