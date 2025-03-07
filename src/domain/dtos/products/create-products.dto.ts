import { Validators } from "../../../config";



export class CreateProductDto{
    private constructor(
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly name: string,
        public readonly id: string,
        public readonly category: string,
    ){}

    static create (object: {[key: string]:any}): [string?, CreateProductDto?] { 
        const{
            available,
            price,
            description,
            user,
            name,
            id,
            category,
        } = object;

        if(!name) return ['name is required'];
        if(!user) return ['user is required'];
        if(!Validators.isMongoID(user)) return ['category is required'];
        
        if(!category) return ['category is required'];
        if(!Validators.isMongoID(category)) return ['category is required'];

        return[
            undefined,
            new CreateProductDto(
                !!available,
                price,
                description,
                user,
                name,
                id,
                category,
            )
        ]

    }

}
