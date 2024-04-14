import { writeFile } from "fs/promises";
import { generateArtworkPages, render } from "./render.js";
import { loadArtworks } from "./artworks.js";

const artworks = await loadArtworks(70);
const html = render(artworks);
await writeFile('artworks.html', html);
await generateArtworkPages(artworks);

