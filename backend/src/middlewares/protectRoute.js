// import { requireAuth } from '@clerk/express';
// import User from '../models/UserModel.js';

// export const protectRoute = [
//     requireAuth(),
//     async(req,res,next) => {
//         try {
//             const clerkId = req.auth().userId;

//             if (!clerkId) {
//                 return res.status(401).json({message: "Unauthorized - invalid token"});
//             }
//                 //find user in db by clerkId
//                 const user = await User.findOne({clerkId})

//                 if (!user) {
//                     return res.status(404).json({message: "User not found"});
//                 }
                
//                 // attach user to req
//                 req.user = user;

//                 next();
            
//         } catch (error) {
//             console.log("Error in protected middleware", error);
//             res.status(500).json({message: "Internal server error"});
//         }
//     }
// ]


//IMP Note ------> when we pass array of middleware to express it automatically flattens them and executes them sequentially, one by one right.
// so we can use them in a single route




import { requireAuth } from '@clerk/express';
import User from '../models/UserModel.js';

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            // Safely access userId
            const clerkId = req.auth().userId;

            if (!clerkId) {
                console.log("No clerk ID found in request");
                return res.status(401).json({ message: "Unauthorized - no authentication token" });
            }

            // Find user in db by clerkId
            const user = await User.findOne({ clerkId });

            if (!user) {
                console.log(`User not found for clerkId: ${clerkId}`);
                return res.status(404).json({ message: "User not found" });
            }

            // Attach user to req
            req.user = user;

            next();

        } catch (error) {
            console.error("Error in protectRoute middleware:", error);
            res.status(500).json({ 
                message: "Internal server error",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined 
            });
        }
    }
];