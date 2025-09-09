"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAddress = exports.getUsers = exports.getUsersWithAddress = exports.getUsersCount = void 0;
const connection_1 = require("../connection");
const query_templates_1 = require("./query-templates");
const getUsersCount = () => new Promise((resolve, reject) => {
    connection_1.connection.get(query_templates_1.selectCountOfUsersTemplate, (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results.count);
    });
});
exports.getUsersCount = getUsersCount;
const getUsersWithAddress = (pageNumber, pageSize) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_templates_1.selectUsersTemplate, [pageNumber * pageSize, pageSize], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results);
    });
});
exports.getUsersWithAddress = getUsersWithAddress;
const getUsers = (pageNumber, pageSize) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_templates_1.selectUserWithAddressTemplate, [pageSize, pageNumber * pageSize], (error, results) => {
        if (error) {
            reject(error);
        }
        const usersWithAddresses = results === null || results === void 0 ? void 0 : results.map((row) => {
            return {
                id: row === null || row === void 0 ? void 0 : row.id,
                name: row === null || row === void 0 ? void 0 : row.name,
                username: row === null || row === void 0 ? void 0 : row.username,
                email: row === null || row === void 0 ? void 0 : row.email,
                phone: row === null || row === void 0 ? void 0 : row.phone,
                address: {
                    id: row === null || row === void 0 ? void 0 : row.address_id,
                    user_id: row === null || row === void 0 ? void 0 : row.id,
                    street: row === null || row === void 0 ? void 0 : row.street,
                    state: row === null || row === void 0 ? void 0 : row.state,
                    city: row === null || row === void 0 ? void 0 : row.city,
                    zipcode: row === null || row === void 0 ? void 0 : row.zipcode,
                },
            };
        });
        resolve(usersWithAddresses);
    });
});
exports.getUsers = getUsers;
const getUserAddress = (userId) => new Promise((resolve, reject) => {
    connection_1.connection.get(query_templates_1.selectUserAddressTemplate, [userId], (error, result) => {
        if (error) {
            reject(error);
        }
        resolve(result || null);
    });
});
exports.getUserAddress = getUserAddress;
