export default interface CardType {
  card: {
    id: string;
    maskedPan: string;
    balance: number;
    currencyCode: number;
    type: string;
    creditLimit: number;
  };
}
