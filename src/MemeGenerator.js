import { useState } from 'react';

export default function MemeGenerator() {
  const [topName, setTopName] = useState('Enter Text for Top');
  const [bottomName, setBottomName] = useState('Enter Text for Bottom');
  const [memeName, setMemeName] = useState('');
  return (
    <>
      <div>
        <h1>MemeGenerator</h1>
      </div>
      <input
        value={memeName}
        onChange={(event) => {
          setMemeName(event.currentTarget.value);
        }}
      />
      <div>Meme Name: {memeName}</div>
      <input
        value={topName}
        onChange={(event) => {
          setTopName(event.currentTarget.value);
        }}
      />
      <div>Top Name: {topName}</div>
      <input
        value={bottomName}
        onChange={(event) => {
          setBottomName(event.currentTarget.value);
        }}
      />
      <div>Bottom Name: {bottomName}</div>
      <img
        src={`https://api.memegen.link/images/${memeName}/${topName}/${bottomName}.png?height=450&width=800`}
        alt="meme.png"
      />
    </>
  );
}
