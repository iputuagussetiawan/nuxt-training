// File: repository/modules/product.ts

import FetchFactory from '../factory'

import type { ILogin } from '../../types/auth'
import type { IRegister } from '../../types/auth'

interface RegisterRequest {
    body: IRegister
}

interface LoginRequest {
    body: ILogin
}

// Create the ProductModule class
class AuthModule extends FetchFactory<any> {
    register(payload: RegisterRequest) {
        const { body } = payload
        return super.call('api/register', {
            method: 'POST',
            body
        })
    }

    login(payload: LoginRequest) {
        const { body } = payload
        return super.call('api/login', {
            method: 'POST',
            body
        })
    }
}

export default AuthModule
