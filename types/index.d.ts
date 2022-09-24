/*
 * @Description: 常用文件类型
 * @Author: MADAO
 * @Date: 2022-09-14 14:59:30
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-24 11:13:18
 */
declare module '*.scss' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}

declare module '*.png' {
  const image: string;
  export default image;
}

declare module '*.svg' {
  const svg: any;
  export default svg;
}

declare module '*?raw' {
  const raw: string;
  export default raw;
}

declare module '*.webm' {
  const webm: string;
  export default webm;
}

declare module '*.mp4' {
  const webm: string;
  export default webm;
}
