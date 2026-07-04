import React, { useEffect, useContext, useState } from 'react';

const ErrorContext = React.createContext<any>({});

function ErrorProvider({ children }:{children:any}) {
  const [errors, setErrors] = useState<any>([]);

  const logError = (errorMessage:any , source:any , lineNumber:any , columnNumber:any , error:any) => {
    setErrors([...errors , { errorMessage, source, lineNumber, columnNumber, error }]);
  };

  useEffect(() => {
    const originalWindowError = window.onerror;

    window.onerror = function(errorMessage, source, lineNumber, columnNumber, error) {
 
      logError(errorMessage, source, lineNumber, columnNumber, error);

      if (originalWindowError) {
        return originalWindowError(errorMessage, source, lineNumber, columnNumber, error);
      }

      return false;
    };

    return () => {
      window.onerror = originalWindowError;
    };
  }, [logError]);

  return (
    <ErrorContext.Provider value={{ errors, logError }}>
      {children}
    </ErrorContext.Provider>
  );
}

function useError() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within a ErrorProvider');
  }

  return context;
}

export { ErrorProvider, useError };