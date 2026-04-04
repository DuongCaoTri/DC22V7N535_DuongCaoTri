const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");

module.exports = function (req, res, next) {
    // Lấy token từ header
    const token = req.headers.authorization?.split(" ")[1];

    // Kiểm tra token tồn tại
    if (!token) {
        return next(new ApiError(401, "No token, authorization denied"));
    }

    try {
        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "your_secret_key"
        );
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ApiError(401, "Token is not valid"));
    }
};
