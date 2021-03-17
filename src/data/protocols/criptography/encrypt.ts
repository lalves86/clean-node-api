export interface Encrypter {
  encrypt: (plaintextr: string) => Promise<string>
}
