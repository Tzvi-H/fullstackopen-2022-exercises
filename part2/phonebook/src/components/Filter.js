const Filter = ({ setFilter, filter }) => (
  <div>
    filter shown with
    <input value={filter} onChange={({ target }) => setFilter(target.value)} />
  </div>
);

export default Filter;
