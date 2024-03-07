import ThreeDotSvg from "../../assets/icons/3dots.svg";
import EditSvg from "../../assets/icons/edit.svg";
import DeleteSvg from "../../assets/icons/delete.svg";
import useActive from "../../hooks/useActive";
export default function ActionDot() {
  const [active, handleActive] = useActive();
  return (
    <div className="absolute right-0 top-0">
      <button onClick={handleActive}>
        <img src={ThreeDotSvg} alt="3dots of Action" />
      </button>

      {/* <!-- Action Menus Popup --> */}
      <div className={`action-modal-container ${active ? "" : "hidden"}`}>
        <button className="action-menu-item hover:text-green-400">
          <img src={EditSvg} alt="Edit" />
          Edit
        </button>
        <button className="action-menu-item hover:text-red-500">
          <img src={DeleteSvg} alt="Delete" />
          Delete
        </button>
      </div>
    </div>
  );
}
