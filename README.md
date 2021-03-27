# pg-plugin-query-hook

A small, lightweight, utility that monkey patches node-pg `Client::query` and `Pool::query` methods by adding a hook that can be used like an event emitter.

## Purpose
To "listen" to calls to the `query` methods and call all registered handlers with the query string and query params
the method was been called with. This was created as an easy way to log
all queries.

### What it is...
> It simply provides a hook into the `query` methods that will call all registered handlers with the args passed; use it how you wish if you think it may be useful.
### What it is not...
> It does not try and compile the query with the query parameters, as the method used by `node-pg` may change so there is no point in trying to replicate it.

## Install
### npm
````sh
npm install git@github.com:/BitShredder/pg-plugin-query-hook
````
### yarn
````sh
yarn add git@github.com:/BitShredder/pg-plugin-query-hook
````

## Usage
Require the package and pass a function for the hook...
````javascript
const { Client } = require('pg-plugin-query-hook')(console.log);

const client = new Client({ ...config });
await client.connect();

client.query('SELECT $1::text AS Name', ['Bob']);
````
Logs the following object to the console...
```javascript
{
    text: 'SELECT $1::text AS Name',
    params: ['Bob']
}
```
