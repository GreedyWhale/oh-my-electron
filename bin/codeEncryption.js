/*
 * @Description: 源码加密
 * @Author: MADAO
 * @Date: 2022-09-14 16:24:55
 * @LastEditors: MADAO
 * @LastEditTime: 2022-11-07 16:11:39
 */
const bytenode = require('bytenode');
const fse = require('fs-extra');
const path = require('path');

const fillFile = file => fse.writeFile(file.target, `
  if (require) {
    const path = require('path');
    const bytenode = require('bytenode');
    require(path.join(__dirname, '${file.publicPath}', '${path.basename(file.target).replace('.js', '.jsc')}'));
  }
`);

const main = async () => {
  const files = [
    { target: path.join(__dirname, '../dist/main/main.js'), publicPath: './' },
    { target: path.join(__dirname, '../dist/preload/preload.js'), publicPath: './' },
    { target: path.join(__dirname, '../dist/renderer/app.js'), publicPath: './renderer' },
  ];

  const compileTasks = files.map(file => Promise.all([
    bytenode.compileFile({
      filename: file.target,
      compileAsModule: true,
      electron: true,
    }),
    fillFile(file),
  ]));

  await Promise.all(compileTasks).then(() => { console.log('done!'); });
};

main();
