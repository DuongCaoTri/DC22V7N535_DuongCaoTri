const express = require("express");
const cors = require("cors");
const app = express();
const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Wellcome to contact book application." });
});

const contactRouter = require("./app/routes/contact.route");
app.use("/api/contacts", contactRouter);


// ....
app.use("api/contacts", contactRouter);
// handle 404 response

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;