// File: repository/modules/product.ts

import FetchFactory from '../factory'

// Define interfaces for each method's payload
interface IList {
    query?: {
        sort?: string
        limit?: number
    }
}

// Create the ProductModule class
class CategoryModule extends FetchFactory<any> {
    list(payload: IList) {
        // Use the base call() method from FetchFactory
        return super.call('/api/category', {
            method: 'GET',
            query: payload.query
        })
    }
}

export default CategoryModule
