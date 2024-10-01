export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface UserRequest extends Request {
    body: User;
  }