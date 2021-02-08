import { compile, NexeOptions } from 'nexe';
import path from 'path';
import packageJson from './package.json';
import inquirer from 'inquirer';

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
    const compilerOptions: Partial<NexeOptions> = {
      input: './dist/index.js',
      output: `./pkg/${path.basename(__dirname)}-v${version}`,
      // targets: platforms.map((platform: string) => ({
      //   version: nodeVersion,
      //   platform,
      //   arch: 'x64',
      // })),
      targets: [
        {
          version: nodeVersion,
          platform: platforms,
          arch,
        },
      ],
    };

    console.log('compilerOptions', compilerOptions);

    return compile(compilerOptions);
  })
  .then(() => {
    console.log('编译成功');
  });
