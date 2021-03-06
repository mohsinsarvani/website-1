import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import mq from '../common/mq';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import Container from '../components/Container';
import Sidebar from '../components/Sidebar';
import Heading from '../components/Heading';
import Segmented from '../components/Segmented';
import Pagination from '../components/Pagination';
import NavTabs from '../components/Tabs/NavTabs';
import NavTab from '../components/Tabs/NavTab';

const Link = styled(GatsbyLink)`
  display: block;
  color: #001826;
`;

const Post = styled(Row)`
  @media (min-width: ${mq.min[1024]}) {
    padding-right: 1em;
  }
`;

export default ({ data, pageContext }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO
        title="News"
        description="Ocius technology Ltd is building a new network of renewable energy powered unmanned surface
        vessels and today launched a &#8216;man-portable&#8217; version of the Bluebottle USV. &#8220;We&#8217;ve
        had a number of enquiries for small self sustaining USVs that can be deployed easily from a deck or beach."
      />
      <PageHeader>
        <Heading level={1} size="large" header>
          News
        </Heading>
        <NavTabs>
          <NavTab label="Blog" to="news" />
          <NavTab label="Media Coverage" to="media-coverage" />
        </NavTabs>
      </PageHeader>
      <section className="page-content">
        <Container>
          <Row>
            <Col className="primary-content" xs={12} md={7} lg={8}>
              {posts.map(({ node }) => (
                <Segmented key={node.id}>
                  <Post className="post">
                    <Col lg={5}>
                      {node.frontmatter.featuredImage && (
                        <Link to={node.fields.slug}>
                          <Img
                            fluid={node.frontmatter.featuredImage.childImageSharp.fluid}
                            alt={node.frontmatter.title}
                          />
                        </Link>
                      )}
                    </Col>
                    <Col lg={7}>
                      <Heading level={3} size="medium" className="title" weight="thick">
                        <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                      </Heading>
                      <p className="date">{node.frontmatter.date}</p>
                      <p className="preview">{node.excerpt}</p>
                    </Col>
                  </Post>
                </Segmented>
              ))}
              <Pagination pageContext={pageContext} pathPrefix="/" />
            </Col>
            <Col className="secondary-content" xs={12} md={5} lg={4}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query IndexQuery($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 700, maxHeight: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt(pruneLength: 160)
        }
      }
    }

    allLinksYaml {
      edges {
        node {
          id
          url
          title
          source
          date(formatString: "DD MMMM, YYYY")
          thumbnail {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
