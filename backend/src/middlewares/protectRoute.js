import { requireAuth } from '@clerk/express';
import User from '../models/UserModel.js';

export const protectRoute = [
    requireAuth(),
    async(req,res,next) => {
        try {
            const clerkId = req.auth().userId;

            if (!clerkId) {
                return res.status(401).json({message: "Unauthorized - invalid token"});
            }
                //find user in db by clerkId
                const user = await User.findOne({clerkId})

                if (!user) {
                    return res.status(404).json({message: "User not found"});
                }
                
                // attach user to req
                req.user = user;

                next();
            
        } catch (error) {
            console.log("Error in protected middleware", error);
            res.status(500).json({message: "Internal server error"});
        }
    }
]


//IMP Note ------> when we pass array of middleware to express it automatically flattens them and executes them sequentially, one by one right.
// so we can use them in a single route
