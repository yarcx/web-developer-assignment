"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUserAddressTemplate = exports.selectUserWithAddressTemplate = exports.selectCountOfUsersTemplate = exports.selectUsersTemplate = void 0;
exports.selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;
exports.selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;
exports.selectUserWithAddressTemplate = `
  SELECT 
    u.id, u.name, u.username, u.email, u.phone,
    a.id as address_id, a.street, a.state, a.city, a.zipcode
  FROM users u
  LEFT JOIN addresses a ON u.id = a.user_id
  ORDER BY u.name
  LIMIT ? OFFSET ?
`;
exports.selectUserAddressTemplate = `
  SELECT * FROM addresses WHERE user_id = ?
`;
