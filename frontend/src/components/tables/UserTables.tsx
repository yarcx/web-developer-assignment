import { useNavigate } from "react-router-dom";
import type { FC } from "react";

import { USER_TABLE_HEADER } from "../../utils/constants";
import Loader from "../common/Loader";
import type { User } from "../../utils/types";

const UserTables: FC<{ usersLists?: User[]; isLoadingUsersList: boolean }> = ({
  usersLists,
  isLoadingUsersList,
}) => {
    const navigate = useNavigate();
    const isEmptyTableData = !isLoadingUsersList && !usersLists?.length;
  return (
    <div className="rounded-lg border border-border-100 overflow-x-auto">
      <table className="w-full table-auto md:table-fixed">
        <thead>
          <tr>
            {USER_TABLE_HEADER.map((header) => (
              <th
                key={header}
                className={`text-xs font-medium text-app-200 text-left px-6 py-3 ${
                  header === USER_TABLE_HEADER[0]
                    ? "w-[22%]"
                    : header === USER_TABLE_HEADER[2]
                    ? "w-[392px]"
                    : "w-auto"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

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
              <tr
                key={user.email}
                onClick={() => {
                  navigate("/" + user.id, {
                    state: {
                      ...user,
                    },
                  });
                }}
                className="not-last:border-b border-border-100 h-[72px] cursor-pointer"
              >
                <td className="text-sm  font-medium text-app-200 text-left px-6 py-3">
                  <p className="truncate">{user.name}</p>
                </td>
                <td className="text-sm  font-normal text-app-200 text-left px-6 py-3">
                  <p className="truncate">{user.email}</p>
                </td>
                <td className="text-sm font-normal w-full text-app-200 text-left px-6 py-3 overflow-hidden">
                  <p className="truncate w-[392px]">{user.username}</p>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTables;
