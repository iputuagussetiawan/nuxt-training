// File: repository/modules/product.ts

import FetchFactory from '../factory'

// Define interfaces for each method's payload
interface IList {
    query?: {
        sort?: string
        limit?: number
    }
}
interface IDetail {
    params: {
        storyId: number | string
    }
}
interface IStore {
    body: {
        title: string
        content: number
        content_images: string
        category_id: string
        user_id: string
        updated_at: string
        created_at: string
    }
}

// Create the ProductModule class
class StoryModule extends FetchFactory<any> {
    list(payload: IList) {
        // Use the base call() method from FetchFactory
        return super.call('api/stories', {
            method: 'GET',
            query: payload.query
        })
    }

    detail(payload: IDetail) {
        const { params } = payload
        return super.call(`/api/stories/${params.storyId}`, {
            method: 'GET'
        })
    }
}

export default StoryModule
