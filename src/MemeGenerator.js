import { useState } from 'react';

export default function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeName, setMemeName] = useState('bender');
  const [inputMemeName, setInputMemeName] = useState('');

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
      <h1 className="title">MemeGenerator</h1>

      <form
        className="meme-form"
        onSubmit={(event) => {
          event.preventDefault();
          setMemeName(inputMemeName);
        }}
      >
        <label htmlFor="memeTemplate">Meme template</label>
        <input
          placeholder="Enter Meme Name"
          id="memeTemplate"
          value={inputMemeName}
          onChange={(event) => {
            setInputMemeName(event.currentTarget.value);
          }}
        />
        <div>
          <button>Generate Template</button>
        </div>
        <div className="meme-name">Meme Name: {memeName}</div>
      </form>

      <label htmlFor="topText">Top text</label>
      <input
        placeholder="Enter Top Text"
        id="topText"
        value={topText}
        onChange={(event) => {
          setTopText(event.target.value);
        }}
      />

      <div className="top-text">Top Text: {topText}</div>
      <label htmlFor="bottomText">Bottom text</label>
      <input
        placeholder="Enter Bottom Text"
        id="bottomText"
        value={bottomText}
        onChange={(event) => {
          setBottomText(event.target.value);
        }}
      />

      <div className="bottom-text">Bottom Text: {bottomText}</div>

      <img
        className="image"
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
