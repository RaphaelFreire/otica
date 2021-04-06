require("dotenv").config();

const queries = require("./src/utils/algolia_queries.js");

module.exports = {
	siteMetadata: {
		title: `Agendar Exame de Vista`,
		position: ``,
		description: `Site Especializado em conectar potenciais clientes com a sua Ótica`,
		author: `Agendar Exame de Vista`,
		siteUrl: `https://agendarexamedevista.com.br/blog`
	},
	flags: {
		DEV_SSR: false
	},
	plugins: [
		`gatsby-plugin-transition-link`,
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-react-helmet`,
		// needs to be the first to work with gatsby-remark-images
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `uploads`,
				path: `${__dirname}/static/assets/img`
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `posts`,
				path: `${__dirname}/posts`
			}
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				// CommonMark mode (default: true)
				commonmark: true,
				// Footnotes mode (default: true)
				footnotes: true,
				// Pedantic mode (default: true)
				pedantic: true,
				// GitHub Flavored Markdown mode (default: true)
				gfm: true,
				// Plugins configs
				plugins: [
					{
						resolve: "gatsby-remark-relative-images-v2",
						options: {
							name: "uploads"
						}
					},
					{
						resolve: "gatsby-remark-images",
						options: {
							maxWidth: 960,
							linkImagesToOriginal: false
						}
					},
					`gatsby-remark-lazy-load`,
					`gatsby-remark-prismjs`
				]
			}
		},
		`gatsby-plugin-image`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-algolia-search`,
			options: {
				appId: process.env.GATSBY_ALGOLIA_APP_ID,
				apiKey: process.env.ALGOLIA_ADMIN_KEY,
				indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
				queries,
				chunkSize: 10000,
				enablePartialUpdates: true // default: false
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Raphael Machado Freire`,
				short_name: `Raphael Freire`,
				start_url: `/`,
				background_color: `#16202c`,
				theme_color: `#16202c`,
				display: `minimal-ui`,
				icon: `src/images/favicon.svg` // This path is relative to the root of the site.

			}
		},
		`gatsby-plugin-sitemap`,
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		`gatsby-plugin-offline`,
	]
};
