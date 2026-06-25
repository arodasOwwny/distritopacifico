import gql from "graphql-tag";
import graphqlClient from "@/services/apolloClient";

export const getParkingsAvailable = async (projectId) => {
  const response = await graphqlClient.query({
    query: gql`
      query {
        parkings(
          where: {
            property_relation_id: { _is_null: true }
            status: { _eq: "Disponible" }
          }
          order_by: { unit_name: asc }
        ) {
          id
          unit_name
          status
          price
        }
      }
    `,
  });
  return response.data.parkings;
};

export default {
  getParkingsAvailable,
};
