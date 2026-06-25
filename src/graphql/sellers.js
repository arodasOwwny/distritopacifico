import gql from "graphql-tag";
import graphqlClient from "@/services/apolloClient";

export const getSellersByProyect = async (projectId) => {
  const response = await graphqlClient.query({
    query: gql`
     {
  users(where: {proyect_member: {proyect_id: {_eq: "${projectId}"}}, _and: {InternalUser: {_eq: true}, _and: {email: {_neq: "support@owwny.com"}}}}) {
    email
  }
}


    `,
  });
  return response.data.users;
};

export default {
  getSellersByProyect,
};
