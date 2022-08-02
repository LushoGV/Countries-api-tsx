export interface CardProps{
    name: string
    population: number
    region: string
    capital: []
    flag: string
}

export interface Country{
    name: {common: string, official: string}
    population: number
    region: string
    subregion: string
    capital: []
    flags: {png:string, svg:string}
    cca3: string
    tld: string[]
    languages: string[]
    borders: string[]
    currencies: [][]

}

export interface CountryListProps{
    data: Country
}



