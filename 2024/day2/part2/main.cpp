#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <cmath>
using namespace std;

bool isSafeReport(const vector<int>& report) {
    if (report.size() < 2) return false;

    bool increasing = true, decreasing = true;
    for (int i = 0; i < report.size() - 1; ++i) {
        int diff = report[i + 1] - report[i];

        if (abs(diff) < 1 || abs(diff) > 3) return false;

        if (diff > 0) decreasing = false;
        if (diff < 0) increasing = false;
    }

    return increasing || decreasing;
}

bool isSafeWithOneRemoval(const vector<int>& report) {
    if (isSafeReport(report)) {
        return true;
    }

    for (size_t i = 0; i < report.size(); ++i) {
        vector<int> modifiedReport;
        for (size_t j = 0; j < report.size(); ++j) {
            if (j != i) {
                modifiedReport.push_back(report[j]);
            }
        }

        if (isSafeReport(modifiedReport)) {
            return true;
        }
    }

    return false;
}

int main() {
    ifstream inputFile("input.txt");
    if (!inputFile) {
        std::cerr << "Error al cargar input.txt" << std::endl;
        return 1;
    }

    string line;
    int safeCount = 0;

    while (getline(inputFile, line)) {
        istringstream iss(line);
        vector<int> report;
        int num;
        while (iss >> num) {
            report.push_back(num);
        }

        if (isSafeWithOneRemoval(report)) {
            ++safeCount;
        }
    }

    inputFile.close();

    cout << "Number of save reports: " << safeCount << endl;
    return 0;
}
