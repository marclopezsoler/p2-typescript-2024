import { writeFile } from "fs/promises";
import { Artwork } from "./artworks.js";

const renderMetadata = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/x-icon" href="../assets/2048px-Art_Institute_of_Chicago.png" />
  <link rel="stylesheet" href="../styles.css" />
  <title>${title}</title>
</head>`;

const renderArtowrks = (artworks: Array<Artwork>) => {
  let html = "";
  for (const artwork of artworks) {
    if (artwork.title === "Untitled" || artwork.image_id === null) {
      continue;
    } else {
      const artistName = artwork.artist_display
        .split(/\s+/)
        .slice(0, 2)
        .join(" ");
      let artworkTitle = artwork.title;
      if (artworkTitle.length >= 30) {
        artworkTitle = artworkTitle.slice(0, 30) + "...";
      }

      html += `
        <div class="artwork">
          <a class="artwork_child" href="/pages/${artwork.id}.html">
            <img class="artworkImage" src=${`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`} alt="${
        artwork.thumbnail.alt_text
      }">
            <div class="artwork_data">
              <h3 class="title">${artwork.title}</h3>
              <h4 class="author">${artistName}</h4>
            </div>
          </a>
        </div>`;
    }
  }
  return html;
};

const renderHeader = (collectionUrl: string) =>
  `<header>
      <div class="header_child">
        <a href="../artworks.html">
          <img class="header_logo" src="../assets/2048px-Art_Institute_of_Chicago_header.png">
        </a>
        <section class="header_links">
          <a href="../artworks.html">Visit</a>
          <a href="../artworks.html">Exhibitions & Events</a>
          <a href=${collectionUrl} >The Collection</a>
          <img class="search_icon" src="../assets/images/search.svg" >
        </section>
      </div>
    </header>`;

const renderHero = () => `
    <div class="hero">
    <div class="video_container">
      <div class="video_overlay"></div>
      <video src="./assets/hompage_video.mp4" loop autoplay>
      </video>
    </div>
    <h1>WELCOME TO THE ART INSTITUTE OF CHICAGO</h1>
    <a class="button" href="#collection">Check our collection</a>
  </div>
    `;

const renderFooter = () => `
  <footer>
    <a href="https://marclopez.xyz" target="_blank">©2024 Marc López</a>
  </footer>
`;

const renderSectionHeader = (title: string) =>
  `
  <div class="section_header">
    <h2>${title}</h2>
  </div>
  `;

export const render = (artworks: Array<Artwork>) => {
  return `
<html>
  ${renderMetadata("Art Institute of Chicago")}
  ${renderHeader("#collection")}
  <body>
    <section class="content">
    ${renderHero()}
    <div id="collection">
      ${renderSectionHeader("COLLECTION")}
      <div class="artwork_grid">
        ${renderArtowrks(artworks)}
      </div>
    </div>
  </section>
  </body>
  ${renderFooter()}
</html>`;
};

export async function generateArtworkPages(artworks: Array<Artwork>) {
  for (const artwork of artworks) {
    await artworkPage(artwork);
  }
}

const renderArtwork = (artwork: Artwork) => {
  const artist_display = artwork.artist_display;
  const artistName = artist_display.split(/\s+/).slice(0, 2).join(" ");
  let nationality = "";
  if (artist_display && artist_display.split(/\s+/).length > 2) {
    nationality = artist_display.split(/\s+/)[2].replace(",", "");
  }
  const lifeDate = artist_display.split(/\s+/)[3];

  return `
    <html>
      ${renderMetadata(`${artwork.title} — Art Institute of Chicago`)}
      ${renderHeader("../artworks.html#collection")}
      <body>
        <section class="detail">
          <div class="video_overlay"></div>
          <img class="bg_image" src=${`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}/>
          <h1>${artwork.title} ${
    artwork.date_display === "n.d." ? "" : `— ${artwork.date_display}`
  }</h1>
        <h2>By ${artistName}</h2>
        </section>
        <section>
          <p>${artwork.title} ${
    artwork.date_display === "n.d." ? "" : `— ${artwork.date_display}`
  }</p>
          <p>${nationality}</p>
          <p>${lifeDate}</p>
          <p>${artwork.description}</p>
        </section>
        <section>
          ${renderRowDetail("Artist", artistName)}
          ${renderRowDetail("Title", artwork.title)}
          ${renderRowDetail("Place", artwork.place_of_origin)}
          ${renderRowDetail(
            "Date",
            `${artwork.date_start}-${artwork.date_end}`
          )}
          ${renderRowDetail("Medium", artwork.medium_display)}
          ${renderRowDetail("Dimensions", artwork.dimensions)}
          ${renderRowDetail("Credit Line", artwork.credit_line)}
          ${renderRowDetail("Reference Number", artwork.main_reference_number)}
        </section>
      </body>
    </html>
  `;
};

const renderRowDetail = (type: string, value: string) =>
  `
    <div>
      <p>${type}</p>
      <p>${value}</p>
    </div>
  `;

export async function artworkPage(artwork: Artwork) {
  const artworkFile = renderArtwork(artwork);
  const filePath = `pages/${artwork.id}.html`;
  await writeFile(filePath, artworkFile);
}
