import asyncx from './asyncx.js'
import awaitx from './awaitx.js'

/**
 * iterate items with async function
 * @param {array} items
 * @param {function} fn
 * @return {undefined}
 * @example
 * let items = [...]
 * await asyncIterate(items, async (item, i, next, stop, complete) => {
 *   let res = await fetch(url, item)
 *   if (res.code === 0) {
 *     next()
 *   }
 *   else {
 *     stop()
 *   }
 * })
 */
export function asyncIterate(items, fn) {
  return awaitx(items, (items) => {
    return new Promise((resolve, reject) => {
      let i = 0
      let isCompleted = false
      const through = () => {
        if (isCompleted) {
          return
        }
        const item = items[i]
        if (!item) {
          resolve()
          return
        }
        const afn = asyncx(fn)
        return new Promise((next, stop) => {
          const complete = (o) => {
            isCompleted = true
            next()
            resolve(o)
          }
          afn(item, i ++, next, stop, complete)
        }).then(through).catch(reject)
      }
      through()
    })
  })
}
export default asyncIterate
