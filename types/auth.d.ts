export interface IRegister {
    name: string
    username: string
    email: string
    password: string
    password_confirmation: string
}

export interface ILogin {
    email: string
    password: string
}
