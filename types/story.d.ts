export interface IStoryItem {
    id: number | string
    title: string
    content: string
    cover_image: string
    author: {
        name: string
        profile_image: string | null | undefined
    }
    category: {
        id: number
        name: string
    }
    created_at: string
}

export interface IStoryForm {
    title: string
    category_id: string
    content: string
}

export interface IStoryReturn {
    id: number | string
    image: string
    title: string
    shortContent: string
    authorAvatar: string
    authorName: string
    createdDate: string
    category: string
}
