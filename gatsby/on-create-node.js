const { createFilePath } = require(`gatsby-source-filesystem`);

module.exports = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const frontmatter = node.frontmatter;
        const collection = getNode(node.parent).sourceInstanceName;
        const slug = createFilePath({ node, getNode, basePath: `pages` });

        createNodeField({
            node,
            name: 'collection',
            value: collection,
        });

        if (collection === 'pages') { 
            const paths = slug.split('/').filter(String);
            const lang = paths[0];
            const level = frontmatter.parent ? 1 : 0;
            const parent = frontmatter.parent ? '/' + lang + '/' + frontmatter.parent + '/' : '';
            
            // console.log("Create node", collection, slug, lang, level, parent)

            createNodeField({
                node,
                name: 'lang',
                value: lang,
            });

            createNodeField({
                node,
                name: 'level',
                value: level,
            });

            createNodeField({
                node,
                name: 'parent',
                value: parent,
            });

            createNodeField({
                node,
                name: 'slug',
                value: slug,
            });
        }

        if (collection === 'dips') { 
            createNodeField({
                node,
                name: 'slug',
                value: '/dips' + slug,
            });
        }

        if (collection === 'blogs') { 
            createNodeField({
                node,
                name: 'slug',
                value: '/blog' + slug,
            });
        }
    }
};