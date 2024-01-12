import { type User } from '@firebase/auth-types'
// export const useUser = () => {
//     return useState('authUser', () => {})
// }

// import { User } from "types";

export const useUser = () => {
    return useState<User | null>("authUser", () => null);
};