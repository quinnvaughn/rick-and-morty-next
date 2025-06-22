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
  characters?: Character[]
}

export async function getCharacters(page: number = 1, name?: string) {
  const query = gql`
    query GetCharacters($page: Int!, $name: String) {
      characters(page: $page, filter: { name: $name }) {
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
  const variables = { page, name }
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

export async function getPopularCharacters() {
  // The API does not have a "first" filter, so we fetch the first page
  // and return the first 5 characters as popular ones.
  // The first five are the family, and then it goes alphabetically.
  const characters = await getCharacters(1)
  return characters.slice(0, 5)
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

export async function getEpisodeById(id: number) {
  const query = gql`
    query GetEpisodeById($id: ID!) {
      episode(id: $id) {
        id
        name
        air_date
        episode
        characters {
          id
          name
          status
          species
          type
          image
        }
      }
    }
  `
  const variables = { id }
  try {
    const data = (await request(GRAPHQL_API, query, variables)) as {
      episode: Episode
    }
    return data.episode
  } catch (error) {
    throw new Error(`Failed to fetch episode with id ${id}`)
  }
}
