import { NextFunction, Request, Response } from "express";

export const isUsernameValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body as { username: string };

  const validUsernamePattern = /^[a-z0-9_.]+$/;

  if (!validUsernamePattern.test(username))
    return res.status(403).json({
      message:
        "Username hanya boleh mengandung huruf kecil, angka dan simbol '_' atau '.'",
    });
  next();
};

export const isRealNameValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { realname } = req.body as { realname: string };

  const validRealNamePattern = /^[a-zA-Z\s.,]+$/;

  if (!validRealNamePattern.test(realname))
    return res.status(403).json({
      message: "Nama Lengkap hanya boleh mengandung huruf dan spasi!",
    });
  next();
};

interface Mbti {
  mbti: string;
}

export const isMBTIValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mbti } = req.body as Mbti;

  if (!mbti) return next();

  const MBTI = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
  ];

  if (mbti.length >= 1 && mbti.length !== 4)
    return res.status(403).json({
      message: "Karakter MBTI tidak lebih dan tidak kurang dari 4 karakter!",
    });

  if (!MBTI.includes(mbti.toUpperCase()))
    return res.status(403).json({
      message: `${mbti.toUpperCase()} tidak ditemukan!`,
    });

  return next();
};

export const isPhoneNumberValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phonenumber } = req.body as IProfile;
  const validPhoneNumberPattern = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;

  if (!phonenumber) return next();
  if (!validPhoneNumberPattern.test(phonenumber))
    return res.status(403).json({
      message: "Bukan nomor handphone Indonesia yang valid.",
    });

  return next();
};
