export const replaceImageSQL = (tableProvider: string, tableImage: string): string => {
  return `
   CASE
     WHEN ${tableProvider}.image_id IS NOT NULL
       THEN JSON_OBJECT(
       'id', ${tableImage}.id,
       'src', ${tableImage}.src,
       'alt', ${tableImage}.alt,
       'createdAt', ${tableImage}.created_at,
       'updatedAt', ${tableImage}.updated_at
       )
     ELSE NULL
   END
  `;
}
