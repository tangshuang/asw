import awaitx from './awaitx.js'
import asyncI from './async-iterate.js'

/**
 * traverse items with async function one by one
 * @param {Array} items
 * @param {Function} fn
 * @return {Promise}
 * @example
 * let items = [...]
 * await asyncEach(items, async (item, i) => {
 *   let res = await fetch(url, item)
 *   let data = await res.json()
 *   return data
 * })
 */
export function asyncEach(items, fn) {
  return asyncI(items, (item, i, next) => awaitx(fn(item, i, items), next))
}
export default asyncEach
