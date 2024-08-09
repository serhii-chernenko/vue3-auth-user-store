import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

interface User {
    id: number
    username: string
    name: string
    avatar: string
}

interface UserToCheck extends User {
    password: string
}

interface Payload {
    username: string
    password: string
}

export const useAuthUser = () => {
    const router = useRouter()

    return defineStore('user', {
        state: (): { user: User | null } => ({
            user: null,
        }),
        getters: {
            isLoggedIn: (state) => !!state.user,
        },
        actions: {
            async login(payload: Payload): Promise<void> {
                if (this.isLoggedIn) return

                const { username, password } = payload
                const res = await fetch('/api/users.json')
                const users = await res.json()

                this.user = users.find(
                    (record: UserToCheck) =>
                        record.username === username &&
                        record.password === password,
                )

                if (!this.user) {
                    throw new Error('Invalid username or password')
                }

                await router.push('/')
            },
            async logout(): Promise<void> {
                if (!this.isLoggedIn) return

                this.user = null

                await router.push('/login')
            },
        },
    })
}
