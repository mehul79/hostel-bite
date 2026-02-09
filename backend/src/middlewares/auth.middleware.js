import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

export const authRequired = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authorization header missing');
    }
    const token = header.split(' ')[1];
    const payload = verifyToken(token);
    const user = await User.findById(payload.sub).select('-passwordHash').lean();
    if (!user) throw new ApiError(401, 'User not found');
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
