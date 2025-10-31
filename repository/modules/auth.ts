// File: repository/modules/product.ts

import FetchFactory from '../factory'

interface IStore {
    body: {
        name: string
        username: string
        email: string
        password: string
        password_confirmation: string
    }
}

// Create the ProductModule class
class AuthModule extends FetchFactory<any> {
    register(payload: IStore) {
        const { body } = payload
        return super.call('api/register', {
            method: 'POST',
            body
        })
    }
}

export default AuthModule
