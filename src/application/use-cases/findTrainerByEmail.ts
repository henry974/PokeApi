import { Trainer } from "@domain/entities/trainer";
import { ITrainerRepositoryContract } from "@domain/repositories/trainer.repository";

export class findTrainerByEmail{
    constructor (private trainerRepository: ITrainerRepositoryContract){}
    async execute(email : string): Promise <Trainer|null>{
        const trainer = this.trainerRepository.findByEmail(email);
        return (trainer === null) ? null:trainer;
    }

}