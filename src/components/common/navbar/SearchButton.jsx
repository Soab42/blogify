import { AnimatePresence } from "framer-motion";
import SearchIcon from "../../../assets/icons/search.svg";
import Portal from "../../../Portal";
import Search from "../../page/Search";
import { useRef } from "react";
export default function SearchButton() {
  const modalRef = useRef();

  return (
    <li>
      <button
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => modalRef.current.open()}
      >
        <img src={SearchIcon} alt="Search" />
        <span>Search</span>
      </button>
      <AnimatePresence>
        <Portal>
          <Search ref={modalRef} />
        </Portal>
      </AnimatePresence>
    </li>
  );
}
