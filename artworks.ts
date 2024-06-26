export class Artwork {
  constructor(
    public id: number,
    public title: string,
    public thumbnail: {
      lqip: string;
      width: number;
      height: number;
      alt_text: string;
    },
    public date_display: string,
    public artist_display: string,
    public place_of_origin: string,
    public description: string,
    public medium_display: string,
    public image_id: string,
    public date_start: number,
    public date_end: number,
    public dimensions: string,
    public credit_line: string,
    public main_reference_number: string
  ) {}
}

export const loadArtworks = async (
  totalElements: number
): Promise<Artwork[]> => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=1&limit=${totalElements}`
    );

    const responseData: { data: any[] } = await response.json();

    const artworks: Artwork[] = responseData.data.map((artworkData: any) => {
      return new Artwork(
        artworkData.id,
        artworkData.title,
        {
          lqip: artworkData.thumbnail?.lqip || "",
          width: artworkData.thumbnail?.width || 0,
          height: artworkData.thumbnail?.height || 0,
          alt_text: artworkData.thumbnail?.alt_text || "",
        },
        artworkData.date_display,
        artworkData.artist_display,
        artworkData.place_of_origin,
        artworkData.description,
        artworkData.medium_display,
        artworkData.image_id,
        artworkData.date_start,
        artworkData.date_end,
        artworkData.dimensions,
        artworkData.credit_line,
        artworkData.main_reference_number
      );
    });
    return artworks;
  } catch (error) {
    console.error("Error loading artworks:", error);
    throw error;
  }
};
