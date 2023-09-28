import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getAllCounselors = (req: Request, res: Response) => {
  void (async () => {
    try {
      const allCounselors = await prisma.account.findMany({
        where: {
          isCounselor: true,
        },
        select: {
          id: true,
          username: true,
          realname: true,
          img: true,
          isCounselor: true,
          gender: true,
          mbti: true,
          role: true,
        },
      });

      if (!allCounselors)
        throw res.status(404).json({ message: "Counselors not found!" });

      return res.json(allCounselors);
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const getOneCounselor = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { id } = req.query as { id?: string };

      if (!id) throw res.status(404).json({ message: "ID tidak dimasukkan!" });

      const oneCounselor = await prisma.account.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          username: true,
          realname: true,
          img: true,
          isCounselor: true,
          gender: true,
          mbti: true,
          role: true,
          description: true,
        },
      });

      if (!oneCounselor)
        throw res.status(404).json({ message: "Konselor tidak ditemukan!" });

      return res.json(oneCounselor);
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};
