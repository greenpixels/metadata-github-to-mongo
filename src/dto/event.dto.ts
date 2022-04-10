export default interface Event {
  readonly name: string,
  readonly action: string,
  readonly branch_to?: string,
  readonly branch_from?: string,
  readonly sender_name: string,
  readonly sender_id: number,
  readonly sender_type: string,
  readonly timestamp: Date
}