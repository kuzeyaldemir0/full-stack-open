const Filter = (props) => {
  return (
    <div>
      filter by name: <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  )
}

export default Filter
