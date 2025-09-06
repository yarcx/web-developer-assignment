import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUserAddressTemplate,
  selectUsersTemplate,
  selectUserWithAddressTemplate,
} from "./query-templates";
import { Address, User, UserWithAddress, UserWithAddressResponse } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(selectCountOfUsersTemplate, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.count);
    });
  });

export const getUsersWithAddress = (pageNumber: number, pageSize: number): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<User>(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });

export const getUsers = (pageNumber: number, pageSize: number): Promise<UserWithAddressResponse[]> =>
  new Promise((resolve, reject) => {
    connection.all<UserWithAddress>(
      selectUserWithAddressTemplate,
      [pageSize, pageNumber * pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }
        const usersWithAddresses = results?.map((row) => {
          return {
            id: row?.id,
            name: row?.name,
            username: row?.username,
            email: row?.email,
            phone: row?.phone,
            address: {
              id: row?.address_id,
              user_id: row?.id,
              street: row?.street,
              state: row?.state,
              city: row?.city,
              zipcode: row?.zipcode,
            },
          };
        });

        resolve(usersWithAddresses);
      }
    );
  });

export const getUserAddress = (userId: string): Promise<Address | null> =>
  new Promise((resolve, reject) => {
    connection.get<Address>(selectUserAddressTemplate, [userId], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result || null);
    });
  });
