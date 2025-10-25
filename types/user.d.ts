export interface IUser {
    id: number
    name: string
    username: string
    email: string
    email_verified_at?: string | null
    profile_image: string | null
    about: string | null
    created_at?: string
    updated_at?: string
}
