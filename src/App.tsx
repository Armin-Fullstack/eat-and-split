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

function App(): JSX.Element {
  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList />
      </div>
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
      {friendObj.balance < 0 && <p className="red">You own {friendObj.name} {Math.abs(friendObj.balance)}</p>}
      {friendObj.balance > 0 && <p className="green">{friendObj.name} owns you {friendObj.balance}</p>}
      {friendObj.balance === 0 && <p>You and {friendObj.name} are even</p>}
      <button className="button">Select</button>
    </li>
  )
}
export default App;