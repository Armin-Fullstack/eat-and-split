import { SyntheticEvent, useState } from "react";

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

interface Friend {
  id: string;
  name: string;
  image: string;
  balance: number;
}

interface FriendProps {
  friendObj: Friend;
  onSelection: (friend: Friend) => void;
  selectedFriend: Friend | null;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}
interface FriendsListProps {
  friends: Friend[];
  onSelection: (friend: Friend) => void;
  selectedFriend: Friend | null;
}
interface FormAddFriendProps {
  onAddFriend: (friend: Friend) => void;
}
interface FormSplitBillProps {
  selectedFriend: Friend | null;
  onSplitBill: (value: number) => void;
}
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
  function handleSelection(friend: Friend): void {
    setSelectedFriend((currSelected) =>
      currSelected?.id === friend.id ? null : friend
    );
    setShowFormFriend(false);
  }
  function handleSplitBill(value: number) {
    setFriends((friends) =>
      friends.map((element) =>
        element.id === selectedFriend?.id
          ? { ...element, balance: element.balance + value }
          : element
      )
    );
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

function FriendsList({
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

function Friend({
  friendObj,
  onSelection,
  selectedFriend,
}: FriendProps): JSX.Element {
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

function Button({ onClick, children }: ButtonProps): JSX.Element {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }: FormAddFriendProps): JSX.Element {
  const [friendName, setAddFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  // submit form add friend
  function handleSubmit(e: SyntheticEvent): void {
    const id = crypto.randomUUID();
    e.preventDefault();
    if (!friendName || !imageUrl) return;
    const friendObj = {
      id,
      name: friendName,
      image: `${imageUrl}?=${id}`,
      balance: 0,
    };
    setAddFriendName("");
    setImageUrl("https://i.pravatar.cc/48");
    onAddFriend(friendObj);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAddFriendName(e.target.value)
        }
      />

      <label>Image URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setImageUrl(e.target.value)
        }
      />
      <Button>ADD</Button>
    </form>
  );
}

function FormSplitBill({
  selectedFriend,
  onSplitBill,
}: FormSplitBillProps): JSX.Element {
  const [bill, setBill] = useState<string | number>("");
  const [userExpense, setUserExpense] = useState<string | number>("");
  const friendExpense = bill ? +bill - +userExpense : "";
  const [payingBy, setPayingBy] = useState<string>("user");

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();
    if (!bill || !userExpense) return;
    onSplitBill(payingBy === "user" ? Number(friendExpense) : -friendExpense);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend?.name}</h2>
      <label>Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBill(Number(e.target.value))
        }
      />
      <label>Your expense</label>
      <input
        type="number"
        value={userExpense}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserExpense(
            Number(e.target.value) > +bill
              ? userExpense
              : Number(e.target.value)
          )
        }
      />
      <label>{selectedFriend?.name}'s expense</label>
      <input type="number" value={friendExpense} disabled />
      <label>Who is paying the bill?</label>
      <select
        value={payingBy}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setPayingBy(e.target.value)
        }
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend?.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

export default App;
