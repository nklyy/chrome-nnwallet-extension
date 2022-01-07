const baseUrl = 'http://localhost:5000/';
const auth = { username: 'test', password: 'test' }

export function baseHeader(method: string, value: any) {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${auth.username}:${auth.password}`)
        },
        body: JSON.stringify(value)
    };

    return requestOptions;
}

export async function baseFetch(url:string, requestOptions: any) {
    const response = await fetch(`${baseUrl}${url}`, requestOptions);
    const data = await response.json();

    return data;
}