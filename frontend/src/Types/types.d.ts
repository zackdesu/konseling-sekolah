interface DataPost {
  id: string;
  username: string;
  private: boolean;
  anonym: boolean;
  likes: number;
  post: string;
}

interface User {
  id: string;
  username: string;
  realname: string;
  email: string;
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
  token?: string | null;
  message: string;
  data: IToken;
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
