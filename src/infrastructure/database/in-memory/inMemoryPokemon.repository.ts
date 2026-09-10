import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepositoryContract } from '@domain/repositories/pokemon.repository';

export class InMemoryPokemonRepository implements IPokemonRepositoryContract {
  public items: Pokemon[] = [];

  async save(pokemon: Pokemon): Promise<void> {
    this.items.push(pokemon);
  }
  
  async findAll(): Promise<Pokemon[]> {
    return this.items;
  }

  async findById(id: string): Promise<Pokemon | null> {
    const pokemon = this.items.find((p) => p.id === id);
    if (!pokemon) return null;
    return pokemon;
  }

}