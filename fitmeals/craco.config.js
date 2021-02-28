const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#032D23',
             '@btn-primary-bg': '#032D23', 
             '@btn-border-radius-base': '10px',
            '@btn-border-radius-sm': '10px', 
            '@checkbox-color': '#AAA713',
            '@link-color': '#AAA713',
        },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};