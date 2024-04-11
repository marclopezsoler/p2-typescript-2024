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

export const loadArtworks = async (
  totalElements: number
): Promise<Artwork[]> => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=2&limit=${totalElements}`
    );

    const responseData: {data: any[]} = await response.json();

    const artworks: Artwork[] = responseData.data.map((artworkData: any) => {
      return new Artwork(
        artworkData.id,
        artworkData.title,
        artworkData.date_display,
        artworkData.artist_display,
        artworkData.place_of_origin,
        artworkData.description,
        artworkData.medium_display,
        artworkData.category_title,
        artworkData.style_title
      );
    });
    return artworks;
  } catch (error) {
    console.error("Error loading artworks:", error);
    throw error;
  }
};
