import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = process.env.REFRESH_TOKEN_SECRET;
  const { refreshtoken } = req.cookies as ICookie;

  if (!accessToken)
    return res.status(403).json({ message: "Token is undefined!" });
  if (!refreshtoken)
    return res
      .status(404)
      .json({ message: "Kamu belum login, silahkan login." });

  jwt.verify(refreshtoken, accessToken, (err, user) => {
    if (!user || err)
      return res
        .status(401)
        .json({ message: "Sesi kadaluarsa, silahkan login kembali" });

    void (async () => {
      try {
        const findUser = await prisma.account.findFirst({
          where: {
            id: (user as { id: string }).id,
          },
        });

        if (!findUser)
          return res.status(404).json({ message: "User not found!" });

        if (!findUser.isAdmin)
          return res.status(401).json({ message: "You are not an Admin!" });

        next();
      } catch (error) {
        return error;
      } finally {
        await prisma.$disconnect();
      }
    })();
  });
};
