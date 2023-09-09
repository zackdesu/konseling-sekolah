import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken } from "../utils/generateToken";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      realname,
      username,
      email,
      tempatLahir,
      tanggalLahir,
      gender,
      password,
    }: User = req.body;

    const convertedPassword = await bcrypt.hash(password, 10);

    const createAccount = await prisma.account.create({
      data: {
        realname,
        username,
        email,
        tempatLahir,
        tanggalLahir,
        gender,
        password: convertedPassword,
      },
    });

    if (!createAccount)
      return res.status(505).json({ message: "Internal Server Error" });

    return res.status(200).json({ message: "Berhasil membuat akun!" });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(403).json({ message: "Isi data dengan lengkap!" });

    let user: User | null;

    if (username.includes("@")) {
      user = await prisma.account.findFirst({
        where: {
          email: username,
        },
      });
    } else {
      user = await prisma.account.findFirst({
        where: {
          username,
        },
      });
    }

    if (!user)
      return res.status(404).json({ message: "Akun tidak ditemukan!" });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res
        .status(403)
        .json({ message: "Password yang anda masukkan salah." });

    const data: IToken = {
      id: user.id,
      username: user.username,
      email: user.email,
      gender: user.gender,
      img: user.img,
    };

    generateRefreshToken(res, data);
    const token = generateToken(res, data);

    res
      .status(200)
      .json({ token, message: `Selamat datang, ${user.realname}!` });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getLogin = async (req: Request, res: Response) => {
  try {
    const accessToken = process.env.ACCESS_TOKEN_SECRET;
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!accessToken)
      return res.status(403).json({ message: "Token is undefined!" });
    if (!token)
      return res
        .status(404)
        .json({ message: "Kamu belum login, silahkan login." });

    jwt.verify(token, accessToken, async (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Sesi kadaluarsa, silahkan login kembali." });

      if (!user)
        return res.status(500).json({ message: "Internal server error." });

      const data = await prisma.account.findFirst({
        where: {
          id: (user as jwt.JwtPayload).id,
        },
      });

      if (!data)
        return res
          .status(500)
          .json({ message: "Account not found! Internal Server Error!" });

      const sendData: IProfile = {
        id: data.id,
        username: data.username,
        realname: data.realname,
        tempatLahir: data.tempatLahir,
        tanggalLahir: data.tanggalLahir,
        gender: data.gender,
        mbti: data.mbti,
        img: data.img,
      };

      res.status(200).json(sendData);
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const refreshUserToken = async (req: Request, res: Response) => {
  try {
    const { refreshtoken } = req.cookies;
    const findUser = await prisma.account.findFirst({
      where: {
        token: refreshtoken,
      },
    });

    console.log(findUser);

    if (!findUser) return res.status(403).json({ message: "Token Invalid!" });

    const token = generateToken(res, findUser);

    return res.json({ token, message: "Token berhasil di refresh!" });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshtoken } = req.cookies;

    if (!process.env.REFRESH_TOKEN_SECRET)
      return res.status(500).json({ message: "Token is undefined!" });

    jwt.verify(
      refreshtoken as string,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err)
          return res
            .status(403)
            .json({ message: "Sesi kadaluarsa, silahkan login kembali!" });
        if (!user)
          return res.status(500).json({ message: "Internal server error." });

        const dataUser = await prisma.account.update({
          where: {
            id: (user as jwt.JwtPayload).id,
          },
          data: {
            token: null,
          },
        });

        res.clearCookie("refreshtoken");

        if (!dataUser)
          return res.status(500).json({ message: "Internal server error." });

        return res.json({ token: null, message: "Berhasil logout!" });
      }
    );
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
