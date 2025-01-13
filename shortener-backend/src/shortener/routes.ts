import { Router } from 'express';
import ShortenerValidations from './validations.middleware';
import ShortenerController from './controller';

const urlShortenerRouter = Router();

urlShortenerRouter.get('/:slug',
    [ShortenerValidations.validateSlug]
    , ShortenerController.getUrlBySlug
);

urlShortenerRouter.post('/',
    [ShortenerValidations.validateUrl, ShortenerValidations.isURLAvailable],
    ShortenerController.shortenURL
);

export default urlShortenerRouter;