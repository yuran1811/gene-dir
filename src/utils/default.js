const path = require('path');

const defaultMes = `This file is auto generated by gen-dir`;

const dirPath = (...rest) => path.resolve(...rest);

const cppDefault = (name = 'TASK') =>
	`#include <bits/stdc++.h>
using namespace std;

int main() {
	// freopen("${name}.INP", "r", stdin);
	// freopen("${name}.OUT", "w", stdout);
	cout << "${defaultMes}";
	return 0;
}`;

module.exports = { defaultMes, dirPath, cppDefault };
