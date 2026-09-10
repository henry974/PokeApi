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
  async update(pokemon: Pokemon): Promise<Pokemon | null> {
    const index = this.items.findIndex((p) => p.id === pokemon.id);
    if(index === -1){
      return null;
    }
    this.items[index] = pokemon;
    return pokemon;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.items.findIndex((p) => p.id === id);

    if (index === -1) {
      return false; // Pokémon não encontrado no repositório
    }

    this.items.splice(index, 1);
    return true; // Removido com sucesso
  }
}