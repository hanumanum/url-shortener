export const isUniqueConstranViolationError = (error: any): boolean => {
    if (!error) return false;
    return typeof error.code === 'string' && error.code === '23505';
}