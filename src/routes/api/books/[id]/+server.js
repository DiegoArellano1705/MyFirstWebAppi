import {books} from "$lib/books.js"

export async function GET({ params }){
    const book = books.find(b => b.id == params.id);
    if(!book) return new Response("Not found", {status: 404});
    return new Response(JSON.stringify(book), {status: 200});
}

export async function DELETE({ params }) {
const index = books.findIndex(b => b.id == params.id);
if (index === -1) return new Response("Not found", { status: 404 });
    books.splice(index, 1); // remove the book in-place
    return new Response(null, { status: 204 });
}

export async function PUT({ params, request }) {
const index = books.findIndex(b => b.id == params.id);
if (index === -1) return new Response("Not found", { status: 404 });
    const data = await request.json();
    books[index] = { ...books[index], ...data }; 
    return new Response(JSON.stringify(books[index]), { status: 200 });
};
