import { Children } from "react";

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

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={initialFriends} />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt="" />
      <h3>{friend.name}</h3>
      <Button>Select</Button>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You owes {friend.name} R${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && <p>You and your friend are even</p>}
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label htmlFor="">🧑‍🤝‍🧑Friend name:</label>
      <input type="text" />
      <label htmlFor="">🖼️Image URL:</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormSplitBill() {
  return (
    <form action="" className="form-split-bill">
      <h2>Split bill with X</h2>
      <label htmlFor="">💵 Bill value</label>
      <input type="text" />
      <label htmlFor="">🧑‍🦱Your expense</label>
      <input type="text" />
      <label htmlFor="">🙍‍♀️X's expense</label>
      <input type="text" disabled />
      <label htmlFor="">🤑 Who is paying the bill</label>
      <select name="" id="">
        <option value="you">You</option>
        <option value="friend">X</option>
      </select>
      <Button>
        Split <b></b>ill
      </Button>
    </form>
  );
}
