import React from 'react';
import { createRoot } from 'react-dom/client';
import loadingSvg from '~/renderer/assets/images/loading.svg?raw';

import './App.scss';
import styles from './App.module.scss';

console.log(1);
const App: React.FC = () => (<div className={styles.a}>test <p dangerouslySetInnerHTML={{ __html: loadingSvg }} ></p></div>);
const root = createRoot(document.querySelector('#app')!);
root.render(<App />);

function a() {
  console.log(1);
}
