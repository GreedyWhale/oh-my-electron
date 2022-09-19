/*
 * @Description: 监听文件变化
 * @Author: MADAO
 * @Date: 2022-09-19 20:59:39
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-19 22:27:57
 */
const chokidar = require('chokidar');
const path = require('path');
const { spawn } = require('child_process');

const watchDir = path.join(__dirname, '../dist');
let launched = false;
let rendererWatchTimer = -1;
let chalk;

const launchApplication = () => {
  if (launched) {
    return;
  }

  launched = true;
  console.log(chalk.magenta('🚚启动electron!'))
  const p = spawn('yarn electron .', { shell: true });
  p.stdout.on('data', chunks => console.log(chalk.cyan(`📃electron: ${chunks.toString()}`)));
  p.stderr.on('data', chunks => console.log(chalk.red(`❌electron: ${chunks.toString()}`)));
};

const mainProcessWatcher = () => new Promise(resolve => {
  chokidar.watch(path.join(watchDir, './main/index.js'), { awaitWriteFinish: true, })
    .on('change', () => {
      console.log(chalk.green('✨主进程文件打包完毕!'));
      resolve(true);
    })
});

const preloadProcessWatcher = () => new Promise(resolve => {
  chokidar.watch(path.join(watchDir, './preload/index.js'), { awaitWriteFinish: true, })
    .on('change', () => {
      console.log(chalk.green('✨预加载文件打包完毕!'));
      resolve(true);
    })
});

const rendererProcessWatcher = () => new Promise(resolve => {
  chokidar.watch(path.join(watchDir, './renderer'), { awaitWriteFinish: true })
    .on('change', () => {
      clearTimeout(rendererWatchTimer);
      rendererWatchTimer = setTimeout(() => {
        console.log(chalk.green('✨渲染进程文件打包完毕!'));
        resolve(true);
      }, 300);
    })
});

const main = async () => {
  chalk = (await import('chalk')).default;
  Promise.all([
    mainProcessWatcher(),
    preloadProcessWatcher(),
    rendererProcessWatcher(),
  ]).then(launchApplication);
};

main();