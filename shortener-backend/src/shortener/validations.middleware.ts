import { NextFunction, Request, RequestHandler, Response } from 'express';
import logger from '../utils/logger';
import { slugValidations, urlValidations } from './validations';

const validateUrl: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const url = req.body?.url;
    const errors = urlValidations(url);
    if (errors.length > 0) {
        res
            .status(400)
            .json({
                message: 'Validation Error',
                errors
            });
        return;
    }

    next();
}


const validateSlug: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params?.slug;
    const errors = slugValidations(slug);
    if (errors.length > 0) {
        res
            .status(400)
            .json({
                message: 'Validation Error',
                errors
            });
        return;
    }

    next();
}

//TODO: implement this function
const isURLAvailable: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    next();

    return;
    try {
        const { url } = req.body;
        const response = await fetch(url);
        if (!response.ok) {
            res.status(400).json({ message: 'URL is currently unavaliable' });
            return;
        }
        next();
    } catch (error) {
        logger.logError('error', error as Error, { url: req.body.url });
        res.status(500).json({ message: 'URL is currently unavaliable', errors: [error] });
        return;
    }
}

export default {
    validateSlug,
    validateUrl,
    isURLAvailable
}