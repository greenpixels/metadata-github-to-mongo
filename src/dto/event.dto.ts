interface User {
  name: string,
  id : number
}

interface Branch {
  name: string,
  id : number
}

export default class Event {
  constructor(
    readonly name: string,
    readonly action: string,
    readonly user: User,
    readonly branch: Branch
  ){}
}