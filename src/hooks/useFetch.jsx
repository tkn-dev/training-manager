import React, { useCallback, useEffect, useState } from 'react';

export function useFetch(uri, httpMethod, requestBody) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const execFetch = useCallback(() => {
    if (!uri || !httpMethod) return;

    const option = {
      method: httpMethod,
    };
    if (requestBody) {
      option.headers = {
        'Content-Type': 'application/json',
      };
      option.body = requestBody;
    }

    fetch(uri, option)
      .then((data) => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  });

  useEffect(() => {
    execFetch;
  }, [uri]);

  return {
    loading,
    data,
    error,
  };
}
