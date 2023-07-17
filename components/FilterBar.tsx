import { Dispatch, SetStateAction } from "react";

type Props = {
  filterText: string;
  onFilterTextChange: Dispatch<SetStateAction<string>>;
}

export default function FilterBar({ filterText, onFilterTextChange }: Props) {
  return (
    <div className="mb-1">
      <label htmlFor="table-search" className="sr-only">Search</label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd">
              </path>
          </svg>
       </div>
          <input 
            type="text"
            id="table-search"
            className="border text-sm rounded-lg block w-80 pl-10 p-2.5 bg-slate-700 border-gray-600 placeholder-slate-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by name"
            value={filterText}
            onChange={(e) => onFilterTextChange(e.target.value)}
          />
        </div>
    </div>
  );
}
