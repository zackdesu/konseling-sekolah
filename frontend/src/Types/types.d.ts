interface DataPost {
  id: string;
  private: boolean;
  anonym: boolean;
  post: string;
  likes: ILikedPost[];
  createdTime: Date;
  Account: {
    img: string | null;
    mbti: string | null;
    username: string;
    realname: string;
  } | null;
}

interface User {
  id: string;
  username: string;
  realname: string;
  email: string;
  role: string | null;
  description: string | null;
  tempatLahir: string;
  tanggalLahir: Date;
  gender: string;
  password: string;
  img: string | null;
  likedPost?: DataPost[];
  likedQuotes?: DataQuotes[];
  mbti: string | null;
  phonenumber: string | null;
}

interface IProfile {
  id: string;
  username: string;
  realname: string;
  tempatLahir: string;
  tanggalLahir: Date;
  gender: string;
  img: string | null;
  mbti: string | null;
  likedPost?: DataPost[];
  isAdmin: boolean;
  isCounselor: boolean;
}

interface DataQuotes {
  id: string;
  quote: string;
  creator: string;
  likes: number;
}

interface IRegisterData {
  username: string;
  realname: string;
  email: string;
  tempatLahir: string;
  tanggalLahir: Date;
  gender: string;
  password: string;
}

interface IAPISuccess {
  token: string;
  message: string;
  data: IToken;
}

interface IAPIToken {
  token: string;
}

interface IAPIError {
  response: { data: { message: string } };
}

interface IToken {
  id: string;
  username: string;
  email: string;
  gender: string;
  img: string | null;
  exp: number;
  iat: number;
}

interface ILikedPost {
  userId: string;
  postId: string;
}

interface IAdmin {
  id: string;
  username: string;
  realname: string;
  img: string;
  isAdmin: boolean;
  isCounselor: boolean;
}

interface ICounselor {
  id: string;
  username: string;
  role: string;
  realname: string;
  img: string;
  isCounselor: boolean;
  gender: string;
  mbti: string;
}

interface IMessage {
  room?: string;
  from: string;
  message: string;
}
