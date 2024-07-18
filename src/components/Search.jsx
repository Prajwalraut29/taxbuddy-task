import React from 'react'
import axios from 'axios'
import { useState } from 'react';
const Search = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const searchBooks = async () => {
        try {
            const response = await axios.get(`http://openlibrary.org/search.json?q=${query}`);
            setBooks(response.data.docs);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='flex justify-center items-center mx-10 flex-col'>
            <h2 className='text-center flex justify-center items-center text-xl my-10 text-green-700 text-bold'>Search Your Books</h2>
            <div>
                <input className='border-2 border-green-500 w-[45vw] py-2 rounded-lg' type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter book title, author, or keyword" />
                <button className='px-3 py-2 mx-2 rounded-md bg-green-500 hover:bg-green-300' onClick={searchBooks}>Search</button>
            </div>

            <div className=' items-center justify-center text-center  flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[70rem]'>
                {books.length > 0 ? (
                    <ul className=''>
                        {books.map((book, index) => (
                            <li className=' bg-gray-50 flex flex-col justify-center p-4 border border-slate-300 rounded-md my-2 shadow-sm' key={index}>
                                <h2><strong>Book Name:</strong>{book.title}</h2>
                                <p><strong>Author:</strong> {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                                <p><strong>First Published Year:</strong> {book.first_publish_year || 'Unknown'}</p>
                                <br />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No books found.</p>
                )}
            </div>
        </div>
    )
}

export default Search
