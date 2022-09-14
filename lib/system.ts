/*
 * @Description: 系统相关的方法
 * @Author: MADAO
 * @Date: 2022-09-14 10:52:28
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-14 11:04:59
 */
import { join } from 'path';

export const getPathFromRoot = (path: string = '') => join(__dirname, '../', path);