import { getAll } from './getAll'
import { getAllUsers } from '../../repositories/users';

jest.mock('../../repositories/users')

const REPOSITORY_RESPONSE = [{
  _id: 123,
  name: "test",
  email: "emailTest@test.test"
}]

const repositoryGetAllMock = jest.fn();

describe('getAll Service', () => {
  beforeAll(() => {
    (getAllUsers as jest.Mock).mockImplementation(repositoryGetAllMock)
  })

  beforeEach(() => {
    repositoryGetAllMock.mockReset();
  })

  test('repository requested with correct params when ordering ascending', async () => {
    await getAll(true)
    expect(repositoryGetAllMock).toHaveBeenCalledWith(true);
  })

  test('repository requested with correct params when ordering descending', async () => {
    await getAll(false)
    expect(repositoryGetAllMock).toHaveBeenCalledWith(false);
  })

  test('returns the appropriate list', async () => {
    repositoryGetAllMock.mockResolvedValueOnce(REPOSITORY_RESPONSE)
    const returnValue = await getAll(false)
    expect(returnValue).toBe(REPOSITORY_RESPONSE);
  })
})