import * as fs from 'fs';

function loadListsFromFile(filePath: string): { leftList: number[]; rightList: number[] } {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.trim().split('\n');

    const leftList: number[] = [];
    const rightList: number[] = [];

    for (const line of lines) {
        const [left, right] = line.split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    }

    return { leftList, rightList };
}

function calculateSimilarityScore(leftList: number[], rightList: number[]): number {
    const frequencyMap: Map<number, number> = new Map();

    for (const num of rightList) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    let similarityScore = 0;

    for (const num of leftList) {
        const frequency = frequencyMap.get(num) || 0;
        similarityScore += num * frequency;
    }

    return similarityScore;
}

const inputFilePath = 'input.txt';
const { leftList, rightList } = loadListsFromFile(inputFilePath);
const similarityScore = calculateSimilarityScore(leftList, rightList);

console.log(`The similarity score is: ${similarityScore}`);
