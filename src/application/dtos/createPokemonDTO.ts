import { Rarity,PokemonType } from "@domain/entities/pokemon";
export interface CreatePokemonDTO{
    id : string;
    name : string;
    type : PokemonType;
    hp:number;
    rarity : Rarity;
    nickname? : string;
}