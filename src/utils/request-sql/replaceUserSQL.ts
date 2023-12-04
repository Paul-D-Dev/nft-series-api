import { replaceImageSQL } from "./replaceImageSQL";

export const replaceUserSQL = (tableUser: string, tableUserImage: string): string => {
  return `
    JSON_OBJECT(
     'id', ${tableUser}.id,
     'name', ${tableUser}.name,
     'nameSeo', ${tableUser}.name_seo,
     'bio', ${tableUser}.bio,
     'isVerified', ${tableUser}.is_verified,
     'contractAddress', ${tableUser}.contract_address,
     'image', ${replaceImageSQL(tableUser, tableUserImage)},
     'createdAt', ${tableUser}.created_at,
     'updatedAt', ${tableUser}.updated_at
     )
  `
}
