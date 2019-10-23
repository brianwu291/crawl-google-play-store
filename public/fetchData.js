function getData(req, init) {
  return fetch(req, init).then(res => res.json())
  .then(res => res)
  .catch(err => console.log('err', err))
}

export default getData
