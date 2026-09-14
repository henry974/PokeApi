import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepositoryContract } from '@domain/repositories/pokemon.repository';

export class InMemoryPokemonRepository implements IPokemonRepositoryContract {
  public items: Pokemon[] = [];

  async save(pokemon: Pokemon): Promise<void> {
    this.items.push(pokemon);
  }
  
  async findAll(type?:string): Promise<Pokemon[]> {
    if(type){
      return this.items.filter((p)=> p.type.toLowerCase() === type.toLowerCase());
    }
    return this.items;
  }

  async findById(id: string): Promise<Pokemon | null> {
    const pokemon = this.items.find((p) => String(p.id) === String(id));
    if (!pokemon) return null;
    return pokemon;
  }
  async update(pokemon: Pokemon): Promise<Pokemon | null> {
    const index = this.items.findIndex((p) => String(p.id) === String(pokemon.id));
    if(index === -1){
      return null;
    }
    this.items[index] = pokemon;
    return pokemon;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.items.findIndex((p) => String(p.id) === String(id));

    if (index === -1) {
      return false; // Pokémon não encontrado no repositório
    }

    this.items.splice(index, 1);
    return true; // Removido com sucesso
  }
  async findByType(type: string): Promise<Pokemon[]> {
    const filteredPokemons = this.items.filter(
            (p) => p.type.toLowerCase() === String(type).toLowerCase()
        );
    return filteredPokemons;
  }
}