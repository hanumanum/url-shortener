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

// Temporary route to update usage stats, should be moved to different route dedicated for statistics
urlShortenerRouter.put('/stats/:slug',
    [ShortenerValidations.validateSlug],
    ShortenerController.saveStats
);


export default urlShortenerRouter;