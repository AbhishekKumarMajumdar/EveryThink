declare function formatMoney(value: number, currency: string): string;
declare function parseMoney(input: string): number;

declare function formatIsoDate(date: Date): string;
declare function toDayRange(date: Date): {
    start: Date;
    end: Date;
};

export { formatIsoDate, formatMoney, parseMoney, toDayRange };
