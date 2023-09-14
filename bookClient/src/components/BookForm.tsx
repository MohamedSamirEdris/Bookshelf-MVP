/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addBook, searchBooks } from '../services/api/book.service';
import { useState } from 'react';

const addSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  Publication_date: z
    .string()
    .min(1, 'Publication date must be after January 1, 1900'),
});

type BookData = z.infer<typeof addSchema>;

const BookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookData>({
    resolver: zodResolver(addSchema),
  });

  const [searchQuery, setSearchQuery] = useState('');

  const onSubmit = async (data: any) => {
    try {
      const book = await addBook(data);
      console.log('Book added successfully:', book);
      // Handle success
    } catch (error) {
      console.error('Error adding book:', error);
      // Handle error
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);

    // Trigger search when the user types at least one character
    if (newValue.length >= 1) {
      handleSearch(newValue);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const results = await searchBooks(query);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Error searching for books:', error);
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Book</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              autoComplete="title"
              id="title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              {...register('title')}
              onChange={handleTitleChange} // Add onChange event handler
            />
          </div>
          <span className="error">{errors.title?.message}</span>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-600"
            >
              Author
            </label>
            <input
              type="text"
              autoComplete="author"
              id="author"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              {...register('author')}
            />
          </div>
          <span className="error">{errors.author?.message}</span>
          <div className="mb-4">
            <label
              htmlFor="Publication_date"
              className="block text-sm font-medium text-gray-600"
            >
              Publication Date
            </label>
            <input
              type="date"
              autoComplete="Publication_date"
              id="Publication_date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              {...register('Publication_date')}
            />
          </div>
          <span className="error">{errors.Publication_date?.message}</span>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
