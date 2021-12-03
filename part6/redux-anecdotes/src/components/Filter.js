import { useDispatch } from 'react-redux'
import { filterChanged } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(filterChanged(e.target.value))
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

export default Filter;
