const config = require('../../config');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const basicAuthModule = require('basic-auth');

function basicAuth() {
  return (req, res, next) => {
    const user = basicAuthModule(req);

    if (!user || user.name !== config.get('DOCS_USER') || user.pass !== config.get('DOCS_PASSWORD')) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }

    return next();
  };
}

module.exports = (router) => {
  const docTitle = config.get('DOCS_TITLE');
  const docVersion = config.get('DOCS_VERSION');

  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: docTitle,
        version: docVersion,
      },
    },
    apis: [
      './controllers/v1/*.js',
    ],
  });

  const showExplorer = false;
  const options = {};
  const customCss = '';
  const customFavicon = '';
  const swaggerUrl = '';

  router.use(
    '/docs',
    basicAuth(),
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerSpec,
      showExplorer,
      options,
      customCss,
      customFavicon,
      swaggerUrl,
      docTitle,
      (req, res, next) => {
        next();
      }
    )
  );

  router.use(
    '/ping',
    (req, res) => res.status(200).json({ success: true, uptime: process.uptime() })
  );
};
