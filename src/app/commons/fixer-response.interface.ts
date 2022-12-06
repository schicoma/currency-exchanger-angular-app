export interface FixerConvertResponse {
    success: boolean;
    result: number;
    query: FixerConvertQuery;
    info: FixerConvertInfo;
}

interface FixerConvertQuery {
    from: string;
    to: string;
    amount: number
}
interface FixerConvertInfo {
    timestamp: number;
    rate: number;
}

export interface FixerTimeseriesResponse {
    success: boolean;
    timeseries: number;
    start_date: string;
    end_date: string;
    base: string;
    rates: Map<string, Map<string, number>>;
}

export interface FixerSymbolsResponse {
    success: boolean;
    symbols: Map<string, string>;
}

export interface FixerLatestResponse {
    base: string;
    date: string;
    rates: { [key: string]: number; };
    success: boolean;
    timestamp: number;
}