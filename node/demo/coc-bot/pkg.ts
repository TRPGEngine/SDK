import { compile, NexeOptions } from 'nexe';
import path from 'path';
import packageJson from './package.json';
import inquirer from 'inquirer';

const name = path.basename(__dirname);
const version = packageJson.version;
const nodeVersion = '14.15.1';
const arch = 'x64';

inquirer
  .prompt([
    {
      name: 'platforms',
      // https://github.com/nexe/nexe/issues/862
      // type: 'checkbox',
      type: 'list',
      choices: ['windows', 'mac', 'linux', 'alpine'],
    },
  ])
  .then(({ platforms }) => {
    const platform = platforms;

    const compilerOptions: Partial<NexeOptions> = {
      input: './dist/index.js',
      output: `./pkg/${name}-${platform}-${arch}-v${version}`,
      targets: [
        {
          version: nodeVersion,
          platform,
          arch,
        },
      ],
    };

    console.log('compilerOptions', compilerOptions);

    return compile(compilerOptions);
  })
  .then(() => {
    console.log('编译成功!');
  });
