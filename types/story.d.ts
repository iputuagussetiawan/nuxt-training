export interface IStoryItem {
    id: number | string
    title: string
    content: string
    content_image: string
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
    category: string
    content: string
    coverImage: string
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
