import axios from 'axios'

export class BaseService {
  static get(url, params, token) {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    })

    return new Promise((resolve, reject) =>
      axios
        .get(url, { params })
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject({
              message: error.response.data,
              code: error.response.status,
              location: error.config.url,
            })
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }

          reject(error.config)
        })
    )
  }

  static post(url, data, token) {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    })

    return new Promise((resolve, reject) =>
      axios
        .post(url, data)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject({
              message: error.response.data,
              code: error.response.status,
              location: error.config.url,
            })
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }

          reject(error.config)
        })
    )
  }

  static put(url, data, token) {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`

        return config
      }
    })

    return new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject({
              message: error.response.data,
              code: error.response.status,
              location: error.config.url,
            })
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }

          reject(error.config)
        })
    })
  }

  static delete(url, token) {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`

        return config
      }
    })

    return new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject({
              message: error.response.data,
              code: error.response.status,
              location: error.config.url,
            })
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }

          reject(error.config)
        })
    })
  }

  static patch(url, data, token) {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`

        return config
      }
    })

    return new Promise((resolve, reject) => {
      axios
        .patch(url, data)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject({
              message: error.response.data,
              code: error.response.status,
              location: error.config.url,
            })
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }

          reject(error.config)
        })
    })
  }
}
