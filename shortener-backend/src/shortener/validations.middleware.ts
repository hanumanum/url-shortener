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

//TODO: fix this middleware
// If works as expected, it should check if the URL is available
// but in some cases (facebook) it returns 400 even if the URL is available
const isURLAvailable: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    next();
    return;
    try {
        const { url } = req.body;
        
        const customHeaders = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://www.google.com/'
        };
        
        const response = await fetch(url, { 
            method: 'HEAD',
            headers: customHeaders,
        });

        if (!response.ok) {
            console.log(response);
            res.status(400).json({ message: 'URL is currently unavaliable' });
            return;
        }
        next();
    } catch (error) {
        logger.logError('error', error as Error, { url: req.body.url });
        res.status(400).json({ message: 'URL is currently unavaliable', errors: [error] });
        return;
    }
}

export default {
    validateSlug,
    validateUrl,
    isURLAvailable
}