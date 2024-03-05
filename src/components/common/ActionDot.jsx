import ThreeDotSvg from "../../assets/icons/3dots.svg";
import EditSvg from "../../assets/icons/edit.svg";
import DeleteSvg from "../../assets/icons/delete.svg";
export default function ActionDot() {
  return (
    <div className="absolute right-0 top-0">
      <button>
        <img src={ThreeDotSvg} alt="3dots of Action" />
      </button>

      {/* <!-- Action Menus Popup --> */}
      <div className="action-modal-container hidden">
        <button className="action-menu-item hover:text-lwsGreen">
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
