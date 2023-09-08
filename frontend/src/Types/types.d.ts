interface DataPost {
  id: string;
  username: string;
  private: boolean;
  anonym: boolean;
  likes: number;
  post: string;
}

interface User {
  username: string;
  realname: string;
  email: string;
  tempatLahir: string;
  tanggalLahir: Date;
  gender: string;
  password: string;
  img: string;
  likedPost: DataPost[];
  likedQuotes: DataQuotes[];
  mbti: string;
}

interface DataQuotes {
  id: string;
  quote: string;
  creator: string;
  likes: number;
}
