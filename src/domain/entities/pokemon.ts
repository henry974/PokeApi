//import { IPokemonRepositoryContract } from "../../types/repository";

export enum PokemonType{
    FIRE = 'fire',
    WATER = 'water',
    GRASS = 'grass',
    ELECTRIC = 'electric',
    PSYCHIC = 'psychic'
}
export enum  Rarity{
    COMMON = 'common',
    RARE = 'rare',
    LEGENDARY = 'legendary'
}

export interface IPokemonProps{
    id : string;
    name : string;
    type : PokemonType;
    hp:number;
    rarity : Rarity;
    nickname? : string;
}

export class Pokemon{
    private props: IPokemonProps;
    constructor(props: IPokemonProps){
        this.props = props;
    }
    
    get id() : string {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get type(){
        return this.props.type;
    }
    get hp(){
        return this.props.hp;
    }
    get rarity(){
        return this.props.rarity;
    }
    get nickname(){
        return this.props.nickname ?? this.props.name;
    }
    
}