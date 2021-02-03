import { TRPGClient } from '../';
import inquirer from 'inquirer';

(async () => {
  const params = await inquirer.prompt([
    {
      name: 'username',
    },
    {
      name: 'password',
    },
  ]);
  const client = new TRPGClient('ws://127.0.0.1:23256');

  const userInfo = await client.loginAccount(params.username, params.password);

  console.log('userInfo', userInfo);

  client.disconnect();
})();
