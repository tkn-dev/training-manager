import React from 'react';
import { useFetch } from '../../../hooks/useFetch';

export default function Fetch({
  uri,
  httpMethod,
  requestBody,
  renderSuccess,
  renderLoading,
  renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
}) {
  const { data, loading, error } = useFetch(uri, httpMethod, requestBody);
  if (error) return renderError(error);
  if (loading) return renderLoading;
  if (data) return renderSuccess({ data });
}
