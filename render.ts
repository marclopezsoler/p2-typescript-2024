import { Artwork } from "./artworks.js";

const renderMetadata = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/x-icon" href="./assets/2048px-Art_Institute_of_Chicago.png" />
  <link rel="stylesheet" href="styles.css" />
  <title>${title}</title>
</head>`;

const renderArtowrks = (artworks: Array<Artwork>) => {
  let html = "";
  for (const artwork of artworks) {
    if (artwork.title === "Untitled") {
      continue;
    } else {
      const artistName = artwork.artist_display
        .split(/\s+/)
        .slice(0, 2)
        .join(" ");
      let artworkTitle = artwork.title;
      if (artworkTitle.length >= 35) {
        artworkTitle = artworkTitle.slice(0, 35) + "...";
      }

      html += `<div class="artwork">
        <div class="artowrk_data">
          <a>${artworkTitle}</a>
          <a>${artistName}</a>
        </div>
        <img class="artworkImage" src="${
          artwork.thumbnail.lqip
            ? artwork.thumbnail.lqip
            : "./assets/images/placeholder_artwork_image.png"
        }" alt="${artwork.thumbnail.alt_text}">
      </div>`;
    }
  }
  return html;
};

// async function renderArtwork = (artworks: Artwork){

// }

const renderHeader = () =>
  `<header>
    <h1>Art Institute of Chicago</h1> 
  </header>`;
const renderFooter = () => `
  <footer>
    <a href="https://marclopez.xyz" target="_blank">©2024 Marc López</a>
  </footer>
`;

export const render = (artworks: Array<Artwork>) => {
  return `
<html>
  ${renderMetadata("Art Institute of Chicago")}
  ${renderHeader()}
  <body>
  <section class="content">
    <div class="artwork_grid">
      ${renderArtowrks(artworks)}
    </div>
  </section>
  </body>
  ${renderFooter()}
</html>`;
};
