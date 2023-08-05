import express from "express";
const app = express();
// const port = 8080;
app.get("/", (req, res) => {
    console.log("From Express");
    res.status(200);
    res.json({ message: "Hello" });
});
// app.listen(8080, () => {
//   console.log("Server running on 8080");
// });
export default app;
//# sourceMappingURL=server.js.map