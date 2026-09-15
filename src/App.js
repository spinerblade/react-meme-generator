import './App.css';
import { useState } from 'react';
import MemeGenerator from './MemeGenerator';

export default function App() {
  return (
    <div className="App">
      <img
        src="https://api.memegen.link/images/ds/top/bottom.png?height=450&width=800 "
        alt="ds-small_file-high_quality.png"
      />
      <MemeGenerator />
    </div>
  );
}
