import { Trainer } from "@domain/entities/trainer";
import { ITrainerRepositoryContract } from "@domain/repositories/trainer.repository";


export class listAllTrainers{
    constructor(private trainerRepository: ITrainerRepositoryContract){}
    async execute(): Promise<Trainer[]>{
        return await this.trainerRepository.findAll();
    }

}