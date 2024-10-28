interface userType {
  _id: string;
  username: string;
  displayname: string;
  email: string;
  profile_picture?: string;
  banner_picture?: string;
  occupation?: string;
  profile_url?: string;
  dob?: string;
  location?: string;
  bio?: string;
}

type tweetType = {
  _id: string;
  text: string;
  user: {
    _id: string;
    username: string;
    displayname: string;
    profile_picture: string;
  };
  media: string[];
  createdAt: Date;
  updatedAt: Date;
};
