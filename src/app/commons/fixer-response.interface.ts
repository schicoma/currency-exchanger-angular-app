export interface FixerResponse {
    success: boolean;
    result: number;
    info: any;
    query: any;
    // "query": {
    //     "from": "EUR",
    //     "to": "USD",
    //     "amount": 240
    // },
    // "info": {
    //     "timestamp": 1670269023,
    //     "rate": 1.048713
    // }
}