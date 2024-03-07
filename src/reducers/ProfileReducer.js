import { actions } from "../actions";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }

    case actions.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.profile.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }

    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.avatar,
        },
      };
    }
    case actions.profile.FAV_UPDATED: {
      const userFavData = state.user.favourites;

      if (action.data.isFavourite) {
        userFavData.push({
          id: action.data.id,
          tags: action.data.tags,
          title: action.data.title,
        });
      } else {
        const index = state.user.favourites.findIndex(
          (item) => item.id === action.data.id
        );
        userFavData.splice(index, 1);
      }

      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          favourites: userFavData,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, profileReducer };
