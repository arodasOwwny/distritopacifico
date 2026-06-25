import gql from "graphql-tag";
import graphqlClient from "@/services/apolloClient";

export const getFinancingEntities = async (projectId) => {
  const response = await graphqlClient.query({
    query: gql`
    query{
        financing(where: {proyect_id: {_eq: "${projectId}"}}) {
          bankDetail {
            name
          }
          max_financing_years
          monthly_interest_fee
        }
      }
      
    `,
  });
  return response.data.financing;
};

export default {
    getFinancingEntities,
};
