import { AppError } from "@domain/errors/app.error";

export interface ItrainerProps{
    id: string;
    name: string;
    email: string;
    city: string;
    createdAt?:Date;
}

export class Trainer{
    private props: ItrainerProps;
    constructor(props:ItrainerProps){
        this.validate(props);
        this.props = props;
    }

    get id(): string{return this.props.id;}
    get name(): string{return this.props.name;}
    get email(): string{return this.props.email;}
    get city(): string{return this.props.city;}

    private validate(props: ItrainerProps) : void{
        const name = props.name?.trim();
        const email = props.email?.trim();
        const city = props.city?.trim();

        if(!name || name.length === 0 || name.length > 149){
            throw new AppError('nome inválido',400);
        }
        if(!email || email.length === 0 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            throw new AppError('Email invalido',400);
        }
        if(!city || city.length === 0 || city.length > 99){
            throw new AppError('Cidade inválida',400);
        }
    }
    public updateProps(data : Partial<Omit<ItrainerProps, 'id'>>):void{
        const updateProps = {...this.props,...data};
        this.validate(updateProps);
        this.props = updateProps;

    }
    public toJson(){
        return{
            id:this.id,
            name: this.name,
            email: this.email,
            city: this.city,
            createdAt: this.props.createdAt
        }
    }
}