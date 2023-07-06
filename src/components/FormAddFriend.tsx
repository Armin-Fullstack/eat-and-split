import { SyntheticEvent, useState } from "react";
import Button from "./Button";

import { FormAddFriendProps } from "../Type";

export default function FormAddFriend({
  onAddFriend,
}: FormAddFriendProps): JSX.Element {
  const [friendName, setAddFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  // submit form add friend
  function handleSubmit(e: SyntheticEvent): void {
    const id = crypto.randomUUID();
    e.preventDefault();
    // guard: avoid empty input
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
