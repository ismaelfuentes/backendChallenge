import { checkEmailIsNotUsed } from './create';
import { getUserByEmail } from '../../repositories/users';
import { ERRORS } from '../../common/errors';

jest.mock('../../repositories/users');

const getUserByEmailMock = jest.fn();

describe('Services user create', () => {
    describe('checkEmailIsNotUsed function', () => {
        beforeAll(() => {
            (getUserByEmail as jest.Mock).mockImplementation(getUserByEmailMock);
        });

        test('Exception triggered when there is another user with same email', async () => {
            getUserByEmailMock.mockResolvedValueOnce({});
            expect(async () => {
              await checkEmailIsNotUsed('anyEmail');
            }).rejects.toThrow(ERRORS.EMAIL_IN_USE)
        });

        test('No Exception triggered when there is not another user with same email', async () => {
          getUserByEmailMock.mockResolvedValueOnce(null);
          expect(async () => {
            await checkEmailIsNotUsed('anyEmail');
          }).not.toThrowError()
        });

        test('repository requested with correct email address', async () => {
          getUserByEmailMock.mockResolvedValueOnce(null);
          await checkEmailIsNotUsed('anyEmail');
          expect(getUserByEmailMock).toHaveBeenCalledWith('anyEmail')
        });
    });

    describe('createUser service function', () => {
        // NOTE: I guess it doesn't make more sense to invest more time creating unit tests for this code challenge
        // as it's more similar code
    });
});
