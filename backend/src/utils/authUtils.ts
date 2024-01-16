import jwt from 'jsonwebtoken';

const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "1d"
    });
};


export { generateToken };
