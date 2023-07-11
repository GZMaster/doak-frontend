let backendURL: string | undefined;

if (process.env.NODE_ENV === "production") {
  backendURL = process.env.REACT_APP_BACKEND_URL;
} else if (process.env.NODE_ENV === "development_test") {
  backendURL = process.env.REACT_APP_BACKEND_TEST_URL;
} else {
  backendURL = process.env.REACT_APP_BACKEND_LIVE_URL;
}

export default backendURL;
