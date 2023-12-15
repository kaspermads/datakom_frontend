// importing libraries
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import Router from 'next/router';

//creating a function to check if the user is authenticated
const withAuth = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    //using useEffect to check if the user is authenticated
    //using router to push the user to the login page if the user is not authenticated
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        Router.push('/home/login');
      }
    }, [isAuthenticated, isLoading]);
//using a spinner to show that the page is loading
    if (isLoading) {
      return <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
