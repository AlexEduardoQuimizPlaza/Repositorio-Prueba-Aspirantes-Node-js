


export class CreateCategoryDto{
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
    ){}

    static create(object: {[key: string]: any}): [string?,CreateCategoryDto?]{
        const { name, available } = object;
        let availableboolean = available;
        if ( !name ) return ['name is required'];
        if ( typeof available !== 'boolean' ) {
            availableboolean = (available === 'true') 
        }

        return [undefined, new CreateCategoryDto(name, availableboolean)];
    }
}