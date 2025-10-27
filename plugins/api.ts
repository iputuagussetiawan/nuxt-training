// File: plugins/api.ts

import CategoryModule from '@/repository/modules/category'

// Define an interface for type-safety
interface IApiInstance {
    category: CategoryModule
    // other modules
}

export default defineNuxtPlugin(() => {
    // Register all modules
    const modules: IApiInstance = {
        category: new CategoryModule()
        // other modules
    }

    // Provide the modules as a global injection
    return {
        provide: {
            api: modules
        }
    }
})
