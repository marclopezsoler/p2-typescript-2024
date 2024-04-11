
export class Artwork {
  constructor(
  ) {}
}

export const loadArtworks = async (n: number) => {
  const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=2&limit=${n}`);
};