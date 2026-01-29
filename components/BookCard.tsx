
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types.ts';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group border border-gray-100">
      <Link to={`/book/${book.id}`} className="relative block h-56 overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
           <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
            {book.format || 'PDF'}
          </span>
          {book.trending && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
              Trending
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-bold text-gray-900 leading-tight line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mb-4">{book.author}</p>
        
        <div className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {book.price || 'مجاني'}
          </span>
          <div className="flex items-center text-gray-400 text-[10px] font-semibold">
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            {book.downloads}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
