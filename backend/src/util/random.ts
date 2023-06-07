import { ulid } from 'ulid'

export const createRandomIdString = () => {
  return ulid()
}
