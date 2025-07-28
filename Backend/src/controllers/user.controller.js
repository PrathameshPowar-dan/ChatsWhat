import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError"
import { asyncHandler } from "../utils/asyncHandler"

export const RegisterUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const requiredFields = { email, username, password };

    for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
        if (typeof fieldValue !== 'string' || !fieldValue.trim()) {
            throw new ApiError(400, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
        }
    }

    if (password.length()<7) {
        res.send(new ApiRes)
    }
    const ExistingUser = await User.findOne({
        $or: [{ username }, { email }]
    })


})