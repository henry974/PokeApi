import { randomUUID } from 'crypto';
import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepositoryContract } from '@domain/repositories/trainer.repository';
import { createTrainerDTO } from '@application/dtos/createTrainerDTO';

export class CreateTrainerUseCase {
    constructor(private trainerRepository: ITrainerRepositoryContract) {}

    async execute(dto: createTrainerDTO): Promise<Trainer> {
        const existing = await this.trainerRepository.findByEmail(dto.email);
        if (existing) throw new Error('Já existe um treinador com este e-mail.');

        const trainer = new Trainer({ id: randomUUID(), ...dto });
        await this.trainerRepository.save(trainer);
        return trainer;
    }
}