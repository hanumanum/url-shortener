//TODO: emplement also randomSlugVersion
import { decodeBase62, encodeBase62 } from "../utils/crypto";

interface ISlugAlgorithm {
    idToSlug: (uniqueId: number) => string;
    slugToId: (slug: string) => number;
}

export const base62SlugAlgorithm: ISlugAlgorithm = {
    idToSlug: (uniqueId: number) => encodeBase62(uniqueId),
    slugToId: (slug: string) => decodeBase62(slug)
}

export const getShortenerService = (slugAlgorithm: ISlugAlgorithm) => {
    return {
        slugToId: slugAlgorithm.slugToId,
        idToSlug: slugAlgorithm.idToSlug
    }
}