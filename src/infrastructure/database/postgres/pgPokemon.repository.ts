import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";
import { Pokemon } from "@domain/entities/pokemon";
import { postgresPool } from "../postgres/connection";

const COLUMNS = `id, name, type1, type2, level, hp, attack, defense, special_attack, special_defense, speed, nickname`;

export class pgPokemonRepository implements IPokemonRepositoryContract{
    private toEntity(row: any): Pokemon {
        return new Pokemon({
            id: row.id,
            name: row.name,
            type1: row.type1,
            type2: row.type2 ?? undefined,
            level: row.level,
            hp: row.hp,
            attack: row.attack,
            defense: row.defense,
            special_attack: row.special_attack,
            special_defense: row.special_defense,
            speed: row.speed,
            nickname: row.nickname ?? undefined,
        });
    }
    async save(pokemon: Pokemon): Promise<void> {
        const query = `
        INSERT INTO pokemon (${COLUMNS}) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        `;
        await postgresPool.query(query,[pokemon.id,pokemon.name,pokemon.type1,pokemon.type2,pokemon.level,pokemon.hp,pokemon.attack,pokemon.defense,pokemon.special_attack,pokemon.special_defense,pokemon.speed,pokemon.nickname])
    }
      
    async findById(id:string): Promise<Pokemon | null> {
        const query = `SELECT ${COLUMNS} FROM pokemon WHERE id = $1`
        const result = await postgresPool.query(query,[id]);
        if(result.rows.length === 0){
            return null;
        }
        return this.toEntity(result.rows[0]);
        
    }
    
    async findAll(): Promise<Pokemon[]> {
        const query = `SELECT ${COLUMNS} FROM pokemon`
        const result = await postgresPool.query(query);
        return result.rows.map(
            (row) => this.toEntity(row)
        );
    }
    
    async update(pokemon: Pokemon): Promise<Pokemon | null> {
    const query = `
        UPDATE pokemon
        SET name = $2,
            type1 = $3,
            type2 = $4,
            level = $5,
            hp = $6,
            attack = $7,
            defense = $8,
            special_attack = $9,
            special_defense = $10,
            speed = $11,
            nickname = $12
        WHERE id = $1
        RETURNING ${COLUMNS}
    `;

    const result = await postgresPool.query(query, [
        pokemon.id,
        pokemon.name,
        pokemon.type1,
        pokemon.type2,
        pokemon.level,
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
    return this.toEntity(row);
    }

    async delete(id: string): Promise<boolean> {
        const query = `DELETE FROM pokemon WHERE id=$1`
        const result = await postgresPool.query(query,[id]);
        return (result.rowCount ?? 0) > 0;
    }
    async findByType(type: string): Promise<Pokemon[]> {
        const query = `SELECT ${COLUMNS} FROM pokemon WHERE type1 = $1 OR type2 = $1`;
        const result = await postgresPool.query(query,[type]);
        
        return result.rows.map(
            (row) => this.toEntity(row)
        );
    }
}