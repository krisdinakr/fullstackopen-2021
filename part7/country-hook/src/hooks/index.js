import axios from 'axios'
import { useEffect, useState } from 'react'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`)
      .then(response => {
        if (response.data.status !== 404) {
          setCountry({
            found: true,
            data: response.data[0]
          })
        } else {
          setCountry({
            found: false,
            data: null
          })
        }
      })
  }, [name])
  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}