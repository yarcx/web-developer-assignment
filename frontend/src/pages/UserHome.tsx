import UserTables from "../components/tables/UserTables";
import useUsers from "../hooks/useUsers";
import Pagination from "../components/common/Pagination";

const UserHome = () => {
  const {
    usersList,
    userListsError,
    isLoadingUsersList,
    currentPage,
    gotoPrev,
    gotoNext,
    gotoPage,
  } = useUsers();
  console.log({ usersList, userListsError, isLoadingUsersList });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-medium text-6xl text-app-100">Users</h1>

      <UserTables usersLists={usersList} isLoadingUsersList={isLoadingUsersList} />

      <Pagination
        currentPage={currentPage}
        gotoPrev={gotoPrev}
        gotoNext={gotoNext}
        gotoPage={gotoPage}
      />
    </div>
  );
};

export default UserHome;
