import { handleError } from "../functions/index.js";
import { API_URL } from "./config/index.js";

// api functions

export async function getCharacters(iterator = 1) {
    const apiUrl = `${API_URL}/?page=${iterator}`;
    const res = await fetch(apiUrl);
    const { results } = await res.json();
    return results;
}

export async function getCharacter(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {
        if (error) {
            handleError()
        }
    }
}

export function getResidents(arr) {
    const residents = [];
    arr.map(async (resident) => {
        const obj = await getCharacter(resident)
        residents.push(obj)
    })
    return residents;
}