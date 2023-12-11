import { Bookdb } from "./bookdb";

export interface UserFavoritesResponse {
    id: number;
    username: string;
    email: string;
    favoriteBooks: Bookdb[];
}