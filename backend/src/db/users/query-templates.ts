export const selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;
export const selectUserWithAddressTemplate = `
  SELECT 
    u.id, u.name, u.username, u.email, u.phone,
    a.id as address_id, a.street, a.state, a.city, a.zipcode
  FROM users u
  LEFT JOIN addresses a ON u.id = a.user_id
  ORDER BY u.name
  LIMIT ? OFFSET ?
`;

export const selectUserAddressTemplate = `
  SELECT * FROM addresses WHERE user_id = ?
`;