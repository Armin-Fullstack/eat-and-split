export interface Friend {
  id: string;
  name: string;
  image: string;
  balance: number;
}

export interface FriendProps {
  friendObj: Friend;
  onSelection: (friend: Friend) => void;
  selectedFriend: Friend | null;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}
export interface FriendsListProps {
  friends: Friend[];
  onSelection: (friend: Friend) => void;
  selectedFriend: Friend | null;
}
export interface FormAddFriendProps {
  onAddFriend: (friend: Friend) => void;
}
export interface FormSplitBillProps {
  selectedFriend: Friend | null;
  onSplitBill: (value: number) => void;
}