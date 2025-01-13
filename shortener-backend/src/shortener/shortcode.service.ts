//TODO: emplement also randomSlugVersion
import { decodeBase62, encodeBase62, generateSlugByFromUUID } from "../utils/crypto";

interface ISlugAlgorithm {
    idToSlug: (uniqueId: number) => string;
    slugToId: (slug: string) => number;
}

export const base62SlugAlgorithm: ISlugAlgorithm = {
    idToSlug: (uniqueId: number) => encodeBase62(uniqueId),
    slugToId: (slug: string) => decodeBase62(slug)
}

export const getDeterministicShortenerService = (slugAlgorithm: ISlugAlgorithm) => {
    return {
        slugToId: slugAlgorithm.slugToId,
        idToSlug: slugAlgorithm.idToSlug
    }
}

export const getUniqueShortCode = () => {
    const length = 6; //TODO: move to env variable
    return generateSlugByFromUUID(length);
} 