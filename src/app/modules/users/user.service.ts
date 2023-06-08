import config from "../../../config";
import ApiError from "../../../error/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateUserId } from "./user.utils";

const createUser = async (user: IUser): Promise<IUser | null> => {
    const id = await generateUserId();
    user.id = id;

    if (!user.password) {
        user.password = config.default_user_pass as string;
    }

    const createdUser = await User.create(user); // Await the User.create() call

    if (!createdUser) {
        throw new ApiError(400, "Failed to create a user!");
    }

    return createdUser;
};

export const UserSevice = { createUser };