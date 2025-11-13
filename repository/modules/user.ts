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
        return super.call('/api/me', {
            method: 'GET'
        })
    }

    updateProfile(payload: UpdateProfileRequest) {
        const { body } = payload
        return super.call('/api/me', {
            method: 'PUT',
            body
        })
    }

    uploadUserProfileImage(payload: UpdateProfileImageRequest) {
        const { body } = payload
        return super.call('/api/me/profile-image', {
            method: 'POST',
            body
        })
    }
}

export default UserModule
