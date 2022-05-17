import {gql} from "@apollo/client";

const NEWS = gql`
  query news {
  news {
    id
    title
    author
    views
    publishDate
  }
}
`;

export default NEWS;