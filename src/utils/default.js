const path = require('path');

const defaultMes = `This file is auto generated by gen-dir`;

const runCpp = (name = 'new') => `g++ ${name}.cpp && a`;

const dirPath = (...rest) => path.resolve(...rest);

const batDefault = `@echo off
gen > in
sol <in > out
brute <in >ans

fc out ans
if errorlevel 1 pause
test`;

const cppDefault = (name = 'TASK', aio = 0, options = { type: 'basic' }) => {
	const code = {
		basic: `#include <bits/stdc++.h>
using namespace std;

int main() {
	// freopen("${aio ? name : `./in/${name}`}.INP", "r", stdin);
	// freopen("${aio ? name : `./out/${name}`}.OUT", "w", stdout);
	cout << "${defaultMes}";
	return 0;
}`,
		brute: `#include <bits/stdc++.h>
using namespace std;

int main() {
	// freopen("${aio ? name : `./in/${name}`}.INP", "r", stdin);
	// freopen("${aio ? name : `./out/${name}`}.OUT", "w", stdout);
	cout << "${defaultMes}";
	return 0;
}`,
		gene: `#include <bits/stdc++.h>
using namespace std;

const string TASK = "task";
mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());

long long randInt(long long l, long long r) {
    assert(l <= r);
    return l + 1LL * rng() % (r - l + 1);
}

int main() {
  srand(time(NULL));
  return 0;
}`,
	};

	if (!(options.type in code)) options.type = 'basic';
	return code[options.type];
};

module.exports = { defaultMes, dirPath, cppDefault, runCpp, batDefault };
