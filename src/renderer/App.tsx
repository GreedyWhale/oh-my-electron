import React from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => (<div>oh my electron!</div>);
const root = createRoot(document.querySelector('#app')!);
root.render(<App />);
