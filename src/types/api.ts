export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

export interface EpisodeDetail extends Episode {
  characters: Character[];
}

export interface EpisodesResponse {
  episodes: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Episode[];
  };
}

export interface EpisodeResponse {
  episode: EpisodeDetail;
}

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
}

export interface CharacterDetail extends Character {
  origin: Location;
  location: Location;
  episode: Episode[];
}

export interface CharactersResponse {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Character[];
  };
}

export interface CharacterResponse {
  character: CharacterDetail;
}
