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
        productId: number | string
    }
}
interface IStore {
    body: {
        title: string
        price: number
        description: string
        image: string
        category: string
    }
}

// Create the ProductModule class
class ProductModule extends FetchFactory<any> {
    list(payload: IList) {
        // Use the base call() method from FetchFactory
        return super.call('/products', {
            method: 'GET',
            query: payload.query
        })
    }

    detail(payload: IDetail) {
        const { params } = payload
        return super.call(`/products/${params.productId}`, {
            method: 'GET'
        })
    }

    store(payload: IStore) {
        const { body } = payload
        return super.call('/products', {
            method: 'POST',
            body
        })
    }

    update(payload: IStore & IDetail) {
        const { body, params } = payload
        return super.call(`/products/${params.productId}`, {
            method: 'PATCH',
            body
        })
    }

    delete(payload: IDetail) {
        const { params } = payload
        return super.call(`/products/${params.productId}`, {
            method: 'DELETE'
        })
    }
}

export default ProductModule
