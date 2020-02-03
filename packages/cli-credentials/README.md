[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/cli-credentials.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/cli-credentials)

# Credential Management for WCH CLI

Utility library to manage credentials for use with WCH CLI projects.

## Installation

Local install for use from an [NPM script](https://docs.npmjs.com/misc/scripts):

```bash
npm install --save-dev @acoustic-content-sdk/cli-credentials
```

## Class documentation

Refer to the [API documentation](./markdown/cli-credentials.md).

## Credential Management

The credentials used to access a tenant can be stored securely on your development machine. Depending on the operating system, use one of the following options.

### Credential Management (Windows)

Under Windows use the [Credential Manager](https://support.microsoft.com/en-us/help/4026814/windows-accessing-credential-manager) to store your credentials for WCH. You can start the credential manager by navigating to `Control Panel\User Accounts and Family Safety\Credential Manager`. Create a new `Generic Credential`. As `Internet or network address` choose the API URL from WCH, make sure end the URL with a trailing slash. Enter your WCH username and password and hit `OK`.

### Credential Management (macOS)

Under macOS use the [Keychain Access](https://support.apple.com/en-gb/guide/keychain-access/what-is-keychain-access-kyca1083/mac) to store your credentials for WCH. Use the API URL from WCH as the name of the credenitial, this will automatically make it an `internet` credential. Enter your WCH username and password and hit `OK`.

### Credential Management (Linux)

Under Linux the credentials are read from the `${home}/.ibm-wch-sdk-cli/.credentials` file. Use the `store credentials` command to securely persist the credentials in this file.

## Credential Storage

Stores a user name and password WCH in the file `${home}/.ibm-wch-sdk-cli/.credentials`. The password is encrypted using the private SSH key found in `${home}/.ssh/id_rsa`. This command has been designed to work in a `Unix` environment, but it will also for for `Windows` provided an SSH key exists at the specified location. **Disclaimer** this method requires password free access to the SSH key.

### Note

If the file `${home}/.ssh/id_rsa` does not exist, you can create one using the following shell command:

```bash
ssh-keygen -t rsa -q -f ~/.ssh/id_rsa -P ""
```

## Usage

The module exports the following functions to work with credentials:

### wchGetCredentials

Reads the credentials for the given [API URL](https://developer.ibm.com/customer-engagement/tutorials/getting-started-api-javascript/).

```typescript
function wchGetCredentials(
  aApiUrl: string,
  aOptions?: Options
): Promise<Credentials>;
```

- `aApiUrl`: the [API URL](https://developer.ibm.com/customer-engagement/tutorials/getting-started-api-javascript/) for your tenant
- `aOptions`: optional options to control logging

### wchStoreCredentials

Stores the given credentials in the `${home}/.ibm-wch-sdk-cli/.credentials` file in every environment (including Windows).

```typescript
function wchStoreCredentials(
  aWchToolsOptions: WchToolsOptions,
  aOptions?: Options
): Promise<string>;
```

- `aWchToolsOptions`: credentials and [API URL](https://developer.ibm.com/customer-engagement/tutorials/getting-started-api-javascript/)
- `aOptions`: optional options to control logging

### wchRemoveCredentials

Removes the credentials for the given [API URL](https://developer.ibm.com/customer-engagement/tutorials/getting-started-api-javascript/) from the `${home}/.ibm-wch-sdk-cli/.credentials` file in every environment (including Windows).

```typescript
function wchRemoveCredentials(
  aApiUrl: string,
  aOptions?: Options
): Promise<string>;
```

- `aApiUrl`: the [API URL](https://developer.ibm.com/customer-engagement/tutorials/getting-started-api-javascript/) for your tenant
- `aOptions`: optional options to control logging

### isValidPassword

Checks if a password is valid syntactically

```typescript
function isValidPassword(aValue: any): aValue is string;
```

### isValidUrl

Checks if a URL is valid syntactically

```typescript
function isValidUrl(aValue: any): aValue is string;
```

### isValidUserName

Checks if a username is valid syntactically. This is the case if it is either an email or the term `apikey`.

```typescript
function isValidUserName(aValue: any): aValue is string;
```

### isValidCredentials

Checks if the credentials object is valid syntactically.

```typescript
function isValidCredentials(aCred: any): aCred is Credentials;
```

### isValidApiUrl

Checks if a string is a valid [API URL](https://developer.ibm.com/customer-engagement/tutorials/getting-started-api-javascript/) by trying to access well known API routes.

```typescript
function isValidApiUrl(aValue: any): Promise<boolean>;
```

### isValidWchToolsOptions

Checks if the `WchToolsOptions` combination of [API URL](https://developer.ibm.com/customer-engagement/tutorials/getting-started-api-javascript/), username and password is valid by trying to login to the targeted server.

```typescript
function isValidWchToolsOptions(
  aCredentials: WchToolsOptions
): Promise<boolean>;
```
