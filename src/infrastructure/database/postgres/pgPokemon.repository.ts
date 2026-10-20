import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";
import { Pokemon } from "@domain/entities/pokemon";
import { postgresPool } from "../postgres/connection";

export class pgPokemonRepository implements IPokemonRepositoryContract{
    async save(pokemon: Pokemon): Promise<void> {
        const query = `
        INSERT INTO pokemon values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        `;
        await postgresPool.query(query,[pokemon.id,pokemon.name,pokemon.type1,pokemon.type2,pokemon.hp,pokemon.attack,pokemon.defense,pokemon.special_attack,pokemon.special_defense,pokemon.speed,pokemon.nickname])
    }
      
    async findById(id:string): Promise<Pokemon | null> {
        const query = `SELECT id,name,type1,type2,hp,attack,defense,special_attack,special_defense,speed,nickname FROM pokemon WHERE id = $1`
        const result = await postgresPool.query(query,[id]);
        if(result.rows.length === 0){
            return null;
        }
        const row = result.rows[0];
        return new Pokemon({id:row.id,name:row.name, type1: row.type1, type2: row.type2,hp:row.hp,attack:row.attack,defense:row.defense,special_attack:row.special_attack,special_defense:row.special_defense,speed:row.speed,nickname:row.nickname});
    }
    
    async findAll(): Promise<Pokemon[]> {
        const query = `SELECT id,name,type1,type2,hp,attack,defense,special_attack,special_defense,speed,nickname FROM pokemon`
        const result = await postgresPool.query(query);
        return result.rows.map(
            (row) => new Pokemon({id:row.id,name:row.name, type1: row.type1, type2: row.type2,hp:row.hp,attack:row.attack,defense:row.defense,special_attack:row.special_attack,special_defense:row.special_defense,speed:row.speed,nickname:row.nickname})
        );
    }
    
    async update(pokemon: Pokemon): Promise<Pokemon | null> {
    const query = `
        UPDATE pokemon
        SET name = $2,
            type1 = $3,
            type2 = $4,
            hp = $5,
            attack = $6,
            defense = $7,
            special_attack = $8,
            special_defense = $9,
            speed = $10,
            nickname = $11
        WHERE id = $1
        RETURNING id, name, type1, type2, hp, attack, defense, special_attack, special_defense, speed, nickname
    `;

    const result = await postgresPool.query(query, [
        pokemon.id,
        pokemon.name,
        pokemon.type1,
        pokemon.type2,
        pokemon.hp,
        pokemon.attack,
        pokemon.defense,
        pokemon.special_attack,
        pokemon.special_defense,
        pokemon.speed,
        pokemon.nickname,
    ]);

    if (result.rows.length === 0) {
        return null; // nenhum pokémon com esse id
    }

    const row = result.rows[0];
    return new Pokemon({
        id: row.id,
        name: row.name,
        type1: row.type1,
        type2: row.type2,
        hp: row.hp,
        attack: row.attack,
        defense: row.defense,
        special_attack: row.special_attack,
        special_defense: row.special_defense,
        speed: row.speed,
        nickname: row.nickname,
    });
}

      async delete(id: string): Promise<boolean> {
        const query = `DELETE FROM pokemon WHERE id=$1`
        await postgresPool.query(query,[id]);
        return true; // Removido com sucesso
      }
      async findByType(type: string): Promise<Pokemon[]> {
        const query = `SELECT id,name,type1,type2,hp,attack,defense,special_attack,special_defense,speed,nickname FROM pokemon WHERE type1 = $1 OR type2 = $1`;
        const result = await postgresPool.query(query,[type]);
        
        return result.rows.map(
            (row) => new Pokemon({id:row.id,name:row.name, type1: row.type1, type2: row.type2,hp:row.hp,attack:row.attack,defense:row.defense,special_attack:row.special_attack,special_defense:row.special_defense,speed:row.speed,nickname:row.nickname})
        );
    }
}