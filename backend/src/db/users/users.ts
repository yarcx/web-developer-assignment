import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUserAddressTemplate,
  selectUsersTemplate,
  selectUserWithAddressTemplate,
} from "./query-templates";
import { Address, User, UserWithAddress } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(selectCountOfUsersTemplate, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.count);
    });
  });

export const getUsersWithAddress = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
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

export const getUsers = (pageNumber: number, pageSize: number): Promise<UserWithAddress[]> =>
  new Promise((resolve, reject) => {
    connection.all<UserWithAddress>(
      selectUserWithAddressTemplate,
      [pageSize, pageNumber * pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }
        const usersWithAddresses = results?.map((row) => ({
          id: row?.id,
          name: row?.name,
          username: row?.username,
          email: row?.email,
          phone: row?.phone,
          address: {
            id: row?.address?.id,
            user_id: row?.address?.id,
            street: row?.address?.street,
            state: row?.address?.state,
            city: row?.address?.city,
            zipcode: row?.address?.zipcode,
          },
        }));
          
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
