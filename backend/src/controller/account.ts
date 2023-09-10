import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken } from "../utils/generateToken";
import jwt from "jsonwebtoken";

const accessTokenEnv = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenEnv = process.env.REFRESH_TOKEN_SECRET;

export const register = (req: Request, res: Response) => {
  void (async () => {
    try {
      const {
        realname,
        username,
        email,
        tempatLahir,
        tanggalLahir,
        gender,
        password,
      } = req.body as User;

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
        return res.status(505).json({ message: "Internal server error." });

      return res.status(200).json({ message: "Berhasil membuat akun!" });
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const postLogin = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { username, password } = req.body as ILogin;
      if (!username || !password)
        return res.status(403).json({ message: "Isi data dengan lengkap!" });

      let user: User | null;

      if (username.includes("@")) {
        user = await prisma.account.findFirstOrThrow({
          where: {
            email: username,
          },
        });
      } else {
        user = await prisma.account.findFirstOrThrow({
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

      const data: IProfile = {
        id: user.id,
        username: user.username,
        realname: user.realname,
        tempatLahir: user.tempatLahir,
        tanggalLahir: user.tanggalLahir,
        gender: user.gender,
        mbti: user.mbti,
        img: user.img,
      };

      await generateRefreshToken(res, data.id);
      const token = generateToken(res, data);

      res
        .status(200)
        .json({ token, message: `Selamat datang, ${user.realname}!` });
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const getAccount = (req: Request, res: Response) => {
  void (async () => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;

      if (!accessTokenEnv)
        return res.status(403).json({ message: "Token is undefined!" });
      if (!token)
        return res
          .status(404)
          .json({ message: "Kamu belum login, silahkan login." });

      const user = jwt.verify(token, accessTokenEnv);

      if (!user)
        throw res.status(500).json({ message: "Internal server error." });

      const data = await prisma.account.findFirstOrThrow({
        where: {
          id: (user as IProfile).id,
        },
      });

      if (!data)
        return res
          .status(500)
          .json({ message: "Account not found! Internal server error." });

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
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const refreshUserToken = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { refreshtoken } = req.cookies as ICookie;
      const findUser = await prisma.account.findFirstOrThrow({
        where: {
          token: refreshtoken,
        },
      });

      if (!findUser) return res.status(403).json({ message: "Token Invalid!" });

      const data: IProfile = {
        id: findUser.id,
        username: findUser.username,
        realname: findUser.realname,
        tempatLahir: findUser.tempatLahir,
        tanggalLahir: findUser.tanggalLahir,
        gender: findUser.gender,
        mbti: findUser.mbti,
        img: findUser.img,
      };

      const token = generateToken(res, data);

      return res.json({ token, message: "Token berhasil di refresh!" });
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const logout = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { refreshtoken } = req.cookies as ICookie;

      if (!refreshTokenEnv)
        return res.status(500).json({ message: "Token is undefined!" });

      const user = jwt.verify(refreshtoken, refreshTokenEnv);

      if (!user)
        return res.status(500).json({ message: "Internal server error." });

      const dataUser = await prisma.account.update({
        where: {
          id: (user as { id: string }).id,
        },
        data: {
          token: null,
        },
      });

      res.clearCookie("refreshtoken");

      if (!dataUser)
        return res.status(500).json({ message: "Internal server error." });

      return res.json({ token: null, message: "Berhasil logout!" });
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const changePassword = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { oldPassword, newPassword } = req.body as {
        oldPassword: string;
        newPassword: string;
      };
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;

      if (!accessTokenEnv || !token || !refreshTokenEnv)
        throw res.status(404).json({ message: "Token undefined!" });
      if (!oldPassword || !newPassword)
        throw res
          .status(404)
          .json({ message: "Data tidak diisi dengan benar" });

      const user = jwt.verify(token, accessTokenEnv);

      if (!user)
        throw res.status(500).json({ message: "Internal server error." });

      const findUser = await prisma.account.findFirstOrThrow({
        where: {
          id: (user as IProfile).id,
        },
      });

      const isPasswordSame = await bcrypt.compare(
        oldPassword,
        findUser.password
      );
      if (!isPasswordSame)
        throw res.status(401).json({ message: "Password lama tidak sesuai." });

      if (oldPassword === newPassword)
        throw res.status(401).json({
          message: "Password lama tidak boleh sama dengan password baru.",
        });

      const password = await bcrypt.hash(newPassword, 10);

      const changePassword = await prisma.account.update({
        where: {
          id: findUser.id,
        },
        data: {
          password,
        },
      });

      if (!changePassword)
        throw res.status(500).json({ message: "Internal server error." });

      const sendData: IProfile = {
        id: changePassword.id,
        username: changePassword.username,
        realname: changePassword.realname,
        tempatLahir: changePassword.tempatLahir,
        tanggalLahir: changePassword.tanggalLahir,
        gender: changePassword.gender,
        mbti: changePassword.mbti,
        img: changePassword.img,
      };

      await generateRefreshToken(res, sendData.id);
      const newAccToken = generateToken(res, sendData);

      return res.json({
        token: newAccToken,
        message: "Password berhasil diubah!",
      });
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  })();
};
