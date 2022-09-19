/*
 * @Description: 主进程入口
 * @Author: MADAO
 * @Date: 2022-09-13 16:17:13
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-19 11:53:16
 */
import { app, BrowserWindow } from 'electron';
import { join } from 'path';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      /**
       * 值为 false 可以在控制台和renderer进程中使用 Node 相关 API
       * 由于bytenode 原因在renderer进程必须可以使用 Node 相关 API，所以需要false, 这会带来安全性问题
       */
      contextIsolation: process.env.APP_ENCRYPT === 'true' ? false : true,
      preload: join(__dirname, '../preload/index.js')
    }
  })

  win.loadFile(join(app.getAppPath(), '/dist/index.html'))
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
