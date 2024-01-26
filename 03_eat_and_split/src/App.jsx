import { Children, useState } from "react";

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
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [listOfFriends, setListOfFriends] = useState(initialFriends);

  const [selectedFriend, setSelectedFriend] = useState(false);

  function handleSplitBill(expense) {
    setListOfFriends((listOfFriends) =>
      listOfFriends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance - expense }
          : friend
      )
    );
  }

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    setListOfFriends((listOfFriends) => [...listOfFriends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(id) {
    if (id === selectedFriend.id) setSelectedFriend(false);
    else
      setSelectedFriend(...listOfFriends.filter((friend) => friend.id === id));

    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={listOfFriends}
          onFriendSelect={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill friend={selectedFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}

function FriendsList({ friends, onFriendSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onFriendSelect={onFriendSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onFriendSelect, selectedFriend }) {
  const isSelected = friend.id === selectedFriend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="" />
      <h3>{friend.name}</h3>
      <Button onClick={() => onFriendSelect(friend.id)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const friend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(friend);
  }
  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="">🧑‍🤝‍🧑Friend name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="">🖼️Image URL:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBill({ friend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [whoPay, setWhoPay] = useState("you");

  function handleSubmit(e) {
    e.preventDefault();

    if (whoPay === "friend") {
      onSplitBill(yourExpense);
    } else {
      onSplitBill(yourExpense - bill);
    }
  }

  return (
    <form
      action=""
      className="form-split-bill"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2>Split bill with {friend.name}</h2>
      <label htmlFor="">💵 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label htmlFor="">🧑‍🦱Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > bill ? yourExpense : Number(e.target.value)
          )
        }
      />
      <label htmlFor="">🙍‍♀️{friend.name}'s expense</label>
      <input type="text" disabled value={bill - yourExpense} />
      <label htmlFor="">🤑 Who is paying the bill</label>
      <select
        name=""
        id=""
        value={whoPay}
        onChange={(e) => setWhoPay(e.target.value)}
      >
        <option value="you">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
