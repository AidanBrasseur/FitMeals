const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#AAA713',
             '@btn-primary-bg': '#032D23', 
             '@btn-border-radius-base': '10px',
            '@btn-border-radius-sm': '10px',
        },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};