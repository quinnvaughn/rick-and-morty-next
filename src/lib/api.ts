import { gql, request } from 'graphql-request'

const GRAPHQL_API = 'https://rickandmortyapi.com/graphql'

export type Setting = {
  id: number
  name: string
  type: string
  dimension: string
}

export type Character = {
  id: number
  name: string
  status: string
  species: string
  type: string
  image?: string
  gender?: string
  origin: Setting
  location: Setting
  episode: Episode[]
}

export type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
}

export async function getCharacters(page: number = 1) {
  const query = gql`
    query GetCharacters($page: Int!) {
      characters(page: $page) {
        results {
          id
          name
          status
          species
          type
          image
          gender
          origin {
            id
            name
            type
            dimension
          }
          location {
            id
            name
            type
            dimension
          }
          episode {
            id
            name
            air_date
            episode
          }
        }
      }
    }
  `
  const variables = { page }
  try {
    const data = (await request(GRAPHQL_API, query, variables)) as {
      characters: {
        results: Character[]
      }
    }
    return data.characters.results
  } catch (error) {
    throw new Error('Failed to fetch characters')
  }
}

export async function getCharacterById(id: number) {
  const query = gql`
    query GetCharacterById($id: ID!) {
      character(id: $id) {
        id
        name
        status
        species
        type
        image
        gender
        origin {
          id
          name
          type
          dimension
        }
        location {
          id
          name
          type
          dimension
        }
        episode {
          id
          name
          air_date
          episode
        }
      }
    }
  `
  const variables = { id }
  try {
    const data = (await request(GRAPHQL_API, query, variables)) as {
      character: Character
    }
    return data.character
  } catch (error) {
    throw new Error(`Failed to fetch character with id ${id}`)
  }
}
