const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Route mặc định cho "/"
app.get("/", (req, res) => {
    res.send("🚀 API server is running!");
});

// API endpoint backend
app.get("/api/headlines", async (req, res) => {
    try {
        const { country = "us", category = "", keyHeadling = "", pageSize = "12", page = "1" } = req.query;
        const keyApi = "c974ef460e2e46378e496ade0c22d3ae"; // 🔑 thay bằng key thật của bạn

        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                country,
                category: category,
                q: keyHeadling,
                pageSize: pageSize,
                page: page,
                apiKey: keyApi
            },
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Lỗi gọi API:", error.message);
        res.status(500).json({ error: "Lỗi khi gọi API" });
    }
});

app.get("/api/everything", async (req, res) => {
    try {
        const { keywork = "news", searchIn = "title,description,content", from = "", to = "", language = "en", sortBy = "publishedAt", pageSize = "12", page = "1" } = req.query;
        const keyApi = "c974ef460e2e46378e496ade0c22d3ae"; // 🔑 thay bằng key thật của bạn

        const response = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                q: keywork,
                searchIn,
                from: from,
                to: to,
                language,
                sortBy,
                pageSize: pageSize,
                page: page,
                apiKey: keyApi
            },
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Lỗi gọi API:", error.message);
        res.status(500).json({ error: "Lỗi khi gọi API" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`);
});
