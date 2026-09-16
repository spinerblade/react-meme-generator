import { doc } from 'prettier';
import { useEffect, useState } from 'react';

export default function MemeGenerator() {
  const [topText, setTopText] = useState(' ');
  const [inputTopText, setInputTopText] = useState('');
  const [bottomText, setBottomText] = useState(' ');
  const [inputBottomText, setInputBottomText] = useState('');
  const [memeName, setMemeName] = useState('bender');
  const [inputMemeName, setInputMemeName] = useState('Enter Meme Name');
  return (
    <>
      <div>
        <h1>MemeGenerator</h1>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setMemeName(inputMemeName);
        }}
      >
        <label htmlFor="memeTemplate">Meme template</label>
        <input
          id="memeTemplate"
          value={inputMemeName}
          onChange={(event) => {
            setInputMemeName(event.currentTarget.value);
          }}
        />
        <div>
          <button>Generate Template</button>
        </div>
        <div>Meme Name: {memeName}</div>
      </form>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setTopText(inputTopText);
        }}
      >
        <label htmlFor="topText">Top text</label>
        <input
          id="topText"
          value={inputTopText}
          onChange={(event) => {
            setInputTopText(event.currentTarget.value);
          }}
        />
        <div>
          <button>Set Top Text</button>
        </div>
        <div>Top Text: {topText}</div>
      </form>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setBottomText(inputBottomText);
        }}
      >
        <label htmlFor="bottomText">Bottom text</label>
        <input
          id="bottomText"
          value={inputBottomText}
          onChange={(event) => {
            setInputBottomText(event.currentTarget.value);
          }}
        />
        <div>
          <button>Set Bottom Text</button>
        </div>
        <div>Bottom Text: {bottomText}</div>
      </form>
      <img
        data-test-id="meme-image"
        src={`https://api.memegen.link/images/${memeName}/${topText}/${bottomText}.png`}
        alt="meme.png"
      />

      <div>
        <button
          onClick={() => {
            fetch(
              `https://api.memegen.link/images/${memeName}/${topText}/${bottomText}.png`,
            )
              .then((response) => {
                return response.blob();
              })
              .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${memeName}-${topText}-${bottomText}.png`;
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Download
        </button>
      </div>
    </>
  );
}
