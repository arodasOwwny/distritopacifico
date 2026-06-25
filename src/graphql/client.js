import gql from "graphql-tag";
import graphqlClient from "@/services/apolloClient";

export const getClient = async (email) => {
  const response = await graphqlClient.query({
    query: gql`
    query	{
      client(where: {email: {_eq: "${email}"}}) {
        id
        displayName
        email
        phone
        area_code
        companyRelations(where: {companyId: {_eq: "ba55bc08-0f55-40e2-9476-95a4b8c88eaa"}}) {
          id
          sellerProfile{
            email
            first_name
            last_name
            phone
          }
        }
      }
    }
    
    `,
  });
  return response.data.client;
};

export const createClient = async (
  displayName,
  email,
  firebaseUID,
  phone,
  areaCode,
  avatar,
  emailByUser,
  provider
) => {
  const response = await graphqlClient.mutate({
    mutation: gql`
      mutation {
        insert_client(
          objects: {
            displayName: "${displayName}"
            email: "${email}"
            firebaseUid: "${firebaseUID}"
            phone: "${phone}"
            area_code: "${areaCode}"
            avatar: "${avatar}"
            emailByUser: "${emailByUser}"
            provider:"${provider}"
          }
        ) {
          returning {
            id
            email
          }
        }
      }
    `,
  });
  return response.data.insert_client;
};

export const createClientRelationToCompany = async (
  email,
  companyId,
  sellerEmail,
  utm_id,
  utm_term,
  utm_medium,
  utm_source,
  utm_content,
  utm_campaign
) => {
  const response = await graphqlClient.mutate({
    mutation: gql`
    mutation {
      insert_clientCompanyRelation(objects: {
        clientEmail: "${email}", 
        companyId: "${companyId}",
        sellerAssigned: "${sellerEmail}",
        utm_id: "${utm_id}",
        utm_term: "${utm_term}",
        utm_medium: "${utm_medium}",
        utm_source: "${utm_source}",
        utm_content: "${utm_content}",
        utm_campaign: "${utm_campaign}"
      }) {
        returning {
          id
        }
      }
    }
    `,
  });
  return response.data.insert_clientCompanyRelation;
};

export const checkCompanyRelation = async (email, companyId) => {
  const response = await graphqlClient.mutate({
    mutation: gql`
    query{
      clientCompanyRelation(where: {clientEmail: {_eq: "${email}"}, _and: {companyId: {_eq: "${companyId}"}}}) {
        companyId
        id
      }
    }
    
    `,
  });
  return response.data.clientCompanyRelation;
};

export default {
  getClient,
  createClient,
  createClientRelationToCompany,
  checkCompanyRelation,
};
