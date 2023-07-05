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
  friendObj: Friend
}

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
interface FriendsListProps {
  friends: Friend[]
}
interface FormAddFriendProps {
  onAddFriend: (friend: Friend) => void
}
function App(): JSX.Element {
  const [showFormFriend, setShowFormFriend] = useState<boolean>(false);
  const [friends, setFriends] = useState<Friend[]>(initialFriends)

  //show add friend form
  function handleShowForm(): void {
    setShowFormFriend(show => !show)
  }

  // add friend function
  function handleAddFreind(friend: Friend) {
    setFriends(friends => [...friends , friend])
    setShowFormFriend(false)
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showFormFriend && <FormAddFriend onAddFriend={handleAddFreind}/>}
        <Button onClick={handleShowForm}>{showFormFriend ? "close" : "Add friend"}</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({friends}: FriendsListProps): JSX.Element {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friendObj={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friendObj }: FriendProps): JSX.Element {
  return (
    <li>
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
      <Button>Select</Button>
    </li>
  );
}

function Button({ onClick , children }: ButtonProps): JSX.Element {
  return <button className="button" onClick={onClick}>{children}</button>;
}

function FormAddFriend({onAddFriend}: FormAddFriendProps): JSX.Element {
  const [friendName , setAddFriendName] = useState("")
  const [imageUrl , setImageUrl] = useState("https://i.pravatar.cc/48")

  // submit form add friend
  function handleSubmit(e: SyntheticEvent): void {
    const id = crypto.randomUUID()
    e.preventDefault()
    if(!friendName || !imageUrl) return
    const friendObj = {id, name: friendName, image: `${imageUrl}?=${id}` , balance: 0}
    setAddFriendName("")
    setImageUrl("https://i.pravatar.cc/48")
    onAddFriend(friendObj)
  }
  return ( 
    <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>Friend name</label>
    <input type="text" value={friendName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddFriendName(e.target.value)}/>

    <label>Image URL</label>
    <input type="text" value={imageUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}/>
    <Button>ADD</Button>
  </form>
)
}

function FormSplitBill(): JSX.Element {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>Bill value</label>
      <input type="text" />
      <label>Your expense</label>
      <input type="text" />
      <label>X's expense</label>
      <input type="text" disabled />
      <label>Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

export default App;
