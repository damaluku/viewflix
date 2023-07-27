/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function queryHasuraGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: {}
) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhbWlhbiIsImlhdCI6MTY5MDE4NzYxNiwiZXhwIjoxNjkwNzkyNTEzLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjU1NDQwMDAwIn19.d6f4EZfvHB-_dQddI1o4tb1SWFLxjJ1YrDWpTWPv22c",
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

const operationsDoc = `
  query MyQuery {
    users {
      email
      name
      image
      id
    }
  }
  
  mutation MyMutation {
    insert_users(objects: {id: "123e4567-e89b-12d3-a456-426655440000", name: "damian", image: "https", emailVerified: "2014-08-30 02:17:02+00:00", email: "damaluku@gmail.com"}) {
      affected_rows
    }
  }
`;

function fetchMyQuery() {
  return queryHasuraGraphQL(operationsDoc, "MyQuery", {});
}

function executeMyMutation() {
  return queryHasuraGraphQL(operationsDoc, "MyMutation", {});
}

async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

startFetchMyQuery();

async function startExecuteMyMutation() {
  const { errors, data } = await executeMyMutation();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

startExecuteMyMutation();

export {
  startExecuteMyMutation,
  startFetchMyQuery,
  executeMyMutation,
  fetchMyQuery,
  queryHasuraGraphQL,
};
