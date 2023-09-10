import { NextFunction, Request, Response } from "express";

export const isUsernameValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body as { username: string };

  const validUsernamePattern = /^[a-zA-Z0-9_.]+$/;

  if (!validUsernamePattern.test(username))
    return res.status(403).json({
      message:
        "Username hanya boleh mengandung huruf, angka dan simbol '_' atau '.'",
    });
  next();
};

export const isRealNameValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { realname } = req.body as { realname: string };

  const validRealNamePattern = /^[a-zA-Z\s]+$/;

  if (!validRealNamePattern.test(realname))
    return res.status(403).json({
      message: "Nama Lengkap hanya boleh mengandung huruf dan spasi!",
    });
  next();
};
