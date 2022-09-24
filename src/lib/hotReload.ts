/*
 * @Description: 监听文件改变，自动刷新应用
 * @Author: MADAO
 * @Date: 2022-09-19 22:30:32
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-24 13:29:47
 */
import { join } from 'path';

import chokidar from 'chokidar';
import { app, BrowserWindow } from 'electron';

let relaunchTimer: NodeJS.Timer;
let reloadTimer: NodeJS.Timer;

const relaunch = () => {
  clearTimeout(relaunchTimer);
  relaunchTimer = setTimeout(() => {
    console.log('重启应用');
    app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) });
    app.exit(0);
  }, 300);
};

const reload = () => {
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    console.log('重新加载窗口');
    const windows = BrowserWindow.getAllWindows();
    windows.forEach(item => {
      item.webContents.reloadIgnoringCache();
    });
  }, 300);
};

const watcher = () => {
  chokidar.watch(join(app.getAppPath(), '/dist/**/*.*'), {
    alwaysStat: true,
    awaitWriteFinish: true,
  }).on('change', (path, stats) => {
    if (stats) {
      if (path.includes('main.js')) {
        relaunch();
        return;
      }

      reload();
    }
  });
};

export default watcher;
