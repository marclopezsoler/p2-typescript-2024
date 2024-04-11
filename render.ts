import { Artwork } from "./artworks.js";

const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
  </style>
</head>`;

const renderArtowrks = (artworks: Array<Artwork>) => {
  let html = "";
  for (const artwork of artworks) {
    html += `<div>
    </div>`;
  }
  return html;
}

export const render = (artworks: Array<Artwork>) => {
  return `
<html>
  <body>
  </body>
</html>`;
};
