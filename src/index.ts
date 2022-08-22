import axios from "axios";
import { PokemonRepository } from "./infrastructure/pokemonRepository";
import { RequesterApiAxios } from "./infrastructure/requestApiAxios";
import { IHTMLPage } from "./shared/htmlPage.interface";
import { IRequesterApi } from "./shared/requestApi.interface";

// async function obterImagem() {
//     try {
//       const resposta = await axios.get("https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png",{responseType: "blob"});

//       const urlImagem = URL.createObjectURL(resposta.data);

//       const img = document.createElement("img");
//       img.src = urlImagem;
//       // container.appendChild(img);
//     } catch (error) {
//       console.log(error);
//     }
// }

// https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png

class Index implements IHTMLPage {
  private urlDataPokemon: string;
  private urlImagePokemon: string;
  private carousel: HTMLDivElement;
  private pokemonData: HTMLDivElement;
  private requester: IRequesterApi;
  private pokemonIds: number[] = [];

  constructor(requester: IRequesterApi) {
    this.requester = requester;
    this.urlDataPokemon = "https://pokeapi.co/api/v2/pokemon/";
    this.urlImagePokemon =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
    this.configureElements();
    this.randomIdPokemon(3, 905);
    this.setCarouselData();
  }

  configureElements(): void {
    this.carousel = document.getElementById("carousel") as HTMLDivElement;
    this.pokemonData = document.getElementById("pokemonData") as HTMLDivElement;
  }

  randomIdPokemon(count: number, limit: number) {
    if (count > 0) {
      if (this.pokemonIds.length > 0) {
        this.pokemonIds = [];
      }
      for (let i = 0; i < count; i++) {
        let id = Math.floor(Math.random() * limit);
        this.pokemonIds.push(id);
      }
    }
  }

  setCarouselData(){

    for (let index = 0; index < this.pokemonIds.length; index++) {
      let carouselItem = document.createElement("div") as HTMLDivElement;
      if(index === 0){
      carouselItem.className = "carousel-item active ";
    }
    else{
        carouselItem.classList.add("carousel-item");
        
      }
      let imgPokemon = document.createElement("img") as HTMLImageElement;
      imgPokemon.className = "d-block";
      imgPokemon.width = 215;
      imgPokemon.height = 215;
      imgPokemon.src = this.createImageURL(String(this.pokemonIds[index]));
      carouselItem.appendChild(imgPokemon);
      this.carousel.appendChild(carouselItem);
    }
    
  }



  createImageURL(identifier: string): string {
    if (identifier.length === 1) {
      identifier = "00" + identifier;
    } else if (identifier.length === 2) {
      identifier = "0" + identifier;
    }
    const url = this.urlImagePokemon + identifier + ".png";
    return url;
  }
}

new Index(new RequesterApiAxios());
