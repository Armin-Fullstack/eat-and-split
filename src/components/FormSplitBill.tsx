import { SyntheticEvent, useState } from "react";
import Button from "./Button";

import { FormSplitBillProps } from "../Type";

export default function FormSplitBill({
  selectedFriend,
  onSplitBill,
}: FormSplitBillProps): JSX.Element {
  const [bill, setBill] = useState<string | number>("");
  const [userExpense, setUserExpense] = useState<string | number>("");
  // driving state
  const friendExpense = bill ? +bill - +userExpense : "";
  const [payingBy, setPayingBy] = useState<string>("user");

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();
    // guard: avoid empty input
    if (!bill || !userExpense) return;
    //pass value to handle split bill function
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
