import { Response } from "express";
import jwt from "jsonwebtoken";
import app from "../app";
import prisma from "./prisma";

export const generateToken = (res: Response, user: IToken) => {
  if (!process.env.ACCESS_TOKEN_SECRET)
    return res.status(500).json({ message: "Token is undefined!" });
  const isDev = app.get("env") === "development";

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: isDev ? "2m" : "2d",
  });

  return token;
};

export const generateRefreshToken = async (res: Response, user: IToken) => {
  if (!process.env.REFRESH_TOKEN_SECRET)
    return res.status(500).json({ message: "Token is undefined!" });
  const isDev = app.get("env") === "development";
  const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("refreshtoken", token, {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? false : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  const updateToken = await prisma.account.update({
    where: {
      id: user.id,
    },
    data: {
      token,
    },
  });

  console.log(token);

  console.log(updateToken);
};
