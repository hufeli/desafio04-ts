import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization
    if (authToken) {
        const [, token] = authToken.split(' ')

        try {
            const { sub } = verify(token, '123456789')
            console.log('User authenticated', sub)
            return next()
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    }
    return res.status(401).json({ message: 'Unauthorized' })
}