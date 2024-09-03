import app from "./app.js";

const port = process.env.APP_PORT;

app.listen(process.env.APP_PORT, () => {
    console.log(`Servidor logado! http://localhost:${port}`);
});