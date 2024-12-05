"use strict";
// index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var inputFilePath = path.join(__dirname, 'input.txt');
function readInputFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject("Error reading input file: ".concat(err.message));
            }
            else {
                resolve(data);
            }
        });
    });
}
var MulState;
(function (MulState) {
    MulState[MulState["ENABLED"] = 0] = "ENABLED";
    MulState[MulState["DISABLED"] = 1] = "DISABLED";
})(MulState || (MulState = {}));
function sumValidMultiplications(memory) {
    var mulRegex = /\bmul\((\d{1,3}),(\d{1,3})\)/g;
    var doRegex = /\bdo\(\)/g;
    var dontRegex = /\bdon't\(\)/g;
    var sum = 0;
    var currentState = MulState.ENABLED;
    var allMatches = [];
    var match;
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
    allMatches.sort(function (a, b) { return a.index - b.index; });
    for (var _i = 0, allMatches_1 = allMatches; _i < allMatches_1.length; _i++) {
        var instr = allMatches_1[_i];
        if (instr.type === 'do') {
            currentState = MulState.ENABLED;
        }
        else if (instr.type === 'dont') {
            currentState = MulState.DISABLED;
        }
        else if (instr.type === 'mul') {
            if (currentState === MulState.ENABLED) {
                var product = instr.x * instr.y;
                sum += product;
            }
            else {
            }
        }
    }
    return sum;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var memory, totalSum, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, readInputFile(inputFilePath)];
                case 1:
                    memory = _a.sent();
                    totalSum = sumValidMultiplications(memory);
                    console.log("The total sum of valid multiplications is: ".concat(totalSum));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
main();
