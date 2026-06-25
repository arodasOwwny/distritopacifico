import gql from "graphql-tag";
import graphqlClient from "@/services/apolloClient";

export const getAllProperties = async (projectId) => {
  const response = await graphqlClient.query({
    query: gql`
    {
      properties(where: {proyect_id: {_eq: "${projectId}"}}, 
      order_by: {unit_name: asc}) {
            id
            proyect_id
            base_plane
            bedrooms
            bathrooms
            reference
            price
            typology
            unit_name
            living_area
            level
            tower
            status
            reservation
            parkings_relation{
              id
              unit_name
              price
            }
      }
    }    
    `,
  });
  return response.data.properties;
};

export const getAllPropertiesWithRoomNumber = async (projectId, rooms) => {
  const response = await graphqlClient.query({
    query: gql`
    {
      properties(where: {proyect_id: {_eq: "${projectId}"}, _and: {bedrooms: {_eq: ${rooms}}}}, order_by: {unit_name: asc}) {
            id
            proyect_id
            base_plane
            bedrooms
            bathrooms
            reference
            price
            typology
            unit_name
            living_area
            construction_area
            level
            tower
            status
            reservation
            parkings_relation{
              id
              unit_name
              price
            }
      }
    }
    
    `,
  });
  return response.data.properties;
};

export const getPropertiesByLevel = async (projectId, level, typology) => {
  const response = await graphqlClient.query({
    query: gql`
  {
  properties(where: {proyect_id: {_eq: "${projectId}"}, _and: {level: {_eq: ${level}}, _and: {typology: {_in: "${[typology]}"}}}}) {
    id
    proyect_id
        base_plane
        bedrooms
        bathrooms
        reference
        price
        price_base
        typology
        unit_name
        living_area
        balcony_area
        construction_area
        garden_area
        level
        tower
        status
        reservation
        parkings_relation {
          id
          unit_name
          price
          price_base
          area
        }
  }
}

    `,
  });
  return response.data.properties;
};

export default {
  getAllProperties,
  getAllPropertiesWithRoomNumber,
  getPropertiesByLevel
};
