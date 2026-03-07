import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@/components/atoms/ErrorBoundary';
import { Spinner } from '@/components/atoms';

const SearchPage = lazy(() =>
  import('@/components/pages/SearchPage').then((m) => ({
    default: m.SearchPage,
  })),
);

const NotFound = lazy(() =>
  import('@/components/pages/NotFound').then((m) => ({
    default: m.NotFound,
  })),
);

const SuspenseFallback = (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <Spinner />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={SuspenseFallback}>
        <SearchPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={SuspenseFallback}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
