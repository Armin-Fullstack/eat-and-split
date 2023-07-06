import Button from "./Button";
import { FriendProps } from "../Type";

export default function Friend({
  friendObj,
  onSelection,
  selectedFriend,
}: FriendProps): JSX.Element {
  // check correct friend object
  const isSelected = friendObj.id === selectedFriend?.id;
  return (
    <li className={`${isSelected && "selected"}`}>
      <img src={friendObj.image} alt={friendObj.name} />
      <h3>{friendObj.name}</h3>
      {friendObj.balance < 0 && (
        <p className="red">
          You own {friendObj.name} ${Math.abs(friendObj.balance)}
        </p>
      )}
      {friendObj.balance > 0 && (
        <p className="green">
          {friendObj.name} owns you ${friendObj.balance}
        </p>
      )}
      {friendObj.balance === 0 && <p>You and {friendObj.name} are even</p>}
      <Button onClick={() => onSelection(friendObj)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
