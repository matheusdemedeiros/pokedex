import axios from "axios";
import { PokemonRepository } from "./infrastructure/pokemonRepository";
import { RequesterApiAxios } from "./infrastructure/requestApiAxios";
import { IHTMLPage } from "./shared/htmlPage.interface";
import { IRequesterApi } from "./shared/requestApi.interface";

class Index implements IHTMLPage {
  private urlDataPokemon: string;
  private urlImagePokemon: string;
  private carousel: HTMLDivElement;
  private pokemonData: HTMLDivElement;
  private requester: IRequesterApi;
  private pokemonIds: number[] = [];
  private buttonSearch:HTMLButtonElement;
  private txtSearch:HTMLInputElement;
  private divPokemon: HTMLDivElement;

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
    this.buttonSearch = document.getElementById("btnSearch") as HTMLButtonElement;
    this.txtSearch = document.getElementById("search") as HTMLInputElement;
    this.buttonSearch.addEventListener("click", () => {this.searchPokemon(this.txtSearch.value.toLowerCase())});
    this.divPokemon = document.getElementById("pokemon") as HTMLDivElement;
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

  setCarouselData() {
    for (let index = 0; index < this.pokemonIds.length; index++) {
      let carouselItem = document.createElement("div") as HTMLDivElement;
      if (index === 0) {
        carouselItem.className = "carousel-item active ";
      } else {
        carouselItem.classList.add("carousel-item");
      }
      let imgPokemon = document.createElement("img") as HTMLImageElement;
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

  backgroundColorByType(tipo: string): string {
    let cor: string = "";
    switch (tipo) {
  
      case 'normal':
        cor = '#A8A77A'
        break;
  
      case 'fire':
        cor = '#EE8130'
        break;
  
      case 'water':
        cor = '#6390F0';
        break;
      case 'electric':
        cor = '#F7D02C';
        break;
  
      case 'grass':
        cor = '#7AC74C';
        break;
  
      case 'ice':
        cor = '#96D9D6';
        break;
      case 'fighting':
        cor = '#C22E28';
        break;
  
      case 'poison':
        cor = '#A33EA1';
        break;
  
      case 'ground':
        cor = '#E2BF65';
        break;
  
      case 'flying':
        cor = '#A98FF3';
        break;
  
      case 'psychic':
        cor = '#F95587';
        break;
  
      case 'bug':
        cor = '#A6B91A'
        break;
  
      case 'rock':
        cor = '#B6A136'
        break;
  
      case 'ghost':
        cor = '#735797';
        break;
  
      case 'dragon':
        cor = '#6F35FC';
        break;
  
      case 'dark':
        cor = '#705746';
        break;
  
      case 'steel':
        cor = '#B7B7CE';
        break;
  
      case 'fairy':
        cor = '#D685AD';
        break;
  
    }
  
    return cor;
  }




  async searchPokemon(id:string) {
    try {
      const reponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, { responseType: "json" });
      
      const pokemon = reponse.data;
      const nome = pokemon.name;
      let idPokemon:string = pokemon.id.toString();
      const tipo:string = pokemon.types[0].type.name;

      if (idPokemon.length === 1) {
        idPokemon = "00" + idPokemon;
      } else if (idPokemon.length === 2) {
        idPokemon = "0" + idPokemon;
      }
      const url = this.urlImagePokemon + idPokemon + ".png";
      const color = this.backgroundColorByType(tipo);
      this.divPokemon.innerHTML = "";

      const div = document.createElement("div");
      div.innerHTML = `<div class="card d-flex text-center" style="width: 18rem; background-color:${color}">
      <img src= "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idPokemon}.png" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title text-capitalize">${nome}</h5>
        <p class="card-text">${idPokemon} </p>
        <p class="card-text text-capitalize">${tipo} </p>
      </div>
    </div>`;
      this.divPokemon.appendChild(div);
    } catch (error) {
      return "Error: " + error;
    }
  }
}

new Index(new RequesterApiAxios());
