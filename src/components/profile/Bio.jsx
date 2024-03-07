import EditIcon from "../../assets/icons/edit.svg";
import { useProfile } from "../../hooks/useProfile";

export default function Bio({ info }) {
  const { isUser } = useProfile(info);

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        <p className="leading-[188%] text-gray-400 lg:text-lg">{info?.bio}</p>
      </div>
      {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}

      {isUser && (
        <button className="flex-center h-7 w-7 rounded-full">
          <img src={EditIcon} alt="Edit" />{" "}
        </button>
      )}
    </div>
  );
}
