import { Breakpoint, Theme, useMediaQuery } from '@mui/material';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './slices/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSize = (size: number | Breakpoint = 'sm'): boolean => {
  const isMobileSize = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(size)
  );
  return isMobileSize;
};