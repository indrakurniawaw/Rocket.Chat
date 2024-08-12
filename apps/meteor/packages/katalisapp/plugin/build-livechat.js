import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';

import UglifyJS from 'uglify-js';

const livechatSource = path.resolve('packages', 'katalisapp', 'assets', 'katalisapp.js');
const livechatTarget = path.resolve('packages', 'katalisapp', 'assets', 'katalisapp.min.js');

fs.writeFileSync(livechatTarget, UglifyJS.minify(livechatSource).code);

const packagePath = path.join(path.resolve('.'), 'packages', 'katalisapp');
const pluginPath = path.join(packagePath, 'plugin');

const options = {
	env: process.env,
};

if (process.platform === 'win32') {
	execSync(`${pluginPath}/build.bat`, options);
} else {
	execSync(`sh ${pluginPath}/build.sh`, options);
}
