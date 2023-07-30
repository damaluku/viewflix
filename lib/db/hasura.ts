/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function queryHasuraGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: {},
  token: string
) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );

  return await result.json();
}

async function isNewUser(token: string, issuer: string | null) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      issuer
      id
      publicAddress
    }
  }
`;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );

  // console.log({ issuer });

  return response?.data?.users?.length === 0;
}

async function createNewUser(token: string, metadata: any) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, publicAddress, email } = metadata;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    token
  );

  // console.log(response);
  return response;
}

async function findVideoIdByUserId(
  userId: string,
  videoId: string | string[] | undefined,
  token: string
) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      favourited
      id
      userId
      videoId
      watched
    }
  }
`;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "findVideoIdByUserId",
    { videoId, userId },
    token
  );

  return response?.data?.stats?.length > 0;
}

interface StatsProps {
  favourited: null | number;
  userId: string;
  watched: boolean;
  videoId: string | string[] | undefined;
}

async function insertStats(
  token: string,
  { favourited, userId, watched, videoId }: StatsProps
) {
  const operationsDoc = `
  mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    insert_stats_one(object: {
      favourited: $favourited, 
      userId: $userId, 
      watched: $watched, 
      videoId: $videoId
    }) {
        favourited
        userId
    }
  }
`;

  return await queryHasuraGraphQL(
    operationsDoc,
    "insertStats",
    { favourited, userId, watched, videoId },
    token
  );
}

async function updateStats(
  token: string,
  { favourited, userId, watched, videoId }: StatsProps
) {
  const operationsDoc = `
mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
  update_stats(
    _set: {watched: $watched, favourited: $favourited}, 
    where: {
      userId: {_eq: $userId}, 
      videoId: {_eq: $videoId}
    }) {
    returning {
      favourited,
      userId,
      watched,
      videoId
    }
  }
}
`;

  return await queryHasuraGraphQL(
    operationsDoc,
    "updateStats",
    { favourited, userId, watched, videoId },
    token
  );
}

export {
  queryHasuraGraphQL,
  isNewUser,
  createNewUser,
  findVideoIdByUserId,
  updateStats,
  insertStats,
};
