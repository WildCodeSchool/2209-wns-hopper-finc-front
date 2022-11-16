import React, { useState } from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
} from "@apollo/client";
import { createUser } from "./graphql/createUser";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [doSignupMutation, { data, loading, error }] = useMutation(createUser);

  async function doSignup() {
    try {
      await doSignupMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      setEmail("");
      setPassword("");
    } catch {}
  }

  return (
    <>
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      <p>Email:</p>
      <input
        disabled={loading}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>Password:</p>
      <input
        disabled={loading}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={loading} onClick={doSignup}>
        Signup
      </button>
    </>
  );
}

function Main() {
  return (
    <div>
      <Signup />
    </div>
  );
}

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

export default App;
