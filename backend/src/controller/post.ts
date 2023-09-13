import { Request, Response } from "express";
import prisma from "../utils/prisma";
import jwt from "jsonwebtoken";
import featLike from "../utils/featLike";

const accessTokenEnv = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenEnv = process.env.REFRESH_TOKEN_SECRET;

export const createPost = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { postVal } = req.body as IPost;
      let { privateVal, anonymVal } = req.body as IPost;

      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;

      if (!token || !accessTokenEnv)
        throw res.status(404).json({ message: "Token invalid / undefined" });

      if (!privateVal) privateVal = false;
      if (!anonymVal) anonymVal = false;

      if (!postVal || postVal.length < 3)
        throw res
          .status(404)
          .json({ message: "Postingan harus ada minimal 3 huruf/karakter" });

      jwt.verify(token, accessTokenEnv, (err, user) => {
        void (async () => {
          try {
            if (!user)
              throw res.status(404).json({ message: "User tidak ditemukan." });
            if (err)
              throw res.status(500).json({ message: "Internal server error." });

            const createdPost = await prisma.dataPost.create({
              data: {
                post: postVal,
                anonym: anonymVal,
                private: privateVal,
                Account: {
                  connect: {
                    id: (user as { id: string }).id,
                  },
                },
              },
            });

            if (!createdPost)
              throw res.status(500).json({ message: "Internal server error." });

            return res.json({ message: "Berhasil membuat postingan." });
          } catch (error) {
            console.error(error);
            return error;
          } finally {
            await prisma.$disconnect();
          }
        })();
      });
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const getPosts = (req: Request, res: Response) => {
  void (async () => {
    try {
      const posts = await prisma.dataPost.findMany({
        where: {
          private: false,
        },
        include: {
          Account: {
            select: {
              username: true,
              realname: true,
              mbti: true,
              img: true,
            },
          },
          likes: true,
        },
      });

      if (!posts)
        throw res
          .status(404)
          .json({ message: "Tidak ada postingan yang dibuat" });

      return res.json(posts);
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const editPost = (req: Request, res: Response) => {
  void (async () => {
    try {
      const id = req.params.id;
      const { postVal } = req.body as IPost;
      let { privateVal, anonymVal } = req.body as IPost;

      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;

      if (!token || !accessTokenEnv)
        throw res.status(404).json({ message: "Token invalid / undefined" });

      if (!privateVal) privateVal = false;
      if (!anonymVal) anonymVal = false;

      if (!postVal || postVal.length < 3)
        throw res
          .status(404)
          .json({ message: "Postingan harus ada minimal 3 huruf/karakter" });

      jwt.verify(token, accessTokenEnv, (err, user) => {
        void (async () => {
          try {
            if (!user)
              throw res.status(404).json({ message: "User tidak ditemukan." });
            if (err)
              throw res.status(500).json({ message: "Internal server error." });

            const findPost = await prisma.dataPost.findFirst({
              where: {
                id,
              },
            });

            if (!findPost)
              throw res
                .status(404)
                .json({ message: "Postingan tidak ditemukan." });

            if (findPost.accountId !== (user as { id: string }).id)
              throw res.status(401).json({
                message: "Kamu bukan orang yang memiliki postingan ini!",
              });

            const updatePost = await prisma.dataPost.update({
              where: {
                id: findPost.id,
              },
              data: {
                post: postVal,
                anonym: anonymVal,
                private: privateVal,
              },
            });

            if (!updatePost)
              throw res.status(500).json({ message: "Internal server error." });

            return res.json({ message: "Berhasil memperbarui postingan." });
          } catch (error) {
            console.error(error);
            return error;
          } finally {
            await prisma.$disconnect();
          }
        })();
      });
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const deletePost = (req: Request, res: Response) => {
  void (async () => {
    try {
      const id = req.params.id;

      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;

      if (!token || !accessTokenEnv)
        throw res.status(404).json({ message: "Token invalid / undefined" });

      jwt.verify(token, accessTokenEnv, (err, user) => {
        void (async () => {
          try {
            if (!user)
              throw res.status(404).json({ message: "User tidak ditemukan." });
            if (err)
              throw res.status(500).json({ message: "Internal server error." });

            const findPost = await prisma.dataPost.findFirst({
              where: {
                id,
              },
            });

            if (!findPost)
              throw res
                .status(404)
                .json({ message: "Postingan tidak ditemukan." });

            if (findPost.accountId !== (user as { id: string }).id)
              throw res.status(401).json({
                message: "Kamu bukan orang yang memiliki postingan ini!",
              });

            const updatePost = await prisma.dataPost.delete({
              where: {
                id: findPost.id,
              },
            });

            if (!updatePost)
              throw res.status(500).json({ message: "Internal server error." });

            return res.json({ message: "Berhasil menghapus postingan." });
          } catch (error) {
            console.error(error);
            return error;
          } finally {
            await prisma.$disconnect();
          }
        })();
      });
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const likePost = (req: Request, res: Response) => {
  void (async () => {
    try {
      const id = req.params.id;

      const { refreshtoken } = req.cookies as ICookie;

      if (!refreshtoken || !refreshTokenEnv)
        throw res.status(404).json({ message: "Token invalid / undefined" });

      jwt.verify(refreshtoken, refreshTokenEnv, (err, user) => {
        void (async () => {
          if (!user || err)
            return res.status(404).json({ message: "Account not found." });

          await featLike(res, (user as { id: string }).id, id);
        })();
      });
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};
