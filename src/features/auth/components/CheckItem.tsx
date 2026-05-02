import { JSX } from "react/jsx-runtime";

interface Props {
  label: string;
  ok: boolean;
}

const CheckItem = ({ label, ok }: Props): JSX.Element => {
  return (
    <div className="flex items-center gap-1">
      <span className={ok ? "text-cyan-400" : "text-gray-500"}>
        {ok ? "✔" : "○"}
      </span>
      <span className={ok ? "text-white" : "text-gray-500"}>
        {label}
      </span>
    </div>
  );
};

export default CheckItem;