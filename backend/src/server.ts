import app from "./app";

const PORT: number = 3000;

app.listen(PORT, () => {
  try {
    console.log("Server run on http://localhost:" + PORT);
  } catch (error) {
    console.error(error);
  }
});
