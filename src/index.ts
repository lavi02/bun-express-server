import express, { Request, Response } from "express";
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/test', protectedRoutes);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () =>
  console.log(`Express 🥟 Server Listening on port ${port}`)
);
