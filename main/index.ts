/*
 * @Description: 主进程入口
 * @Author: MADAO
 * @Date: 2022-09-13 16:17:13
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-14 11:07:22
 */
import { app, BrowserWindow } from 'electron';
import { join } from 'path';

import { getPathFromRoot } from '~/lib/system';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  // win.loadFile(getPathFromRoot('/dist/index.html'))
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
