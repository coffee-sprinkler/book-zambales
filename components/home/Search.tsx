import { MUNICIPALITY_LABELS } from '@/constants/municipalities';
import { CATEGORY_LABELS } from '@/constants/categories';

const Search = () => {
  return (
    <div className='search-container bg-(--surface) border border-(--border) rounded-[14px] p-4 max-w-225 mx-auto mt-28'>
      <div className='search-card grid grid-cols-3 gap-8 items-center'>
        <div className='location flex flex-col gap-2'>
          <label
            htmlFor='locations'
            className='block text-[0.75rem] font-semibold text-muted uppercase'
          >
            Location
          </label>
          <select name='locations' id='locations'>
            {Object.entries(MUNICIPALITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className='category flex flex-col gap-2'>
          <label
            htmlFor='categories'
            className='block text-[0.75rem] font-semibold text-muted uppercase'
          >
            Category
          </label>
          <select name='categories' id='categories'>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className='search-button self-end'>
          <button className='btn-primary btn-search leading-none h-10.5  w-full justify-center'>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export { Search };
