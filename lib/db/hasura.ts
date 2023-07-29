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

  console.log(response);
  return response;
}

export { queryHasuraGraphQL, isNewUser, createNewUser };
