// index.ts

import * as fs from 'fs';
import * as path from 'path';

const inputFilePath = path.join(__dirname, 'input.txt');

function readInputFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(`Error reading input file: ${err.message}`);
            } else {
                resolve(data);
            }
        });
    });
}

enum MulState {
    ENABLED,
    DISABLED
}

function sumValidMultiplications(memory: string): number {
    const mulRegex = /\bmul\((\d{1,3}),(\d{1,3})\)/g;
    const doRegex = /\bdo\(\)/g;
    const dontRegex = /\bdon't\(\)/g;

    let sum = 0;
    let currentState: MulState = MulState.ENABLED;

    const allMatches: { type: 'mul' | 'do' | 'dont', x?: number, y?: number, index: number }[] = [];

    let match: RegExpExecArray | null;
    while ((match = mulRegex.exec(memory)) !== null) {
        allMatches.push({
            type: 'mul',
            x: parseInt(match[1], 10),
            y: parseInt(match[2], 10),
            index: match.index
        });
    }

    mulRegex.lastIndex = 0;

    while ((match = doRegex.exec(memory)) !== null) {
        allMatches.push({
            type: 'do',
            index: match.index
        });
    }

    while ((match = dontRegex.exec(memory)) !== null) {
        allMatches.push({
            type: 'dont',
            index: match.index
        });
    }

    allMatches.sort((a, b) => a.index - b.index);

    for (const instr of allMatches) {
        if (instr.type === 'do') {
            currentState = MulState.ENABLED;
        } else if (instr.type === 'dont') {
            currentState = MulState.DISABLED;
        } else if (instr.type === 'mul') {
            if (currentState === MulState.ENABLED) {
                const product = instr.x! * instr.y!;
                sum += product;
            } else {
            }
        }
    }

    return sum;
}

async function main() {
    try {
        const memory = await readInputFile(inputFilePath);
        const totalSum = sumValidMultiplications(memory);
        console.log(`The total sum of valid multiplications is: ${totalSum}`);
    } catch (error) {
        console.error(error);
    }
}

main();
