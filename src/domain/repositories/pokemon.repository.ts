import { Pokemon } from "@domain/entities/pokemon";


export interface IPokemonRepositoryContract{
    save(pokemon: Pokemon): Promise<void>;
    findAll(): Promise<Pokemon[]>;
    findById(id: string): Promise<Pokemon | null>;
}