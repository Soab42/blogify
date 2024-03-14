import { useEffect, useReducer } from "react";
import { actions } from "../actions";
import { ProfileContext } from "../context";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { initialState, profileReducer } from "../reducers/ProfileReducer";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { api } = useAxios();
  const { auth } = useAuth();
  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchProfile();
  }, [auth?.user?.id]);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
