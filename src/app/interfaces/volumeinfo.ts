import { IndustryIdentifier } from "./industry-identifier";

export interface VolumeInfo {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    imageLinks: {
      smallThumbnail?: string;
      thumbnail?: string;
      bestAvailableImage?: string;
    };
    industryIdentifiers?: IndustryIdentifier[];
    isbn13?: string;
}