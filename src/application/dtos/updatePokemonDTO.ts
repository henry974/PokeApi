import {PokemonType } from "@domain/entities/pokemon";
export interface UpdatePokemonDTO{
    id : string;
    name? : string;
    type1? : PokemonType;
    type2?: PokemonType;
    level: number;
    hp?: number;
    attack?: number;
    defense?: number;
    special_attack?: number;
    special_defense?: number;
    speed? : number;
    nickname? : string;
}