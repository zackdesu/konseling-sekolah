interface DataQuotes {
  id: string;
  quote: string;
  creator: string;
  likes: number;
}

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

interface ILogin {
  username: string;
  password: string;
}

interface ICookie {
  refreshtoken: string;
}
