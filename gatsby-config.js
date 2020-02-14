module.exports = {
  siteMetadata: {
    title: `Dennis Vash | Software Engineer`,
    description: `Dennis Vash`,
    author: `@dennisvash`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-resolve-src',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Dennis Vash',
        short_name: 'denvash',
        start_url: `/`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@src': 'src',
          '@components': 'src/components',
          '@icons': 'src/components/atoms/Icons',
          '@hooks': 'src/hooks',
          '@config': 'src/config',
          '@styles': 'src/styles',
          '@utils': 'src/utils',
          '@constants': 'src/constants',
          '@queries': 'src/queries',
          '@store': 'src/store',
        },
        extensions: ['js'],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        printRejected: true,
        purgeOnly: [`src/styles/globals.css`],
      },
    },
  ],
};
