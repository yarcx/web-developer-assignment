import { useQuery } from "@tanstack/react-query";
import { getUserLists, getUsersCount } from "../services/user-requests";
import type { UserWithAddress } from "../utils/types";
import { QUERY_KEYS } from "../utils/constants";
import { useState } from "react";

const useUsers = () => {
  const [page, setPage] = useState<number>(1);
  const usersPerPage = 4;
  const {
    data: usersList,
    error: userListsError,
    isLoading: isLoadingUsersList,
  } = useQuery<UserWithAddress[]>({
    queryKey: [QUERY_KEYS.GET_USERS_LISTS, page],
    queryFn: () => getUserLists({ pageNumber: `${page - 1}`, pageSize: String(usersPerPage) }),
  });

  const {
    data: usersListCount,
    error: usersListCountError,
    isLoading: isLoadingUsersListCount,
  } = useQuery<number>({
    queryKey: [QUERY_KEYS.GET_USERS_COUNTS],
    queryFn: () => getUsersCount(),
  });

    const totalPages = usersListCount ? Math.ceil(usersListCount / usersPerPage) : 1;
    
  const gotoPrev = () => {
    setPage((prev) => {
      if (prev <= 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  const gotoNext = () => {
    setPage((prev) => {
      if (prev >= totalPages - 1) {
        return totalPages - 1;
      }
      return prev + 1;
    });
  };

  const gotoPage = (pageNumber: number) => {
    if (!isNaN(pageNumber)) {
      if (pageNumber < 1) {
        setPage(1);
      } else if (pageNumber >= totalPages) {
        setPage(totalPages - 1);
      } else {
        setPage(pageNumber);
      }
    }
  };

  return {
    usersList,
    userListsError,
    isLoadingUsersList,
    usersListCount,
    usersListCountError,
    isLoadingUsersListCount,
    currentPage: page,
    gotoPrev,
    gotoNext,
    gotoPage,
  };
};

export default useUsers;
