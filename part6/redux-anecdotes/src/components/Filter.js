import { connect } from 'react-redux'
import { filterChanged } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (e) => {
    props.filterChanged(e.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <label>filter</label>
      <input onChange={handleChange} />
    </div>
  )
}

const connectedFilter = connect(
  null,
  { filterChanged }
)(Filter)

export default connectedFilter;
