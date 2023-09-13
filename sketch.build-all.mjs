import path from 'path';
import fileList from './tasks/file-list.mjs';
import { execSync } from 'child_process';

const projects = fileList(path.resolve('./sketch/'));

for (let i = 0; i < projects.length; i++) {
  execSync(`rollup -c sketch.rollup.config.mjs --config-sketch=${projects[i]}`)
}
