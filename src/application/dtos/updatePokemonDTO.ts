import { Rarity,PokemonType } from "@domain/entities/pokemon";
export interface UpdatePokemonDTO{
    id : string;
    name?: string;
    type?: PokemonType;
    hp?:number;
    rarity?: Rarity;
    nickname?: string;
}