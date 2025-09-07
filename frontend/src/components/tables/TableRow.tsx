import { formatAddress } from "../../utils/constants";
import type { User } from "../../utils/types";

const TableRow = ({ user, handleRowClick }: { user: User, handleRowClick: (user:User) => void }) => {
  return (
    <tr
      onClick={() => handleRowClick(user)}
      className="not-last:border-b border-border-100 h-[72px] cursor-pointer"
    >
      <td className="text-sm  font-medium text-app-200 text-left px-6 py-3">
        <p className="truncate">{user.name}</p>
      </td>
      <td className="text-sm  font-normal text-app-200 text-left px-6 py-3">
        <p className="truncate">{user.email}</p>
      </td>
      <td className="text-sm font-normal w-full text-app-200 text-left px-6 py-3 truncate">
        <p className="truncate">{formatAddress(user.address)}</p>
      </td>
    </tr>
  );
};

export default TableRow;
