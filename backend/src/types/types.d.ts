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
  isAdmin: boolean;
  isCounselor: boolean;
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
  likedPost?: ILikedPost[];
  isAdmin: boolean;
  isCounselor: boolean;
  phonenumber: string | null;
}

interface ILikedPost {
  userId: string | null;
  postId: string | null;
}

interface ILogin {
  username: string;
  password: string;
}

interface ICookie {
  refreshtoken: string;
}

interface IEditable {
  realname: string;
  username: string;
  email: string;
  mbti: string | null;
  tempatLahir: string;
  tanggalLahir: string;
  phonenumber: string | null;
}

interface IPost {
  postVal: string;
  privateVal: boolean;
  anonymVal: boolean;
}
