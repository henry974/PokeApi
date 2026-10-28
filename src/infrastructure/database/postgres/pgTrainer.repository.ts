import { ITrainerRepositoryContract } from "@domain/repositories/trainer.repository";
import { Trainer } from "@domain/entities/trainer";
import { postgresPool } from "./connection";

const COLUMNS = `id, name, email, city, created_at`;

export class pgTrainerRepository implements ITrainerRepositoryContract{
    private toEntity(row: any): Trainer {
        return new Trainer({
            id: row.id,
            name: row.name,
            email: row.email,
            city: row.city,
            createdAt: row.created_at
        });
    }

    async save(trainer: Trainer): Promise<void> {
        await postgresPool.query(
            `INSERT INTO trainers (id, name, email, city) VALUES ($1,$2,$3,$4)`,
            [trainer.id, trainer.name, trainer.email, trainer.city],
        );
    }
    async findByEmail(email: string): Promise<Trainer | null> {
        const query = `
        SELECT ${COLUMNS}
        FROM trainers
        WHERE email = $1
        `;
        const result = await postgresPool.query(query,[email]);
        return (result.rows.length === 0)? null : this.toEntity(result.rows[0]);
    }

    async update(trainer: Trainer): Promise<Trainer | null> {
         const result = await postgresPool.query(
        `UPDATE trainers
         SET name = $2, email = $3, city = $4
         WHERE id = $1
         RETURNING id, name, email, city, created_at`,
        [trainer.id, trainer.name, trainer.email, trainer.city],
    );
    if (result.rows.length === 0) return null;
    return this.toEntity(result.rows[0]);
    }

    async findAll(): Promise<Trainer[]> {
        const result = await postgresPool.query(`SELECT ${COLUMNS} FROM trainers`);
        
        return result.rows.map(
            (row) => this.toEntity(row)
        );
    }
}