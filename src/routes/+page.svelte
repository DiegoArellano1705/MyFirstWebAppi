<script>
let books = [];
// ===== ADD BOOK FUNCTIONALITY START =====
let title = "";
let author = "";
let editingId = null;
let editTitle = "";
let editAuthor = "";

// Add new book //POST
async function addBook() {
const response = await fetch("/api/books", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ title, author }),
});
const newBook = await response.json();
books = [...books, newBook];
title = "";
author = "";
}

// ===== ADD BOOK FUNCTIONALITY END =====
// Fetch books on component mount //GET
onMount(async () => {
const response = await fetch("/api/books");
books = await response.json();
});
import { onMount } from "svelte";

// ===== DELETE BOOK FUNCTIONALITY START =====
// Delete book //DELETE
async function deleteBook(id, title) {
if (confirm(`¿Estás seguro de eliminar "${title}"?`)) {
await fetch(`/api/books/${id}`, { method: 'DELETE' });
books = books.filter(book => book.id !== id);
}
}
// ===== DELETE BOOK FUNCTIONALITY END =====


// ===== EDIT BOOK FUNCTIONALITY START =====
function startEdit(book) {
editingId = book.id;
editTitle = book.title;
editAuthor = book.author;
}
async function saveEdit() {
const response = await fetch(`/api/books/${editingId}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: editTitle, author: editAuthor })
});
const updatedBook = await response.json();
books = books.map(book => book.id === editingId ? updatedBook : book);
editingId = null;
}
function cancelEdit() {
editingId = null;
}
// ===== EDIT BOOK FUNCTIONALITY END =====

</script>




<div class="container mx-auto p-4">
<h1 class="text-3xl font-bold mb-6">Lista de Libros</h1>
<!-- ===== ADD BOOK FORM START ===== -->
<div class="bg-gray-50 p-4 rounded-lg mb-6">
<h2 class="text-xl font-semibold mb-4">Agregar Libro</h2>
<div class="flex gap-4">
<input
bind:value={title}
placeholder="Título"
class="flex-1 p-2 border rounded"
/>
<input
bind:value={author}
placeholder="Autor"
class="flex-1 p-2 border rounded"
/>
<button
on:click={addBook}
class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>Agregar</button
>
</div>
</div>
<!-- ===== ADD BOOK FORM END ===== -->

{#each books as book}
<div class="bg-white shadow-md rounded-lg p-4 mb-4 border">
{#if editingId === book.id}
<!-- Edit mode -->
<div class="space-y-3">
<input bind:value={editTitle} class="w-full p-2 border rounded" />
<input bind:value={editAuthor} class="w-full p-2 border rounded" />
<div class="flex gap-2">
<button on:click={saveEdit} class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Guardar</button>
<button on:click={cancelEdit} class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">Cancelar</button>
</div>
</div>
{:else}
<!-- View mode -->
<div class="flex justify-between items-start">
<div>
<h3 class="text-xl font-semibold text-gray-800">{book.title}</h3>
<p class="text-gray-600">Autor: {book.author}</p>
</div>
<div class="flex gap-2">
<button
on:click={() => startEdit(book)}
class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
>Editar</button
>
<button
on:click={() => deleteBook(book.id, book.title)}
class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
>Eliminar</button
>
</div>
</div>
{/if}
</div>
{/each}
</div>