// File: plugins/api.ts

import CategoryModule from '@/repository/modules/category'
import StoryModule from '@/repository/modules/story'

// Define an interface for type-safety
interface IApiInstance {
    category: CategoryModule
    story: StoryModule
    // other modules
}

export default defineNuxtPlugin(() => {
    // Register all modules
    const modules: IApiInstance = {
        category: new CategoryModule(),
        story: new StoryModule()
        // other modules
    }

    // Provide the modules as a global injection
    return {
        provide: {
            api: modules
        }
    }
})
