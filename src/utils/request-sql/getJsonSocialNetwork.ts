export const getJsonSocialNetwork = (tableSocialNetwork: string, tableAvailableSocialNetwork: string): string =>
  `
    JSON_OBJECT(
     'id', ${tableSocialNetwork}.social_network_id,
     'name', ${tableAvailableSocialNetwork}.name,
     'profileUrl', ${tableSocialNetwork}.profile_url,
     'createdAt', ${tableSocialNetwork}.created_at,
     'updatedAt', ${tableSocialNetwork}.updated_at
    )
  `;

