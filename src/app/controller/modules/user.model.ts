export class User {
  id = 0;
  name: string;
  email: string;
  password: string;
  cin: string;
  age: number;
  created: Date = new Date();
  isEnabled: boolean = true;
  role: string;



  constructor() {
  }
}
