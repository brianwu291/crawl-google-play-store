module.exports = (req, res, next) => {
  // if (req.body) {
  //   console.log('body', body)
  //   // res.status(403).send({ error: 'You should login in first!' })
  // }
  next()
};