import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRoute from "./src/routes/user.route.js";
import movieRoute from "./src/routes/movie.route.js";
import adminRoute from "./src/routes/admin.route.js";
import bookingRoute from "./src/routes/booking.route.js";
import favoriteRoute from "./src/routes/favorite.route.js";
import rateRoute from "./src/routes/rate.route.js";
import path from 'path';
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/movie", movieRoute);
app.use("/admin", adminRoute);
app.use("/booking", bookingRoute);
app.use("/favorite", favoriteRoute);
app.use("/rate", rateRoute);

const port = 8282;
if(process.env.NODE_ENV == "production"){
  app.use(express.static(path.join("client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
mongoose.connect(`mongodb+srv://lynk64te:${process.env.MONGODB_PASSWORD}@cluster0.zlxkken.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
).then(() => {
  console.log("Mongodb connected");
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.log({ err });
});
