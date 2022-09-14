/*
 * @Description: 源码加密
 * @Author: MADAO
 * @Date: 2022-09-14 16:24:55
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-15 00:01:37
 */
const bytenode = require('bytenode');
const fse = require('fs-extra');
const path = require('path');

const fillFile = (file) => fse.writeFile(file.target, `
  if (require) {
    const path = require('path');
    const bytenode = require('bytenode');
    require(path.join(__dirname, '${file.publicPath}', '${path.basename(file.target).replace('.js', '.jsc')}'));
  }
`)

const main = async () => {
  const rendererProcessPath = path.join(__dirname, '../dist/renderer');
  const rendererProcess = fse.readdirSync(rendererProcessPath)
    .filter(value => value.endsWith('.js'))
    .map(value => ({ target: `${rendererProcessPath}/${value}`, publicPath: './renderer' }))
  const files = [
    { target: path.join(__dirname, '../dist/main/index.js'), publicPath: './' },
    { target: path.join(__dirname, '../dist/preload/index.js'), publicPath: './' },
    ...rendererProcess,
  ]

  const compileTasks = files.map(file => Promise.all([
    bytenode.compileFile({
      filename: file.target,
      compileAsModule: true,
      electron: true,
    }),
    fillFile(file),
  ]));

  await Promise.all(compileTasks).then(() => { console.log('done!'); })
}

main();