import { useState } from "react";
import FriendsList from "./components/FriendsList";
import FormAddFriend from "./components/FormAddFriend";
import Button from "./components/Button";
import FormSplitBill from "./components/FormSplitBill";

import { Friend } from "./Type";

const initialFriends = [
  {
    id: "118836",
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: "933372",
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: "499476",
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App(): JSX.Element {
  const [showFormFriend, setShowFormFriend] = useState<boolean>(false);
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  //show add friend form
  function handleShowForm(): void {
    setShowFormFriend((show) => !show);
  }

  // add friend function
  function handleAddFreind(friend: Friend) {
    setFriends((friends) => [...friends, friend]);
    setShowFormFriend(false);
  }
  // handle select button
  function handleSelection(friend: Friend): void {
    setSelectedFriend((currSelected) =>
      currSelected?.id === friend.id ? null : friend
    );
    setShowFormFriend(false);
  }
  // handle split bill button
  function handleSplitBill(value: number) {
    setFriends((friends) =>
      // update friends state(balance property)
      friends.map((element) =>
        element.id === selectedFriend?.id
          ? { ...element, balance: element.balance + value }
          : element
      )
    );
    // close split bill form
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showFormFriend && <FormAddFriend onAddFriend={handleAddFreind} />}
        <Button onClick={handleShowForm}>
          {showFormFriend ? "close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
export default App;
