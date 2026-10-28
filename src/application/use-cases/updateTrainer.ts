import { updateTrainerDTO } from "@application/dtos/updateTrainerDTO";
import { AppError } from "@domain/errors/app.error";
import { ITrainerRepositoryContract } from "@domain/repositories/trainer.repository";
import { Trainer } from "@domain/entities/trainer";
import { ItrainerProps } from "@domain/entities/trainer";


export class updateTrainer{
    constructor(private trainerRepository : ITrainerRepositoryContract){}

    async execute(dto : updateTrainerDTO):Promise<Trainer>{
        const { currentEmail, name, email, city } = dto;
        const trainer = await this.trainerRepository.findByEmail(dto.currentEmail);
        if(!trainer){
            throw new AppError('Treinador nao encontrado',404)
        }

        if (email !== undefined && email !== trainer.email) {
            const emailOwner = await this.trainerRepository.findByEmail(email);
            if (emailOwner && emailOwner.id !== trainer.id) {
                throw new AppError('Já existe um treinador com este e-mail.',409);
            }
        }
        const changes: Partial<Omit<ItrainerProps, 'id' | 'createdAt'>> = {};
        if (name !== undefined) changes.name = name;
        if (email !== undefined) changes.email = email;
        if (city !== undefined) changes.city = city;

        trainer.updateProps(changes);
        const updated = await this.trainerRepository.update(trainer);
        if(!updated) throw new AppError('Treinador nao econtrado',404);
        return updated;
    }
}