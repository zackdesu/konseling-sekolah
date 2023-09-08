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
  name: string;
  gender: string;
  mbti: string;
  likedPost: DataPost[];
  likedQuotes: DataQuotes[];
  img: string;
}

interface DataQuotes {
  id: string;
  quote: string;
  creator: string;
  likes: number;
}
