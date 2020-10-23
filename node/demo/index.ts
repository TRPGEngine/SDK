import { TRPGClient } from '../';
import inquirer from 'inquirer';

const client = new TRPGClient('wss://trpgapi.moonrailgun.com');

inquirer
  .prompt([
    {
      name: 'username',
    },
    {
      name: 'password',
    },
  ])
  .then(async (data) => {
    const userInfo = await client.loginAccount(data.username, data.password);

    console.log('userInfo', userInfo);
  })
  .then(() => {
    client.disconnect();
  });
