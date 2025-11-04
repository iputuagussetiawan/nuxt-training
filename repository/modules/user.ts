// File: repository/modules/product.ts

import FetchFactory from '../factory'
import type {
    IUser,
    IUserUpdateProfileImage,
    IUserUpdateProfile
} from '../../types/user'

interface UpdateProfileImageRequest {
    body: IUserUpdateProfileImage
}

interface UpdateProfileRequest {
    body: IUserUpdateProfile
}

// Create the ProductModule class
class UserModule extends FetchFactory<any> {
    getProfile() {
        return super.call('/api/user/profile', {
            method: 'GET'
        })
    }

    updateProfile(payload: UpdateProfileRequest) {
        const { body } = payload
        return super.call('/api/user/profile', {
            method: 'PUT',
            body
        })
    }

    uploadUserProfileImage(payload: UpdateProfileImageRequest) {
        const { body } = payload
        return super.call('/api/user/profile', {
            method: 'POST',
            body
        })
    }
}

export default UserModule
