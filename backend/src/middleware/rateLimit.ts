/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";
export const registerLimit = rateLimit({
  windowMs: 1000 * 60 * 60 * 12,
  limit: 1,
  message: "Kamu bisa membuat akun lagi setelah 12 jam.",
});

export const loginLimit = rateLimit({
  windowMs: 1000 * 60 * 60 * 12,
  limit: 5,
  message: (req: Request, res: Response) =>
    res.json({
      message:
        "Kamu memasukkan banyak password yang salah. Tunggu setelah 12 jam.",
    }),
});
