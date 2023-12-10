import { User } from '../../common/types';
import { ERRORS } from '../../common/errors';

import { createUser as createUserDb, getUserByEmail } from '../../repositories/users';

export const createUser = async ({ name, email }: Partial<User>) => {
    await checkEmailIsNotUsed(email);
    const createdAt = new Date();
    await createUserDb({ name, email, createdAt });
};

// NOTE: Probably we could move it upwards to reuse it but so far only used once yagni ;)
export const checkEmailIsNotUsed = async (email: string) => {
    const previousUser = await getUserByEmail(email);
    if (previousUser != null) {
        // NOTE: For a production app we would extend Error instead of using the error message (for multiple reasons) but for this project i think this is enough
        throw new Error(ERRORS.EMAIL_IN_USE);
    }
};
