export interface User {
  id: string;
  email: string;
  full_name?: string;
}

export interface Developer {
  id: number;
  login: string;
  avatar_url: string;
  type: string;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  closed_at: string;
  author: string;
}
