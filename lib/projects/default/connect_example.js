module.exports = function(connect, options, middlewares) {
  // inject a custom middleware into the array of default middlewares
  console.log(middlewares.staticMiddleware);
  middlewares.unshift(function(req, res, next) {
    if (req.url !== '/api/example') return next();
    res.end('Your connect middleware is working!');
  });
  return middlewares;
}