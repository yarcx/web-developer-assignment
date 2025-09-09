import { useNavigate } from "react-router-dom";
import type { FC } from "react";

import Loader from "../common/Loader";
import type { User } from "../../utils/types";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

const UserTables: FC<{ usersLists?: User[]; isLoadingUsersList: boolean }> = ({
  usersLists,
  isLoadingUsersList,
}) => {
  const navigate = useNavigate();
  const handleRowClick = (user: User) => {
      navigate(`/${user.id}?email=${user?.email}&name=${user?.name}`);
  };
  const isEmptyTableData = !isLoadingUsersList && !usersLists?.length;
  return (
    <div className="rounded-lg border border-border-100 overflow-x-auto">
      <table className="w-full table-auto md:table-fixed">
        <TableHeader />

        <tbody>
          {isLoadingUsersList && (
            <tr>
              <td colSpan={3} className="text-center">
                <div className="flex items-center justify-center min-h-[288px]">
                  <Loader />
                </div>
              </td>
            </tr>
          )}
          {isEmptyTableData ? (
            <tr>
              <td colSpan={3} className="text-center">
                <div className="flex items-center justify-center min-h-[288px]">
                  You don't have any data yet
                </div>
              </td>
            </tr>
          ) : (
            usersLists?.map((user) => (
              <TableRow key={user?.id} user={user} handleRowClick={handleRowClick} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTables;
