import { Response } from "express";
import jwt from "jsonwebtoken";
import app from "../app";
import prisma from "./prisma";

export const generateToken = (res: Response, user: IProfile) => {
  if (!process.env.ACCESS_TOKEN_SECRET)
    return res.status(500).json({ message: "Token is undefined!" });

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "8m",
  });

  return token;
};

export const generateRefreshToken = async (res: Response, id: string) => {
  if (!process.env.REFRESH_TOKEN_SECRET)
    return res.status(500).json({ message: "Token is undefined!" });
  const isDev = app.get("env") === "development";
  const token = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("refreshtoken", token, {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? false : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  await prisma.account.update({
    where: {
      id,
    },
    data: {
      token,
    },
  });
};
