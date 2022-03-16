interface Sender {
  readonly name: string,
  readonly id: number,
  readonly type: string
}

interface Branch {
  readonly name : string
}

export default interface Event {
  readonly name: string,
  readonly action: string,
  readonly sender: Sender,
  readonly branch?: Branch,
  readonly timestamp: Date
}