/**
 * Mocking client-server processing
 */
import _products from './products'

const TIMEOUT = 100

export default {
  getProducts: (cb, timeout) => {
    return setTimeout(() => {
      return cb(_products)
    }, timeout || TIMEOUT)

  },
  buyProducts: (payload, cb, timeout) => {
    return setTimeout(() => {
      return cb()
    }, timeout || TIMEOUT)
  }
}
