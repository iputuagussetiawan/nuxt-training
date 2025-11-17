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
        category_id: string
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

    store(payload: IStore) {
        const { body } = payload
        return super.call('/api/stories', {
            method: 'POST',
            body
        })
    }

    update(payload: IStore & IDetail) {
        const { body, params } = payload
        return super.call(`/api/stories/${params.storyId}`, {
            method: 'PATCH',
            body
        })
    }

    delete(payload: IDetail) {
        const { params } = payload
        return super.call(`/api/stories/${params.storyId}`, {
            method: 'DELETE'
        })
    }
}

export default StoryModule
