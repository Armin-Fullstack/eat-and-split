import Friend from "./Friend";
import { FriendsListProps } from "../Type";

export default function FriendsList({
  friends,
  onSelection,
  selectedFriend,
}: FriendsListProps): JSX.Element {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friendObj={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
