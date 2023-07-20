export type Item = {
    id: string;
    name: string;
    images: Image[];
    size: string;
}

export type Image = {
    id: string;
    url: string;
}

export type formattedOutfit = {
    id: string;
    name: string;
    season: string;
    likes: number;
    createdAt: string;
    updatedAt?: string;
    items?: number;
}