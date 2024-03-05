import { actions } from "../actions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  popularPost: [],
  popular_loading: false,
  popular_error: null,
  hasMore: true,
};

const postReducer = (state, action) => {
  const total = action?.data?.page * action?.data?.limit;

  const hasMore = action?.data?.total > total;

  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.post.DATA_FETCHED: {
      return {
        ...state,
        posts: action.data,
        loading: false,
        hasMore,
      };
    }
    case actions.post.DATA_FETCHED_MORE: {
      const newPosts = action.data.blogs.filter(
        (blog) => !state.posts.some((post) => post.id === blog.id)
      );
      return {
        ...state,
        posts: [...state.posts, ...newPosts],
        loading: false,
        hasMore,
      };
    }

    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.post.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.data],
      };
    }

    case actions.post.POST_DELETED: {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((item) => item.id !== action.data),
      };
    }

    case actions.post.DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }
    case actions.post.POPULAR_DATA_FETCHING: {
      return {
        ...state,
        popular_loading: true,
      };
    }

    case actions.post.POPULAR_DATA_FETCHED: {
      return {
        ...state,
        popularPost: action.data,
        popular_loading: false,
      };
    }

    case actions.post.POPULAR_DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        popular_error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, postReducer };
