// INFO: Following is a crafted validation mechanism 
// should be replaced with a proper validation library (Joi, Yup, etc...) for real world applications

const aphanumericRegex = /[^a-zA-Z0-9]/;
export const slugValidations = (slug: any): string[] => {
    return [
        [slug === undefined, 'Slug is required'],
        [typeof slug !== 'string', 'Slug must be a string'],
        [slug.length < 1, 'Slug must be at least 1 characters long'],
        [aphanumericRegex.test(slug), 'Slug must be alphanumeric']
    ]
        .filter(([condition]) => condition)
        .map(([, message]) => message as string);
}


// INFO: there are other ways to validate an URL
// 1. By URL() constructor
// 2. By using external libraries like valid-url, url-regex
// Deceison must be made based on bachmarks, since speed a is critical paramter 
const urlRegex = /^(https?:\/\/)?([\w\-]+\.){1,}[a-z]{2,}(:\d{1,5})?(\/.*)?$/i;
export const urlValidations = (url: any) => {
    return [
        [url === undefined, 'URL is required'],
        [typeof url !== 'string', 'URL must be a string'],
        [!urlRegex.test(url), 'URL must be a valid URL']
    ]
        .filter(([condition]) => condition)
        .map(([, message]) => message as string);
}