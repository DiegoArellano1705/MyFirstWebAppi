import {books} from "$lib/books.js"

export async function GET(){
    return new Response(JSON.stringify(books), {status: 200});
}


export async function POST({ request }) {
    const data = await request.json();
    const newBook = { id: Date.now(), ...data };
    books.push(newBook);
    return new Response(JSON.stringify(newBook), {status: 201});
}