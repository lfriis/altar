<h1 align="center" style="border-bottom: none;">the altar</h1>

<br/>

Before developing locally, ensure your machines `node` and `npm` versions matches the CI/CD requirements.

CI/CD Workflow:

-   npm - `v6.14.15`

AWS Elastic Beanstalk requires:

-   node - `v14.18.2`

<br/>

## Start Development Environment

> The following commands can be run in either 📁 **client** or 📁 **server**:

### 1. Install Dependencies

`npm run dependencies` installs all dependencies from `/client/package.json` and `/server/package.json`.

```terminal
$  npm run dependencies
```

### 2. Run Dev Command

This will deploy a local instance of the application

```terminal
$  npm run dev
```

The command above will run the app in the development mode.

-   Client deployed to: [http://localhost:3000](http://localhost:3000)
-   Server deployed to: [http://localhost:8080](http://localhost:8080)

<br/>

## Semantic Versioning (SEMVER) Structure:

All Marketplace applications follow a versioning scheme for using meaningful version numbers. Each pull request must have a semver operator within the **title**. Any direct commits to the `master` branch must have a semver operator in their **commit message**.

```
Ex. v1.0.2:

1   ->   major
2   ->   minor
2   ->   patch
```

### Operators:

| Operator                    | Description                                                                |
| --------------------------- | -------------------------------------------------------------------------- |
| `++major`                   | substantial changes that may break the existing code (UI/UX elements/API). |
| `++minor`                   | non-breaking changes (new feature)                                         |
| `++patch`                   | no interface changes (bug fixes)                                           |
| `++ignore`                  | bypasses the semantic versioning                                           |
| `++[major].[minor].[patch]` | overrides project release version                                          |

### Logic Example

```
Version  -           commit message       ->   SEMVER result

0.0.1    -   "{Commit message} ++patch"   ->   increment PATCH
0.0.2    -   "{Commit message} ++patch"   ->   increment PATCH
0.1.0    -   "{Commit message} ++minor"   ->   increment MINOR, reset PATCH, keep MAJOR
0.1.1    -   "{Commit message} ++patch"   ->   increment PATCH
1.0.0    -   "{Commit message} ++major"   ->   increment MAJOR, reset MINOR and PATCH
1.0.1    -   "{Commit message} ++patch"   ->   increment PATCH
1.0.1    -   "{Commit message} ++ignore"  ->   does not change version, but commits to codebase
3.0.0    -   "{Commit message} ++3.0.0"   ->   override MAJOR, MINOR, AND PATCH
```

<br/>

## Configure application environment variables

Navigate to `client` directory to edit `.env`

```terminal
├── 📁 client
│   ├── .env
```

Navigate to `server` directory to edit `.env`

```terminal
├── 📁 server
│   ├── .env
```
