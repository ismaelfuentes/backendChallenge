import { User } from '../../common/types';

import { getAllUsers } from '../../repositories/users';

export const getAll = async (sortCreatedAscending: boolean = true): Promise<User[]> => {
    return getAllUsers(sortCreatedAscending);
};
