import prisma from "./prisma";
import { Response } from "express";

const featLike = async (res: Response, userId: string, postId: string) => {
  const isUserHaveLiked = await prisma.likedPost.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (isUserHaveLiked) {
    await prisma.likedPost.delete({
      where: {
        userId_postId: isUserHaveLiked,
      },
    });
    return res.json({ message: "Berhasil menghapus suka" });
  } else {
    await prisma.likedPost.create({
      data: {
        userId,
        postId,
      },
    });
    res.json({ message: "Berhasil memberi suka" });
  }
};

export default featLike;
