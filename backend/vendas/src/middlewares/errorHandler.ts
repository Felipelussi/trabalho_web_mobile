import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', error);

    // Multer errors
    if (error instanceof Error && error.message === 'Only image files are allowed') {
        return res.status(400).json({
            message: 'Only image files are allowed',
            error: 'INVALID_FILE_TYPE'
        });
    }

    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            message: 'File size too large. Maximum size is 5MB',
            error: 'FILE_TOO_LARGE'
        });
    }

    // Database errors
    if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({
            message: 'Duplicate entry',
            error: 'DUPLICATE_ENTRY'
        });
    }

    if (error.code === '23503') { // Foreign key constraint violation
        return res.status(400).json({
            message: 'Referenced record does not exist',
            error: 'INVALID_REFERENCE'
        });
    }

    // Default error
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_ERROR'
    });
};