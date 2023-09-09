import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../utils/prisma";
import jwt from "jsonwebtoken";

export const midWareRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    realname,
    username,
    email,
    tempatLahir,
    tanggalLahir,
    gender,
    password,
  }: User = req.body;

  if (
    !realname ||
    !username ||
    !email ||
    !tempatLahir ||
    !tanggalLahir ||
    !gender ||
    !password
  )
    return res
      .status(403)
      .json({ message: "Isi data dirimu dengan lengkap untuk melanjutkan!" });

  if (realname.length < 6)
    return res
      .status(403)
      .json({ message: "Nama Lengkap tidak boleh kurang dari 6 karakter." });

  if (realname.length > 70)
    return res
      .status(403)
      .json({ message: "Nama Lengkap tidak boleh lebih dari 50 karakter." });

  if (username.length < 4)
    return res
      .status(403)
      .json({ message: "Username tidak boleh kurang dari 6 karakter." });

  if (username.length > 20)
    return res
      .status(403)
      .json({ message: "Username tidak boleh lebih dari 20 karakter." });

  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(403).json({ message: "Email: " + result.array()[0].msg });

  if (password.length < 8) {
    return res
      .status(403)
      .json({ message: "Password tidak boleh kurang dari 8 karakter." });
  }

  if (
    gender.toLowerCase() !== "laki-laki" &&
    gender.toLowerCase() !== "perempuan"
  )
    return res
      .status(403)
      .json({ message: "Tidak ada gender selain Laki-laki / Perempuan." });

  if (!(new Date(tanggalLahir) instanceof Date))
    return res.status(403).json({ message: "Tanggal ini bukan format Date!" });

  const isUsernameExist = await prisma.account.findFirst({
    where: {
      username,
    },
  });

  if (isUsernameExist)
    return res.status(403).json({ message: "Username sudah digunakan!" });

  const isEmailExist = await prisma.account.findFirst({
    where: {
      email,
    },
  });

  if (isEmailExist)
    return res.status(403).json({ message: "Email sudah digunakan!" });

  next();
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = process.env.REFRESH_TOKEN_SECRET;
  const { refreshtoken } = req.cookies;

  if (!accessToken)
    return res.status(403).json({ message: "Token is undefined!" });
  if (!refreshtoken)
    return res
      .status(404)
      .json({ message: "Kamu belum login, silahkan login." });

  const verifyToken = jwt.verify(refreshtoken as string, accessToken);

  if (!verifyToken)
    return res
      .status(401)
      .json({ message: "Sesi kadaluarsa, silahkan login kembali" });

  next();
};
