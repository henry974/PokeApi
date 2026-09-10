import { Pokemon } from "@domain/entities/pokemon";


export interface IPokemonRepositoryContract{
    save(pokemon: Pokemon): Promise<void>;
    findAll(type?:string): Promise<Pokemon[]>;
    findById(id: string): Promise<Pokemon | null>;
    update(pokemon:Pokemon): Promise<Pokemon|null>;
    delete(id:string): Promise<boolean>;
}