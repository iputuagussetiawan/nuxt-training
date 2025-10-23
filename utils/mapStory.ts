import type { IStoryItem, IStoryReturn } from '~/types/story'

export function mapStories(apiResponse: IStoryItem[]): IStoryReturn[] {
    return apiResponse.map((item: any) => ({
        id: item.id,
        image: item.content_image, // or replace with picsum if you want random images
        title: item.title,
        shortContent: item.content.slice(0, 120) + '...', // cut preview
        authorAvatar:
            item.author.profile_image ??
            'https://picsum.photos/50/50?random=' + item.id,
        authorName: item.author.name,
        createdDate: item.created_at, // → "2025-09-01"
        category: item.category?.name.toLowerCase()
    }))
}
