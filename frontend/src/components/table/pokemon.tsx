import pokekemonDataA1 from '../../../../cards/A1.json'

export type Pokemon = {
    id: string
    name: string
    rarity: string
    card_type: string
    }

    export async function getPokemon(): Promise<Pokemon[]> {
        //Only returns the id, name, rarity and type of the pokemon
        return pokekemonDataA1.map((Pokemon) => ({
            id: Pokemon.id,
            name: Pokemon.name,
            rarity: Pokemon.rarity,
            card_type: Pokemon.card_type,
        }))
    }