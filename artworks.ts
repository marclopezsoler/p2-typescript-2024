export class Artwork {
  constructor(
    public id: number,
    public title: string,
    public date_display: string,
    public artist_display: string,
    public place_of_origin: string,
    public description: string,
    public medium_display: string,
    public category_titles: string,
    public style_title: string
  ) {}
}

export const loadArtworks = async (totalElements: number) => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=2&limit=${totalElements}`
  );

  const { data } = (await response.json()) as {
    data: any[];
  };

  const artworks: Array<Artwork> = [];

  for (const {
    id,
    title,
    date_display,
    artist_display,
    place_of_origin,
    description,
    medium_display,
    category_title,
    style_title,
  } of data) {
    artworks.push(
      new Artwork(
        id,
        title,
        date_display,
        artist_display,
        place_of_origin,
        description,
        medium_display,
        category_title,
        style_title
      )
    );
  }
  return artworks;
};
