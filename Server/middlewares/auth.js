import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if(!token || !token.startsWith('Bearer '))
    {
        return res.status(401).json({
            success : false, 
            message : "Not Authorized - No Token Provided"
        });
    }

    try{
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id || decoded.userId;

        if(!userId)
        {
            return res.status(401).json({
                success : false, 
                message : "Not Authorized - Invalid token structure"
            });
        }
        
        const user = await User.findById(userId).select('-password');

        // IMPORTANT : Check if user exists
        if(!user)
        {
            return res.status(401).json({
                success : false, 
                message : "Not Authorized - User not found..!"
            });
        }

        req.user = user;
        next();
    }catch(error)
    {
        console.error("JWT Verification Error: ", error.message);
        return res.status(401).json({
            success : false, 
            message : "Not Authorized..!"
        })
    }
}