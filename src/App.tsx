
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

interface FriendProps {
  friendObj: {
    id: number;
    name: string;
    image: string;
    balance: number
  }
}

interface ButtonProps {
  children: React.ReactNode
}

function App(): JSX.Element {
  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend/>
        <Button>Add friend</Button>
      </div>
      <FormSplitBill/>
    </div>
  )
}

function FriendsList(): JSX.Element {
  return(
    <ul>{initialFriends.map(friend => <Friend friendObj = {friend} key={friend.id}/>)}</ul>
  )
}

function Friend({friendObj}: FriendProps): JSX.Element {
  return(
    <li>
      <img src={friendObj.image} alt={friendObj.name} />
      <h3>{friendObj.name}</h3>
      {friendObj.balance < 0 && <p className="red">You own {friendObj.name} ${Math.abs(friendObj.balance)}</p>}
      {friendObj.balance > 0 && <p className="green">{friendObj.name} owns you ${friendObj.balance}</p>}
      {friendObj.balance === 0 && <p>You and {friendObj.name} are even</p>}
      <Button>Select</Button>
    </li>
  )
}

function Button({children}: ButtonProps): JSX.Element {
  return(
    <button className="button">{children}</button>
  )
}

function FormAddFriend(): JSX.Element {
  return(
    <form className="form-add-friend">
      <label>Friend name</label>
      <input type="text" />

      <label>Image URL</label>
      <input type="text" />
      <Button>ADD</Button>
    </form>
  )
}

function FormSplitBill(): JSX.Element {
  return(
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>Bill value</label>
      <input type="text" />
      <label>Your expense</label>
      <input type="text" />
      <label>X's expense</label>
      <input type="text" disabled/>
      <label>Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  )
}

export default App;