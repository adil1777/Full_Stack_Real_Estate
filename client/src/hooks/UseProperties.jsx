import React from 'react';
import { useQuery } from 'react-query';
import { getAllProperties } from '../utils/api'; // Import the function from your API file

const useProperties = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    'allProperties',
    getAllProperties,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProperties;
