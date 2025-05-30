import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { xss } from "express-xss-sanitizer"; 
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import router from "./src/routes/api.js";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xss()); 
app.use(hpp());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});
app.use(limiter);

app.set('etag', false);


app.use('/api/v1', router)

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

export default app;