// File: plugins/api.ts

import CategoryModule from '../repository/modules/category'
import StoryModule from '../repository/modules/story'
import AuthModule from '../repository/modules/auth'
import { defineNuxtPlugin } from 'nuxt/app'

// Define an interface for type-safety
interface IApiInstance {
    category: CategoryModule
    story: StoryModule
    auth: AuthModule
    // other modules
}

export default defineNuxtPlugin(() => {
    // Register all modules
    const modules: IApiInstance = {
        category: new CategoryModule(),
        story: new StoryModule(),
        auth: new AuthModule()
    }

    // Provide the modules as a global injection
    return {
        provide: {
            api: modules
        }
    }
})
