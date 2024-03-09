import { actions } from "../actions";

const initialState = {
  posts: [],
  loading: false,
  post: {},
  error: null,
  hasMore: true,
  isEdit: false,
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

    case actions.post.POST_EDITING: {
      return {
        ...state,
        loading: false,
        isEdit: true,
      };
    }

    case actions.post.DATA_EDITED: {
      return {
        ...state,
        isEdit: false,
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, postReducer };
