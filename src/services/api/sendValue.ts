import {baseFetch, baseHeader} from "./baseApi";

export async function sendValue(value: string) {
    const requestOptions = baseHeader('POST', {value: value})
    return await baseFetch("api/v1/test/enc/dec", requestOptions);
}