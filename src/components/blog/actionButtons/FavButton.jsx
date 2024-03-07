import React from "react";
import useAxios from "../../../hooks/useAxios";
import { isPresentId } from "../../../utils.js/isPresentId";
import FavIconFilled from "../../../assets/icons/heart-filled.svg";
import FavIcon from "../../../assets/icons/heart.svg";
import { useProfile } from "../../../hooks/useProfile";
import { actions } from "../../../actions";
import { motion } from "framer-motion";
export default function FavButton({ postId }) {
  const { api } = useAxios();
  const { user, dispatch } = useProfile();
  // find id of post in user favorites list
  let isFavourite = isPresentId(user?.favourites, postId);

  const handleFavorite = async () => {
    try {
      const res = await api.patch(`/blogs/${postId}/favourite`);
      // console.log(res);
      dispatch({ type: actions.profile.FAV_UPDATED, data: res.data });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <li>
      <motion.button
        onClick={handleFavorite}
        whileTap={{ scale: [0.9, 2, 1] }}
        className="relative"
      >
        {isFavourite ? (
          <div>
            <img src={FavIconFilled} alt="Favourite" />
            <motion.img
              transition={{ duration: 2 }}
              className="absolute top-0"
              src={FavIconFilled}
              alt="Favourite"
              animate={{
                translateX: Math.random() * 100,
                translateY: -100,
                opacity: [1, 1, 1, 0],
              }}
            />
            <motion.img
              transition={{ duration: 2 }}
              className="absolute top-0"
              src={FavIconFilled}
              alt="Favourite"
              animate={{
                translateX: Math.random() * -100,
                translateY: -100,
                opacity: [1, 1, 1, 0],
              }}
            />
            <motion.img
              transition={{ duration: 2 }}
              className="absolute top-0"
              src={FavIconFilled}
              alt="Favourite"
              animate={{
                translateX: Math.random() * 110,
                translateY: 20,
                opacity: [1, 1, 1, 0],
              }}
            />

            <motion.img
              transition={{ duration: 2 }}
              className="absolute top-0"
              src={FavIconFilled}
              alt="Favourite"
              animate={{
                translateX: Math.random() * -110,
                translateY: 20,
                opacity: [1, 1, 1, 0],
              }}
            />

            <motion.img
              transition={{ duration: 2 }}
              className="absolute top-0"
              src={FavIconFilled}
              alt="Favourite"
              animate={{
                translateX: Math.random() * 50,
                translateY: -120,
                opacity: [1, 1, 1, 0],
              }}
            />

            <motion.img
              transition={{ duration: 2 }}
              className="absolute top-0"
              src={FavIconFilled}
              alt="Favourite"
              animate={{
                translateX: Math.random() * -50,
                translateY: -50,
                opacity: [1, 1, 1, 0],
              }}
            />
          </div>
        ) : (
          <img src={FavIcon} alt="Favourite" />
        )}
      </motion.button>
    </li>
  );
}
