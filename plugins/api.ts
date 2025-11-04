// File: plugins/api.ts

import CategoryModule from '../repository/modules/category'
import StoryModule from '../repository/modules/story'
import AuthModule from '../repository/modules/auth'
import UserModule from '../repository/modules/user'
import { defineNuxtPlugin } from 'nuxt/app'
import UserStoryModule from '../repository/modules/user-story'

// Define an interface for type-safety
interface IApiInstance {
    category: CategoryModule
    story: StoryModule
    auth: AuthModule
    user: UserModule
    userStory: UserStoryModule
    // other modules
}

export default defineNuxtPlugin(() => {
    // Register all modules
    const modules: IApiInstance = {
        category: new CategoryModule(),
        story: new StoryModule(),
        auth: new AuthModule(),
        user: new UserModule(),
        userStory: new UserStoryModule()
    }

    // Provide the modules as a global injection
    return {
        provide: {
            api: modules
        }
    }
})
