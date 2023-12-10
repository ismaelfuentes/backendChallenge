import { User } from '../common/types';
import { databaseConnection } from '../lib/database';

export const createUser = async (user: Partial<User>): Promise<void> => {
    await databaseConnection.collection<Partial<User>>('USERS').insertOne(user);
};

export const getUserByEmail = async (email: string): Promise<User> => {
    return databaseConnection.collection<User>('USERS').findOne({ email });
};

export const getAllUsers = async (sortCreatedAscending: boolean = true): Promise<User[]> => {
    const userList = await databaseConnection
        .collection<User>('USERS')
        .find({})
        .sort({ createdAt: sortCreatedAscending ? 1 : -1 })
        .toArray(); // As it's a coding test, no pagination neither limit added
    return userList;
};
