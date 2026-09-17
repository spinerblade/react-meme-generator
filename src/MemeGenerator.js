import { useState } from 'react';

export default function MemeGenerator() {
  const [topText, setTopText] = useState('');
  // const [inputTopText, setInputTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  // const [inputBottomText, setInputBottomText] = useState('');
  const [memeName, setMemeName] = useState('bender');
  const [inputMemeName, setInputMemeName] = useState('Enter Meme Name');

  function encodeMemeText(text) {
    const trimmed = text.trim();
    if (trimmed === '') {
      return '_';
    }
    return trimmed.replace(/ /g, '_');
  }

  function buildMemeUrl(name, top, bottom) {
    const trimmedTop = top.trim();
    const trimmedBottom = bottom.trim();

    if (trimmedTop === '' && trimmedBottom === '') {
      return `https://api.memegen.link/images/${name}.png`;
    }

    return `https://api.memegen.link/images/${name}/${encodeMemeText(
      trimmedTop,
    )}/${encodeMemeText(trimmedBottom)}.png`;
  }

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

      {/* <form
        onSubmit={(event) => {
          event.preventDefault();
          setTopText(inputTopText);
        }}
      > */}
      <label htmlFor="topText">Top text</label>
      <input
        id="topText"
        value={topText}
        onChange={(event) => {
          setTopText(event.target.value);
        }}
      />
      {/* <div>
          <button>Set Top Text</button>
        </div> */}
      <div>Top Text: {topText}</div>
      {/* </form> */}

      {/* <form
        onSubmit={(event) => {
          event.preventDefault();
          setBottomText(inputBottomText);
        }}
      > */}
      <label htmlFor="bottomText">Bottom text</label>
      <input
        id="bottomText"
        value={bottomText}
        onChange={(event) => {
          setBottomText(event.target.value);
        }}
      />
      {/* <div>
          <button>Set Bottom Text</button>
        </div> */}
      <div>Bottom Text: {bottomText}</div>
      {/* </form> */}
      <img
        data-test-id="meme-image"
        src={buildMemeUrl(memeName, topText, bottomText)}
        alt="meme.png"
      />

      <div>
        <button
          onClick={() => {
            fetch(buildMemeUrl(memeName, topText, bottomText))
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
