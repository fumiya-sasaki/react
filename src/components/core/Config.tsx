import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { getCategory } from '../../slices/category';
import { getConfig } from '../../slices/config';

export const Config = React.memo(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getConfig());
  }, [dispatch]);
  return null;
});

export default Config;