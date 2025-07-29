import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken";

const AuthToken = asyncHandler(async (req, _, next) => {
    try {
        const Token = req.cookies?.Token;
        console.log(Token);

        if (!Token) {
            throw new ApiError(401, "UNAUTHORIZED ACCESS");
        }

        const DecodedToken = JWT.verify(Token, process.env.JWT_SECRET_TOKEN);

        const user = await User.findById(DecodedToken?._id).select("-password");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid Access Token");
    }
});

export default AuthToken;