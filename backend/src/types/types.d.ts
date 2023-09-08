interface User {
  username: string;
  realname: string;
  email: string;
  tempatLahir: string;
  tanggalLahir: Date;
  gender: string;
  password: string;
  img?: string;
  likedPost: DataPost[];
  likedQuotes: DataQuotes[];
  mbti?: string;
}
