import { type User } from '@firebase/auth-types'
export const useUser = () => {
    return useState('authUser', () => <User>{})
}