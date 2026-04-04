const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");

// Hàm tạo JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "your_secret_key", {
        expiresIn: "7d",
    });
};

// @desc    Đăng ký người dùng mới
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!username || !email || !password) {
            return next(
                new ApiError(400, "Please provide username, email and password")
            );
        }

        // Kiểm tra xem user đã tồn tại hay chưa
        let user = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (user) {
            return next(new ApiError(400, "User already exists"));
        }

        // Tạo user mới
        user = await User.create({
            username,
            email,
            password,
        });

        // Tạo token
        const token = generateToken(user._id);

        // Trả về response
        return res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        return next(error);
    }
};

// @desc    Đăng nhập người dùng
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!email || !password) {
            return next(
                new ApiError(400, "Please provide email and password")
            );
        }

        // Kiểm tra user tồn tại
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ApiError(401, "Invalid credentials"));
        }

        // So sánh password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ApiError(401, "Invalid credentials"));
        }

        // Tạo token
        const token = generateToken(user._id);

        // Trả về response
        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        return next(error);
    }
};

// @desc    Lấy thông tin user hiện tại
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(error);
    }
};
