import { useEffect, useState } from "react";
import { AuthContext } from ".";
import { getAuthenticatedUser, refreshAccessToken } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { LazyLoader } from "@/components/LazyLoader";

export default function AuthProvider({ children }) {
  //set and save the accessToken to state memory.
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); //default value of logged in user is null
  // const [isAuthenticating, setIsAuthenticating] = useState(false);

  //Query to refresh accessToken on app start
  useQuery({
    queryKey: ["refresh_token"],
    queryFn: async () => {
      const res = await refreshAccessToken();
      //make api call to get new accessToken, then update it in our own accessToken state using setAccessToken setter function.
      if (res.status === 200) {
        const newAccessToken = res.data?.data?.accessToken;
        setAccessToken(newAccessToken);
        return res;
      } else {
        setAccessToken(null); //if res.status is not 200, remove the accessToken and force a logout.
        // setUser(null)
        return null;
      }
    },
    enabled: !accessToken, //ensure it runs only when we hdont have accessToken
    retry: false, //don't run again if the queryFn fails.
  });

  //fetch user data usng useQuery
  // useQuery({
  //   queryKey: ["auth_user"], //cache key for our api call.
  //   queryFn: async () => {
  //     setIsAuthenticating(true);
  //     const res = await getAuthenticatedUser(accessToken);
  //     if (res.status === 200) {
  //       setUser(res.data?.data);
  //       setIsAuthenticating(false);
  //       //hold the value from our res in User state.
  //       return res;
  //     }
  //     setIsAuthenticating(false);
  //     return null;
  //   },
  //   onError: (error) => {
  //     console.error("Error fetching user", error);
  //   },
  //   enabled: !!accessToken, //run only when we have the accessToken b
  // });

  // if (isAuthenticating) {
  //   return <LazyLoader />;
  // }

  //fetch user data usng useQuery

  const { isPending, data } = useQuery({
    queryKey: ["auth_user", accessToken],
    queryFn: () => getAuthenticatedUser(accessToken),
    onError: async (error) => {
      console.error("Error fetching user", error);
    },
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (data?.status === 200) {
      setUser(data?.data?.data);
    }
  }, [data?.data?.data, data?.status]);

  if (isPending && accessToken) {
    return <LazyLoader />;
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}
