import { writeFile } from "fs/promises";
import { render } from "./render.js";
import { loadArtworks } from "./artworks.js";

const artworks = await loadArtworks(50);
const html = render(artworks);
await writeFile('artworks.html', html);

