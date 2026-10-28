import { CreateTrainerUseCase } from "@application/use-cases/createTrainer";
import { findTrainerByEmail } from "@application/use-cases/findTrainerByEmail";
import { listAllTrainers } from "@application/use-cases/listTrainers";
import { updateTrainer } from "@application/use-cases/updateTrainer";
import { Request,Response } from "express";


export class TrainerController{
    constructor(
        private createTrainerCase : CreateTrainerUseCase,
        private findByEmailCase : findTrainerByEmail,
        private listAllCase : listAllTrainers,
        private updateTrainerCase : updateTrainer

    ){}

    async create(req:Request,res:Response) : Promise<Response>{
        const {name,email,city} = req.body;
        const trainer = await this.createTrainerCase.execute({name,email,city});
        return res.status(201).json({
            message: 'Treinador criado com sucesso',
            data: trainer.toJson()
        })
    }
    async list(req:Request,res:Response) : Promise<Response>{
        const trainers = await this.listAllCase.execute();
        return res.status(200).json({data: trainers.map((t) => t.toJson())});
    }

    async findByEmail(req:Request,res:Response) : Promise<Response>{
        const {email} = req.params;
        const trainer = await this.findByEmailCase.execute(String(email));
        return trainer ? 
            res.status(200).json({data: trainer.toJson()}) :
            res.status(404).json({message:'Treinador nao encontrado'}) ;
    }
    async update(req:Request,res:Response) : Promise<Response>{
        const {email : currentEmail} = req.params;
        const {name,email,city} = req.body;
        const trainerAtualizado = await this.updateTrainerCase.execute({currentEmail:String(currentEmail),name: name,email: email,city:city});
        return trainerAtualizado ? 
        res.status(200).json({message: 'treinador atualizado', data: trainerAtualizado.toJson()}):
        res.status(400).json({Message: 'treinador nao atualizado'});
    }
}