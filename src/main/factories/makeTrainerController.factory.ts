import { CreateTrainerUseCase } from "@application/use-cases/createTrainer";
import { findTrainerByEmail } from "@application/use-cases/findTrainerByEmail";
import { listAllTrainers } from "@application/use-cases/listTrainers";
import { updateTrainer } from "@application/use-cases/updateTrainer";
import { pgTrainerRepository } from "@infrastructure/database/postgres/pgTrainer.repository";
import { TrainerController } from "@infrastructure/http/controllers/trainer.controller";


const TrainerRepository = new pgTrainerRepository;

export function makeTrainerController():TrainerController{
    const createTrainerUseCase = new CreateTrainerUseCase(TrainerRepository);
    const findTrainerByEmailUseCase = new findTrainerByEmail(TrainerRepository);
    const listTrainersUseCase =  new listAllTrainers(TrainerRepository);
    const updateTrainerUseCase = new updateTrainer(TrainerRepository);

    return new TrainerController(createTrainerUseCase,findTrainerByEmailUseCase,listTrainersUseCase,updateTrainerUseCase);
}