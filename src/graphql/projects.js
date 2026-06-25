import gql from "graphql-tag";
import graphqlClient from "@/services/apolloClient";

export const getProjectData = async (projectId) => {
  const response = await graphqlClient.query({
    query: gql`
    {
      projects(where: {id: {_eq: "${projectId}"}}){
        id
        name
        logo
        website
        whatsapp_number
        country
        initial_fee_percentage
    		initial_fee_month_fractionation
        company_id
        images{
          id
          image_name
          image_url
        }
        team_members{
          email
        }
        financingEntities{
          id
          bank
          max_financing_years
          monthly_interest_fee
          bankDetail{
            logo
            name
          }
        }
        taxes{
          id
          name
          percentValue
        }
      }
    }
    
    `,
  });
  return response.data.projects;
};

export default {
  getProjectData,
};
