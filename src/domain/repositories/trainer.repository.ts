import { Trainer } from "@domain/entities/trainer";

export interface ITrainerRepositoryContract{
    save(trainer: Trainer): Promise<void>;
    update(trainer:Trainer): Promise<Trainer | null>;
    findByEmail(email: string): Promise<Trainer|null>;
    findAll(): Promise<Trainer[]>;
} 