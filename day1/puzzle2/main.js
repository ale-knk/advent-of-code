"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function loadListsFromFile(filePath) {
    var fileContent = fs.readFileSync(filePath, 'utf-8');
    var lines = fileContent.trim().split('\n');
    var leftList = [];
    var rightList = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var _a = line.split(/\s+/).map(Number), left = _a[0], right = _a[1];
        leftList.push(left);
        rightList.push(right);
    }
    return { leftList: leftList, rightList: rightList };
}
function calculateSimilarityScore(leftList, rightList) {
    var frequencyMap = new Map();
    for (var _i = 0, rightList_1 = rightList; _i < rightList_1.length; _i++) {
        var num = rightList_1[_i];
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    var similarityScore = 0;
    for (var _a = 0, leftList_1 = leftList; _a < leftList_1.length; _a++) {
        var num = leftList_1[_a];
        var frequency = frequencyMap.get(num) || 0;
        similarityScore += num * frequency;
    }
    return similarityScore;
}
var inputFilePath = 'input.txt';
var _a = loadListsFromFile(inputFilePath), leftList = _a.leftList, rightList = _a.rightList;
var similarityScore = calculateSimilarityScore(leftList, rightList);
console.log("The similarity score is: ".concat(similarityScore));
