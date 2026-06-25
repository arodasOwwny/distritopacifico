import gql from "graphql-tag";
import graphqlClient from "@/services/apolloClient";

export const createQuoteToClient = async (
          propertyId, 
          clientEmail, 
          price, 
          livingArea, 
          bedrooms, 
          bathrooms, 
          reservationAmount, 
          depositAmount, 
          depositFraction, 
          depositMonthAmount, 
          financingEntitie, 
          financingInterestRate, 
          financingMonthAmount, 
          financingYears,
          pdfUrl,
          createdIn
  ) => {
    const response = await graphqlClient.mutate({
      mutation: gql`
      mutation {
        insert_quotes(
          objects: {
          propertyId: "${propertyId}", 
          clientEmail: "${clientEmail}", 
          price: "${price}", 
          livingArea: "${livingArea}", 
          bedrooms: "${bedrooms}", 
          bathrooms: "${bathrooms}", 
          reservationAmount: "${reservationAmount}", 
          depositAmount: "${depositAmount}", 
          depositFraction: "${depositFraction}", 
          depositMonthAmount: "${depositMonthAmount}", 
          financingEntitie: "${financingEntitie}", 
          financingInterestRate: "${financingInterestRate}", 
          financingMonthAmount: "${financingMonthAmount}", 
          financingYears: "${financingYears}",
          pdfUrl:"${pdfUrl}",
          createdIn:"${createdIn}"
        }) {
          returning {
            clientData{
              email
            }
          }
        }
      }
      `,
    });
    return response.data.insert_quotes;
  };
  
  export default {
    createQuoteToClient
  };
  