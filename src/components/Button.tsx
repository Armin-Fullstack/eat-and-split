import { ButtonProps } from "../Type";

export default function Button({ onClick, children }: ButtonProps): JSX.Element {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
