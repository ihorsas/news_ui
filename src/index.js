import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:8889/graphql',
    cache: new InMemoryCache()
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);