import { Pokemon } from "../pokemon/pokemon";
import { IRequesterApi } from "../shared/requestApi.interface";

export class PokemonRepository {
  private urlDataPokemon: string;
  private urlImagePokemon: string;

  constructor(private requester: IRequesterApi) {
    this.urlDataPokemon = "https://pokeapi.co/api/v2/pokemon/";
    this.urlImagePokemon = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
  }

  getPokemonByApi(identifier: string): Pokemon {
    const pokemon: Pokemon = new Pokemon();
    pokemon.data = this.getDataPokemon(identifier);
    // pokemon.imgHighResolution = this.getImagePokemon(identifier);

    return pokemon;
  }

  private getDataPokemon(identifier: string) {
    const url = `${this.urlDataPokemon}${identifier}`;
    const dataPokemon = this.requester.requestJsonData(url);
    return dataPokemon;
  }

  private getImagePokemon(identifier: string) {
    if(identifier.length === 1){
      identifier = "00"+ identifier;
    }
    if(identifier.length === 2){
      identifier = "0"+ identifier;
    }

    const url = `${this.urlImagePokemon}${identifier}.png`;
    const imgPokemon = this.requester.requestImageData(url);
    return imgPokemon;
  }
}
