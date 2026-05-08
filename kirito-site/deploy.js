const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const conn = new Client();
const localDir = 'D:\\yhJavaCode\\kirito\\Kirito\\kirito-site\\out';
const remoteDir = '/var/www/kirito';

conn.on('ready', () => {
  console.log('SSH connected');
  conn.sftp((err, sftp) => {
    if (err) throw err;

    const uploadFile = (localPath, remotePath) => {
      return new Promise((resolve, reject) => {
        sftp.fastPut(localPath, remotePath, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    };

    const uploadDir = async (local, remote) => {
      const items = fs.readdirSync(local, { withFileTypes: true });
      for (const item of items) {
        const localPath = path.join(local, item.name);
        const remotePath = remote + '/' + item.name;
        if (item.isDirectory()) {
          try { await sftp.mkdir(remotePath); } catch (e) {}
          await uploadDir(localPath, remotePath);
        } else {
          await uploadFile(localPath, remotePath);
          console.log('Uploaded:', remotePath);
        }
      }
    };

    uploadDir(localDir, remoteDir).then(() => {
      console.log('Deploy complete!');
      conn.end();
    }).catch((err) => {
      console.error('Deploy failed:', err);
      conn.end();
    });
  });
}).connect({
  host: '47.110.134.77',
  port: 22,
  username: 'root',
  password: 'Yanhao,731',
  readyTimeout: 30000,
});
