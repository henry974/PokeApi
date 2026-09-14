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
        this.validate(props);
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

    public updateProps(data : Partial<Omit<IPokemonProps, 'id'>>):void{
        const updateProps = {...this.props,...data};
        this.validate(updateProps);
        
        if (data.name) this.props.name = data.name;
        if (data.type) this.props.type = data.type;
        if (data.hp !== undefined) this.props.hp = data.hp;
        if (data.rarity) this.props.rarity = data.rarity;
        if (data.nickname) this.props.nickname = data.nickname;
    }

    private validate(props: IPokemonProps): void {
        if (!props.id || props.id.trim().length === 0) {
            throw new Error('O ID do Pokémon é obrigatório.');
        }
        if (!props.name || props.name.trim().length === 0) {
            throw new Error('O nome do Pokémon não pode ser vazio.');
        }
        if (props.hp <= 0) {
            throw new Error('O HP deve ser maior que zero.');
        }
        if (!Object.values(PokemonType).includes(props.type)) {
            throw new Error('Tipo de Pokémon inválido.');
        }
        if (!Object.values(Rarity).includes(props.rarity)) {
            throw new Error('Raridade de Pokémon inválida.');
        }
        
    }

    public toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      hp: this.hp,
      rarity: this.rarity,
      nickname: this.nickname
    };
  }
    
}