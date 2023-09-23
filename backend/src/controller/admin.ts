import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getAllUsers = (req: Request, res: Response) => {
  void (async () => {
    try {
      const user = await prisma.account.findMany({
        select: {
          id: true,
          username: true,
          realname: true,
          img: true,
          isAdmin: true,
          isCounselor: true,
        },
      });

      if (!user) throw res.status(404).json({ message: "User not found" });

      return res.json(user);
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const beCounselor = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { id } = req.body as { id?: string };

      if (!id) throw res.status(404).json({ message: "ID not found!" });

      const findUser = await prisma.account.findFirst({
        where: {
          id,
        },
      });

      if (!findUser) throw res.status(404).json({ message: "User not found!" });

      if (!findUser.isCounselor) {
        const toCounselor = await prisma.account.update({
          where: {
            id,
          },
          data: {
            isCounselor: true,
          },
        });

        if (!toCounselor)
          throw res.status(500).json({ message: "Internal server error!" });
        return res.json({
          message: "Berhasil menjadikan user sebagai konselor!",
        });
      } else {
        const toCounselor = await prisma.account.update({
          where: {
            id,
          },
          data: {
            isCounselor: false,
          },
        });

        if (!toCounselor)
          throw res.status(500).json({ message: "Internal server error!" });
        return res.json({
          message: "Berhasil menjadikan user sebagai member!",
        });
      }
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const beAdmin = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { id } = req.body as { id?: string };

      if (!id) throw res.status(404).json({ message: "ID not found!" });

      const findUser = await prisma.account.findFirst({
        where: {
          id,
        },
      });

      if (!findUser) throw res.status(404).json({ message: "User not found!" });

      if (!findUser.isAdmin) {
        const toAdmin = await prisma.account.update({
          where: {
            id,
          },
          data: {
            isAdmin: true,
          },
        });

        if (!toAdmin)
          throw res.status(500).json({ message: "Internal server error!" });
        return res.json({
          message: "Berhasil menjadikan user sebagai admin!",
        });
      } else {
        const toAdmin = await prisma.account.update({
          where: {
            id,
          },
          data: {
            isAdmin: false,
          },
        });

        if (!toAdmin)
          throw res.status(500).json({ message: "Internal server error!" });
        return res.json({
          message: "Berhasil menjadikan user sebagai member!",
        });
      }
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};
