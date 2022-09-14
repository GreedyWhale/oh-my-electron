/*
 * @Description: 预加载脚本入口
 * @Author: MADAO
 * @Date: 2022-09-14 15:41:39
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-14 16:02:40
 */
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})