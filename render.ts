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
      <div class="header_child">
        <img class="header_logo" src="./assets/2048px-Art_Institute_of_Chicago_header.png">
        <section class="header_links">
          <a href="/" >Visit</a>
          <a href="/" >Exhibitions & Events</a>
          <a href="#collection" >The Collection</a>
          <img class="search_icon" src="./assets/images/search.svg" >
        </section>
      </div>
    </header>`;
const renderFooter = () => `
  <footer>
    <a href="https://marclopez.xyz" target="_blank">©2024 Marc López</a>
  </footer>
`;

// <video src="https://aic-web-cms-uploads.s3.us-east-2.amazonaws.com/a8a34eff-90e5-4c63-adcd-a22a69c04567/HomepageVideo_v7_LION_small.mp4" loop>
// </video>

export const render = (artworks: Array<Artwork>) => {
  return `
<html>
  ${renderMetadata("Art Institute of Chicago")}
  ${renderHeader()}
  <body>
  <section class="content">
  <div class="hero">
    <div class="video_overlay"></div>
    <video src="./assets/hompage_video.mp4" loop autoplay>
    </video>
    <h1>WELCOME TO THE ART INSTITUTE OF CHICAGO</h1>
  </div>
    <div class="artwork_grid" id="collection">
      ${renderArtowrks(artworks)}
    </div>
  </section>
  </body>
  ${renderFooter()}
</html>`;
};
