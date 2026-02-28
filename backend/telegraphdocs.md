### Basic Telegraf Bot Example

Source: https://telegraf.js.org/v3

A fundamental example demonstrating how to create a Telegram bot using Telegraf. It handles 'start', 'sticker', and 'hi' interactions.

```javascript
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();
```

---

### Basic telegraf.js Bot Example

Source: https://telegraf.js.org/index

A foundational example demonstrating how to create a Telegram bot using telegraf.js. It includes handlers for start, help, sticker messages, and text messages, along with graceful shutdown.

```javascript
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
```

---

### Install telegraf.js with npm, yarn, or pnpm

Source: https://telegraf.js.org/index

Demonstrates the commands for installing the telegraf.js library using different package managers: npm, yarn, and pnpm.

```bash
$ npm install telegraf
```

```bash
$ yarn add telegraf
```

```bash
$ pnpm add telegraf
```

---

### Start Webhook Server (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

Configures and starts a webhook server for receiving updates. This method accepts a path, optional TLS options, port, host, a callback function, and a secret token. It returns the Telegraf instance.

```javascript
bot.startWebhook(path, tlsOptions?, port?, host?, cb?, secretToken?);
```

---

### Start Middleware

Source: https://telegraf.js.org/classes/Scenes

Registers middleware for handling the /start command.

````APIDOC
## Start Middleware

### Description
Registers middleware for handling the /start command.

### Method
`composer.start(...fns)`

### Parameters
#### Path Parameters
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **WizardScene<C>** - The scene context.

#### Response Example

```json
{
  "scene": "WizardScene"
}
```

````

--------------------------------

### start

Source: https://telegraf.js.org/classes/Telegraf-1

Registers middleware for handling the /start command. This is a common command used to initiate interaction with a bot.

```APIDOC
## start

### Description
Registers a middleware for handling /start

### Method
POST

### Endpoint
/start

### Parameters
#### Path Parameters
* **fns** (NonemptyReadonlyArray<Middleware<Context>>)
  * Required
  * Middleware functions to be executed when the /start command is received.

### Response
#### Success Response (200)
* **Telegraf<C>** (Telegraf)
  * The Telegraf instance, allowing for method chaining.

### Request Example
```json
{
  "example": "Telegraf.start((ctx) => ctx.reply('Welcome!'))"
}
````

### Response Example

```json
{
  "example": "Telegraf<Context>"
}
```

````

--------------------------------

### startWebhook

Source: https://telegraf.js.org/classes/Telegraf-1

Starts a webhook server to receive updates from Telegram. This is the recommended method for production environments.

```APIDOC
## startWebhook

### Description
Starts a webhook server to receive updates from Telegram.

### Method
POST

### Endpoint
/startWebhook

### Parameters
#### Path Parameters
* **path** (string)
  * Required
  * The path where the webhook will be accessible.
* **tlsOptions** (TlsOptions)
  * Optional
  * TLS options for securing the webhook.
* **port** (number)
  * Optional
  * The port on which the webhook server will listen.
* **host** (string)
  * Optional
  * The host on which the webhook server will listen.
* **cb** (RequestListener<IncomingMessage, ServerResponse>)
  * Optional
  * A callback function to handle incoming requests.
* **secretToken** (string)
  * Optional
  * A secret token to authenticate incoming webhook requests.

### Response
#### Success Response (200)
* **Telegraf<C>** (Telegraf)
  * The Telegraf instance, allowing for method chaining.

### Request Example
```json
{
  "example": "bot.startWebhook('/webhook', null, 443, '0.0.0.0')"
}
````

### Response Example

```json
{
  "example": "Telegraf<Context>"
}
```

````

--------------------------------

### getFile

Source: https://telegraf.js.org/classes/Telegram

Get basic info about a file and prepare it for downloading.

```APIDOC
## GET /getFile

### Description
Retrieves basic information about a file and prepares it for download.

### Method
GET

### Endpoint
/getFile

### Parameters
#### Path Parameters
None

#### Query Parameters
- **fileId** (string) - Required - ID of the file to get link to.

#### Request Body
None

### Request Example
```json
{
  "fileId": "AgACAgIAAxkBAAIB_2Y...</files/file_1.jpg"
}
````

### Response

#### Success Response (200)

- **File** (object) - Information about the file.

#### Response Example

```json
{
  "file_id": "AgACAgIAAxkBAAIB_2Y...",
  "file_unique_id": "AQAD...",
  "file_size": 12345,
  "file_path": "photos/file_1.jpg"
}
```

````

--------------------------------

### Install Telegraf with npm

Source: https://telegraf.js.org/v3

Installs the Telegraf package using npm. This is the primary method for adding the Telegraf framework to a Node.js project.

```bash
npm install telegraf --save
````

---

### Session Middleware Setup

Source: https://telegraf.js.org/functions/session

This snippet demonstrates how to import and use the session middleware in a telegraf.js application. It initializes the session with optional storage.

```javascript
import { Telegraf } from "telegraf";
import { session } from "@telegraf/session";

const bot = new Telegraf("YOUR_BOT_TOKEN");

bot.use(
  session({
    // Optional: configure storage, default key, etc.
    // storage: new FileSessionStorage() // Example with file storage
  }),
);

// ... bot logic ...
```

---

### Register /start Command Handler with Telegraf.js

Source: https://telegraf.js.org/classes/Composer

The `start` middleware registers a handler for the `/start` command, which is conventionally used to greet new users or provide initial information about the bot.

```typescript
import { Composer } from "telegraf";
import { Context } from "telegraf/typings/context";
import { StartContextExtn } from "telegraf/typings/composer";

const bot = new Composer<Context>();

bot.start(async (ctx: Context & StartContextExtn, next) => {
  console.log("Start command received.");
  await ctx.reply("Hello! Welcome to the bot.");
  // Add your welcome message or onboarding logic here
  return next();
});

// Chaining multiple handlers for the start command
bot.start(
  (ctx, next) => {
    console.log("Initiating welcome sequence.");
    return next();
  },
  async (ctx, next) => {
    console.log("Sending welcome message.");
    await ctx.reply("Glad to have you here!");
    return next();
  },
);
```

---

### Register Start Middleware (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

Registers a middleware to handle the /start command. This function takes a variable number of middleware functions as arguments and returns the Telegraf instance.

```javascript
bot.start(...fns);
```

---

### MemorySessionStore Methods

Source: https://telegraf.js.org/classes/MemorySessionStore

Documentation for the methods available in the MemorySessionStore class: delete, get, and set.

```APIDOC
## MemorySessionStore Methods

### delete

#### Description
Deletes a session by its name.

#### Method
DELETE

#### Parameters
- **name** (string) - Required - The name of the session to delete.

#### Returns
void

### get

#### Description
Retrieves a session by its name.

#### Method
GET

#### Parameters
- **name** (string) - Required - The name of the session to retrieve.

#### Returns
undefined | T - The session object if found, otherwise undefined.

### set

#### Description
Sets a session with a given name and value.

#### Method
SET

#### Parameters
- **name** (string) - Required - The name of the session.
- **value** (T) - Required - The session data.

#### Returns
void
```

---

### Install Telegraf with yarn

Source: https://telegraf.js.org/v3

Installs the Telegraf package using yarn. This command is an alternative to npm for managing project dependencies.

```bash
yarn add telegraf
```

---

### Register middleware for /start command (Telegraf.js)

Source: https://telegraf.js.org/classes/Scenes

Registers a middleware function to handle the /start command. It requires a context with a new, non-channel text message and start context extensions.

```typescript
start(...fns): WizardScene<C>
  * Registers a middleware for handling /start
#### Parameters
    * ##### `Rest` ...fns: NonemptyReadonlyArray<Middleware<Context<{
message: New & NonChannel & TextMessage;
update_id: number;
}> & Omit<C, keyof Context<Update>> & StartContextExtn>>
`Rest`
#### Returns WizardScene<C>
```

---

### Attach Telegraf to an existing HTTP server using createWebhook

Source: https://telegraf.js.org/index

This example shows how to integrate Telegraf's webhook functionality with an existing Node.js HTTP server using `createServer` and `bot.createWebhook`. It's suitable for basic HTTP webhook setups.

```javascript
import { createServer } from "http";

createServer(await bot.createWebhook({ domain: "example.com" })).listen(3000);
```

---

### getMe

Source: https://telegraf.js.org/classes/Telegram

Get basic information about the bot.

````APIDOC
## GET /getMe

### Description
Retrieves basic information about the bot itself.

### Method
GET

### Endpoint
/getMe

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
{}
````

### Response

#### Success Response (200)

- **UserFromGetMe** (object) - Information about the bot.

#### Response Example

```json
{
  "id": 123456789,
  "is_bot": true,
  "first_name": "MyAwesomeBot",
  "username": "my_awesome_bot"
}
```

````

--------------------------------

### Start Telegraf Webhook via launch method

Source: https://telegraf.js.org/index

This snippet demonstrates how to launch a Telegraf bot using the preferred `launch` method with webhook configuration. It specifies the webhook domain, port, optional path, and a secret token for security. Ensure `webhookDomain`, `port`, `webhookPath`, and `randomAlphaNumericString` are properly defined.

```javascript
import { Telegraf } from "telegraf";
import { message } from 'telegraf/filters';

const bot = new Telegraf(token);

bot.on(message("text"), ctx => ctx.reply("Hello"));

// Start webhook via launch method (preferred)
bot.launch({
  webhook: {
    // Public domain for webhook; e.g.: example.com
    domain: webhookDomain,

    // Port to listen on; e.g.: 8080
    port: port,

    // Optional path to listen for.
    // `bot.secretPathComponent()` will be used by default
    path: webhookPath,

    // Optional secret to be sent back in a header for security.
    // e.g.: `crypto.randomBytes(64).toString("hex")`
    secretToken: randomAlphaNumericString
  },
});
````

---

### Get My Commands

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to get the current list of the bot's commands for the given scope and user language. Deprecated, use Telegram.getMyCommands.

````APIDOC
## GET /websites/telegraf_js/getMyCommands

### Description
Use this method to get the current list of the bot's commands for the given scope and user language. Deprecated, use Telegram.getMyCommands.

### Method
GET

### Endpoint
/websites/telegraf_js/getMyCommands

### Response
#### Success Response (200)
* **commands** (Array<BotCommand>) - An array of BotCommand objects representing the bot's commands.

#### Response Example
```json
[
  {
    "command": "start",
    "description": "Starts the bot"
  }
]
````

````

--------------------------------

### Get Sticker Set

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to get a sticker set. Deprecated, use Telegram.getStickerSet.

```APIDOC
## GET /websites/telegraf_js/getStickerSet

### Description
Use this method to get a sticker set. Deprecated, use Telegram.getStickerSet.

### Method
GET

### Endpoint
/websites/telegraf_js/getStickerSet

### Parameters
#### Query Parameters
* **setName** (string) - Required - Name of the sticker set.

### Response
#### Success Response (200)
* **stickerSet** (StickerSet) - Information about the sticker set.

#### Response Example
```json
{
  "name": "my_sticker_set",
  "title": "My Stickers",
  "is_animated": false,
  "is_video": false,
  "stickers": [
    {
      "width": 512,
      "height": 512,
      "emoji": "😊",
      "file_id": "...",
      "file_unique_id": "..."
    }
  ]
}
````

````

--------------------------------

### GET /api/getDomainOpts

Source: https://telegraf.js.org/classes/Telegraf-1

Retrieves options for creating a webhook, including domain, path, and URL. This is a private accessor.

```APIDOC
## GET /api/getDomainOpts

### Description
Retrieves options for creating a webhook.

### Method
GET

### Endpoint
`/api/getDomainOpts`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **opts** ({ domain: string; path?: string; }) - Required - Options specifying the domain and an optional path for the webhook.
````

---

### startPolling

Source: https://telegraf.js.org/classes/Telegraf-1

Starts polling for updates from Telegram. This method is typically used for development or when a webhook is not feasible.

````APIDOC
## startPolling

### Description
Starts polling for updates from Telegram.

### Method
POST

### Endpoint
/startPolling

### Parameters
#### Query Parameters
* **allowedUpdates** (UpdateType[])
  * Optional
  * Specifies the types of updates to receive. Defaults to an empty array, meaning all update types.

### Response
#### Success Response (200)
* **Promise<void>**
  * A promise that resolves when polling has started.

### Request Example
```json
{
  "example": "bot.startPolling()"
}
````

### Response Example

```json
{
  "example": "Promise.resolve()"
}
```

````

--------------------------------

### Start Polling (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

Initiates polling for updates from Telegram. This is a private method and returns a promise that resolves when polling starts. It can optionally accept an array of update types to listen for.

```javascript
bot.startPolling(allowedUpdates?);
````

---

### Get Chat Members Count

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to get a list of administrators in a chat, as powerful as you are.

````APIDOC
## GET /websites/telegraf_js/getChatMembersCount

### Description
Use this method to get a list of administrators in a chat, as powerful as you are.

### Method
GET

### Endpoint
/websites/telegraf_js/getChatMembersCount

### Parameters
#### Query Parameters
* **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target channel (in the format "@channelusername").

### Response
#### Success Response (200)
* **count** (number) - Number of members in the chat.

#### Response Example
```json
{
  "count": 100
}
````

````

--------------------------------

### Get My Default Administrator Rights

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to get the default administrator rights of the bot in chats. Returns ChatAdministratorRights on success.

```APIDOC
## GET /websites/telegraf_js/getMyDefaultAdministratorRights

### Description
Use this method to get the default administrator rights of the bot in chats. Returns ChatAdministratorRights on success.

### Method
GET

### Endpoint
/websites/telegraf_js/getMyDefaultAdministratorRights

### Parameters
#### Query Parameters
* **forChannels** (boolean) - Optional - Pass True to get default administrator rights of the bot in channels. Otherwise, the default rights in bots are returned.

### Response
#### Success Response (200)
* **rights** (ChatAdministratorRights) - An object containing the default administrator rights.

#### Response Example
```json
{
  "can_manage_chat": true,
  "can_delete_messages": true,
  "can_manage_topics": true
}
````

````

--------------------------------

### me

Source: https://telegraf.js.org/classes/Context

A shorthand for getting information about the bot itself.

```APIDOC
## me

### Description
Returns basic information about the bot. This is a shorthand property for accessing bot user information.

### Method
GET

### Endpoint
/websites/telegraf_js/me

### Parameters
None

### Response
#### Success Response (200)
* `string` - A string representation of the bot's user information.

### Response Example
```json
"@YourBotName"
````

````

--------------------------------

### Get Chat Member

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to get information about a member of a chat. Returns a ChatMember object on success.

```APIDOC
## GET /websites/telegraf_js/getChatMember

### Description
Use this method to get information about a member of a chat. Returns a ChatMember object on success.

### Method
GET

### Endpoint
/websites/telegraf_js/getChatMember

### Parameters
#### Query Parameters
* **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target channel (in the format "@channelusername").
* **userId** (number) - Required - Unique identifier for the target user.

### Response
#### Success Response (200)
* **member** (ChatMember) - Information about the chat member.

#### Response Example
```json
{
  "user": {
    "id": 67890,
    "is_bot": false,
    "first_name": "User"
  },
  "status": "member",
  "can_be_edited": false
}
````

````

--------------------------------

### Get File Info and Link (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Provides methods to get basic information about a file and generate a download link. `getFile` requires a `fileId` and returns a `File` object. `getFileLink` also takes a `fileId` (or `File` object) and returns a `URL`.

```typescript
import { File } from "telegraf/types";

async function getFileInfo(fileId: string): Promise<File> {
  // Implementation to get file info
  return {} as File;
}

async function getFileLink(fileId: string | File): Promise<URL> {
  // Implementation to get file link
  return new URL("http://example.com");
}
````

---

### Get Chat Information

Source: https://telegraf.js.org/interfaces/Scenes

Retrieves information about a specific chat. This method is useful for getting details about groups, supergroups, or private chats.

````APIDOC
## GET /websites/telegraf_js/getChat

### Description
Retrieves information about a specific chat. This method is useful for getting details about groups, supergroups, or private chats.

### Method
GET

### Endpoint
/websites/telegraf_js/getChat

### Parameters
#### Query Parameters
* **chatId** (string | number) - Required - The ID of the chat to retrieve information for.

### Response
#### Success Response (200)
* **chat** (Chat) - An object containing the chat information.

#### Response Example
```json
{
  "chat": {
    "id": 12345,
    "type": "private",
    "first_name": "John"
  }
}
````

````

--------------------------------

### Composer.start

Source: https://telegraf.js.org/classes/Composer

Registers a middleware for handling the /start command.

```APIDOC
## Composer.start

### Description
Registers a middleware for handling the /start command.

### Method
Composer.start

### Parameters
#### Parameters
- **Rest** ...fns: NonemptyReadonlyArray<Middleware<Context<{message: New & NonChannel & TextMessage;
update_id: number;
}> & Omit<C, keyof Context<Update>> & StartContextExtn>>

### Returns
Composer<C>
````

---

### Get Chat Members Count with Telegraf.js

Source: https://telegraf.js.org/classes/Context

Gets the total number of members in a chat. This method uses rest parameters and returns a Promise resolving to a number.

```javascript
ctx.getChatMembersCount(...args);
```

---

### Get Chat Menu Button

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to get the current value of the bot's menu button in the current private chat. Returns MenuButton on success.

````APIDOC
## GET /websites/telegraf_js/getChatMenuButton

### Description
Use this method to get the current value of the bot's menu button in the current private chat. Returns MenuButton on success.

### Method
GET

### Endpoint
/websites/telegraf_js/getChatMenuButton

### Response
#### Success Response (200)
* **menuButton** (MenuButton) - The bot's menu button.

#### Response Example
```json
{
  "type": "web_app",
  "text": "Open Web App",
  "web_app": {
    "url": "https://example.com"
  }
}
````

````

--------------------------------

### WizardScene Constructors

Source: https://telegraf.js.org/classes/Scenes

Details the constructors for creating a new WizardScene instance.

```APIDOC
## Constructors

### constructor

**new WizardScene<C>(id, ...steps): WizardScene<C>**

#### Type Parameters
#### C extends Context<Update> & {
  scene: SceneContextScene<C, WizardSessionData>;
  wizard: WizardContextWizard<C>;
}

#### Parameters
- **id**: string
- **`Rest` ...steps**: Middleware<C>[]

#### Returns WizardScene<C>

**new WizardScene<C>(id, options, ...steps): WizardScene<C>**

#### Type Parameters
#### C extends Context<Update> & {
  scene: SceneContextScene<C, WizardSessionData>;
  wizard: WizardContextWizard<C>;
}

#### Parameters
- **id**: string
- **options**: SceneOptions<C>
- **`Rest` ...steps**: Middleware<C>[]

#### Returns WizardScene<C>
````

---

### Get Default Admin Rights (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Retrieves the default administrator rights for the bot. Use the `getMyDefaultAdministratorRights` method, optionally specifying `forChannels` to get rights in channels. It returns a `ChatAdministratorRights` object.

```typescript
import { ChatAdministratorRights } from "telegraf/types";

async function getDefaultAdminRights(
  forChannels?: boolean,
): Promise<ChatAdministratorRights> {
  // Implementation to get default admin rights
  return {} as ChatAdministratorRights;
}
```

---

### Get Chat Members Count with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Gets the total number of members in a chat. This method accepts rest parameters and returns a Promise resolving to a number representing the member count.

```typescript
getChatMembersCount(...args: []): Promise<number>
```

---

### getFileLink

Source: https://telegraf.js.org/classes/Telegram

Get download link to a file.

````APIDOC
## GET /getFileLink

### Description
Generates a download link for a given file.

### Method
GET

### Endpoint
/getFileLink

### Parameters
#### Path Parameters
None

#### Query Parameters
- **fileId** (string | File) - Required - The file ID or File object.

#### Request Body
None

### Request Example
```json
{
  "fileId": "AgACAgIAAxkBAAIB_2Y..."
}
````

### Response

#### Success Response (200)

- **URL** (string) - The downloadable URL for the file.

#### Response Example

```json
"https://api.telegram.org/file/bot<token>/photos/file_1.jpg"
```

````

--------------------------------

### Get Sticker Set

Source: https://telegraf.js.org/classes/Context

Retrieves a sticker set. Deprecated, use `Telegram.getStickerSet`.

```APIDOC
## GET /getStickerSet

### Description
Retrieves a sticker set. Deprecated, use `Telegram.getStickerSet`.

### Method
GET

### Endpoint
/getStickerSet

### Parameters
#### Query Parameters
- **setName** (string) - Required - The name of the sticker set.

### Request Example
```json
{
  "setName": "cool_stickers"
}
````

### Response

#### Success Response (200)

- **StickerSet** - An object containing information about the sticker set.

````

--------------------------------

### telegraf.js Context Shortcut Methods

Source: https://telegraf.js.org/index

An example showcasing the use of shortcut methods provided by the telegraf.js Context class for interacting with the Telegram API. It covers leaving chats, sending messages, answering callback queries, and answering inline queries.

```javascript
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  await ctx.leaveChat()
})

bot.on(message('text'), async (ctx) => {
  // Explicit usage
  await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

  // Using context shortcut
  await ctx.reply(`Hello ${ctx.state.role}`)
})

bot.on('callback_query', async (ctx) => {
  // Explicit usage
  await ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

  // Using context shortcut
  await ctx.answerCbQuery()
})

bot.on('inline_query', async (ctx) => {
  const result = []
  // Explicit usage
  await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

  // Using context shortcut
  await ctx.answerInlineQuery(result)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
````

---

### Get Chat Members Count (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Gets the total number of members in a chat. It requires the `chatId` and returns a number representing the member count. This is a simple way to gauge the size of a group or channel.

```typescript
async function getChatMemberCount(chatId: string | number): Promise<number> {
  // Implementation to get chat members count
  return 0;
}
```

---

### getMyCommands

Source: https://telegraf.js.org/classes/Telegram

Get the current list of the bot's commands.

````APIDOC
## GET /getMyCommands

### Description
Retrieves the list of commands configured for the bot.

### Method
GET

### Endpoint
/getMyCommands

### Parameters
#### Path Parameters
None

#### Query Parameters
- **extra** ({}) - Optional - Placeholder for future extensions.

#### Request Body
None

### Request Example
```json
{}
````

### Response

#### Success Response (200)

- **Array of BotCommand** - A list of bot commands.

#### Response Example

```json
[
  {
    "command": "start",
    "description": "Starts the bot"
  },
  {
    "command": "help",
    "description": "Shows help information"
  }
]
```

````

--------------------------------

### POST /api/createWebhook

Source: https://telegraf.js.org/classes/Telegraf-1

Creates a webhook middleware for receiving incoming updates. Specify a URL to receive updates via webhook and get an Express-style middleware.

```APIDOC
## POST /api/createWebhook

### Description
Creates a webhook middleware for receiving incoming updates.

### Method
POST

### Endpoint
`/api/createWebhook`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **opts** ({ domain: string; path?: string; }) - Required - Options for creating the webhook, including the domain and an optional path.
````

---

### POST /api/help

Source: https://telegraf.js.org/classes/Telegraf-1

Registers middleware for handling the `/help` command. This provides a standard way to offer assistance to users.

```APIDOC
## POST /api/help

### Description
Registers middleware for handling the `/help` command.

### Method
POST

### Endpoint
`/api/help`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **...fns** (Middleware) - Required - Middleware functions to execute when the `/help` command is received.
```

---

### Get My Default Administrator Rights

Source: https://telegraf.js.org/classes/Context

Retrieves the default administrator rights for the bot.

````APIDOC
## GET /getMyDefaultAdministratorRights

### Description
Retrieves the default administrator rights for the bot. Optionally specify `forChannels` to get rights for channels.

### Method
GET

### Endpoint
/getMyDefaultAdministratorRights

### Parameters
#### Query Parameters
- **extra** (Omit) - Optional - Additional parameters, including `forChannels` (boolean).
  - **forChannels** (boolean) - Optional - Whether to get rights for channels.

### Request Example
```json
{
  "extra": {
    "forChannels": true
  }
}
````

### Response

#### Success Response (200)

- **ChatAdministratorRights** - An object containing the default administrator rights.

````

--------------------------------

### getChatAdministrators

Source: https://telegraf.js.org/classes/Telegram

Get a list of administrators in a chat.

```APIDOC
## GET /getChatAdministrators

### Description
Retrieves a list of administrators for a given chat.

### Method
GET

### Endpoint
/getChatAdministrators

### Parameters
#### Path Parameters
None

#### Query Parameters
- **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)

#### Request Body
None

### Request Example
```json
{
  "chatId": "12345"
}
````

### Response

#### Success Response (200)

- **Array of ChatMemberOwner or ChatMemberAdministrator** - A list of chat administrators.

#### Response Example

```json
[
  {
    "user": { ... },
    "status": "administrator",
    "can_be_edited": true
  }
]
```

````

--------------------------------

### WizardScene Methods

Source: https://telegraf.js.org/classes/Scenes

Details the methods available for interacting with and configuring a WizardScene.

```APIDOC
## Methods

### action

`action(triggers, ...fns): WizardScene<C>`

Registers middleware for handling matching callback queries.

#### Parameters
- triggers: Triggers<NarrowedContext<C, CallbackQueryUpdate<CallbackQuery>>>
- `Rest` ...fns: MatchedMiddleware<C, "callback_query">

#### Returns WizardScene<C>

### cashtag

`cashtag(cashtag, ...fns): WizardScene<C>`

#### Parameters
- cashtag: MaybeArray<string>
- `Rest` ...fns: MatchedMiddleware<C, "channel_post" | "message">

#### Returns WizardScene<C>
````

---

### getMyDescription

Source: https://telegraf.js.org/classes/Telegram

Use this method to get the current bot description for the given user language.

````APIDOC
## GET /getMyDescription

### Description
Retrieves the current description of the bot for a specified language.

### Method
GET

### Endpoint
/getMyDescription

### Parameters
#### Path Parameters
None

#### Query Parameters
- **language_code** (string) - Optional - A two-letter ISO 639-1 language code.

#### Request Body
None

### Request Example
```json
{
  "language_code": "en"
}
````

### Response

#### Success Response (200)

- **BotDescription** (object) - The bot's description.

#### Response Example

```json
{
  "short_description": "Your friendly bot for amazing tasks!",
  "description": "This bot helps you manage your tasks and stay organized. You can use /addtask to add new tasks and /list to see your pending tasks."
}
```

````

--------------------------------

### text

Source: https://telegraf.js.org/classes/Context

A shorthand for getting the text content of a message.

```APIDOC
## text

### Description
A convenient shorthand property to extract the text content from a message within the current update. Returns an empty string if the message does not contain text.

### Method
GET

### Endpoint
/websites/telegraf_js/text

### Parameters
None

### Response
#### Success Response (200)
* `GetText<U>` - The text content of the message.

### Response Example
```json
"Hello, Telegraf!"
````

````

--------------------------------

### Get My Commands

Source: https://telegraf.js.org/classes/Context

Retrieves the list of bot's commands. Deprecated, use `Telegram.getMyCommands`.

```APIDOC
## GET /getMyCommands

### Description
Retrieves the list of bot's commands. Deprecated, use `Telegram.getMyCommands`.

### Method
GET

### Endpoint
/getMyCommands

### Response
#### Success Response (200)
- **BotCommand[]** - An array of bot commands.
````

---

### Action Middleware (Static)

Source: https://telegraf.js.org/classes/Scenes

Generates middleware for handling matching callback queries.

````APIDOC
## Action Middleware (Static)

### Description
Generates middleware for handling matching callback queries.

### Method
`Composer.action<C>(triggers, ...fns)`

### Type Parameters
- **C** extends Context<Update>

### Parameters
#### Path Parameters
- **triggers** (Triggers<NarrowedContext<C, CallbackQueryUpdate<CallbackQuery>>>) - Required - The callback query triggers.
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "triggers": "button_click",
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **MiddlewareFn<C>** - The middleware function.

#### Response Example

```json
{
  "middleware": "actionMiddleware"
}
```

````

--------------------------------

### getChatMembersCount

Source: https://telegraf.js.org/classes/Telegram

Get the number of members in a chat.

```APIDOC
## GET /getChatMembersCount

### Description
Retrieves the total number of members in a chat.

### Method
GET

### Endpoint
/getChatMembersCount

### Parameters
#### Path Parameters
None

#### Query Parameters
- **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)

#### Request Body
None

### Request Example
```json
{
  "chatId": "12345"
}
````

### Response

#### Success Response (200)

- **number** - The number of members in the chat.

#### Response Example

```json
1000
```

````

--------------------------------

### Webhook Configuration Details

Source: https://telegraf.js.org/interfaces/Telegraf

Provides specific details on configuring webhook settings for a Telegraf bot, including options for certificate, domain, path, and security.

```typescript
webhook?: {
  cb?: RequestListener<typeof IncomingMessage, typeof ServerResponse>;
  certificate?: InputFile;
  domain: string;
  hookPath?: string;
  host?: string;
  ipAddress?: string;
  maxConnections?: number;
  path?: string;
  port?: number;
  secretToken?: string;
  tlsOptions?: TlsOptions;
}
````

---

### getChatMember

Source: https://telegraf.js.org/classes/Telegram

Get information about a member of a chat.

````APIDOC
## GET /getChatMember

### Description
Retrieves information about a specific chat member.

### Method
GET

### Endpoint
/getChatMember

### Parameters
#### Path Parameters
None

#### Query Parameters
- **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
- **userId** (number) - Required - Unique identifier of the target user

#### Request Body
None

### Request Example
```json
{
  "chatId": "12345",
  "userId": 67890
}
````

### Response

#### Success Response (200)

- **ChatMember** (object) - Information about the chat member.

#### Response Example

```json
{
  "user": { ... },
  "status": "member"
}
```

````

--------------------------------

### Composer Constructor

Source: https://telegraf.js.org/classes/Composer

Initializes a new Composer instance with provided middleware functions.

```APIDOC
## new Composer<C>(...fns): Composer<C>

### Description
Creates a new Composer instance.

### Parameters
* `...fns` (readonly Middleware<C>[]): A rest parameter accepting multiple middleware functions.

### Returns
Composer<C>: A new Composer instance.
````

---

### getWebhookInfo

Source: https://telegraf.js.org/classes/Telegram

Method to get webhook information. It returns a Promise that resolves with the WebhookInfo object.

```APIDOC
## getWebhookInfo

### Description
Get webhook information.

### Method
GET

### Endpoint
/getWebhookInfo

### Parameters
N/A

### Request Example
N/A

### Response
#### Success Response (200)
- **url** (string) - Webhook URL, may be empty if webhook is not set up.
- **has_custom_certificate** (boolean) - True, if a custom certificate was provided for webhook certificate checks.
- **pending_update_count** (integer) - Number of updates awaiting delivery.
- **last_error_date** (integer) - Optional. Unix timestamp of the most recent error that happened when trying to deliver an update via webhook.
- **last_error_message** (string) - Optional. Error message.
- **max_connections** (integer) - Optional. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery.
- **allowed_updates** (string[]) - Optional. A list of the update types the bot is subscribed to.

#### Response Example
{
  "url": "https://example.com/webhook",
  "has_custom_certificate": false,
  "pending_update_count": 0,
  "max_connections": 40
}

```

---

### WizardScene Constructor (id, options, ...steps)

Source: https://telegraf.js.org/classes/Scenes

Constructs a new WizardScene with a unique ID, scene options, and a series of middleware functions for the wizard steps. The context type C must extend Context and include scene and wizard properties.

```typescript
new WizardScene<C>(id: string, options: SceneOptions<C>, ...steps: Middleware<C>[]): WizardScene<C>
```

---

### Get Chat

Source: https://telegraf.js.org/classes/Context

Retrieves information about a chat. This method is a shorthand for `Telegram.getChat`.

````APIDOC
## GET /getChat

### Description
Retrieves information about a chat. This method is a shorthand for `Telegram.getChat`.

### Method
GET

### Endpoint
/getChat

### Parameters
#### Query Parameters
- **...args** (Rest) - Optional - Can be used to pass arguments if needed, typically none are required for basic usage.

### Request Example
```json
{
  "args": []
}
````

### Response

#### Success Response (200)

- **ChatFromGetChat** - An object containing information about the chat.

````

--------------------------------

### POST /createNewStickerSet

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to create a new sticker set, including animated stickers or video stickers. The bot has to be the creator of the other stickers in the set. Returns True on success.

```APIDOC
## POST /createNewStickerSet

### Description
Use this method to create a new sticker set, including animated stickers or video stickers. The bot has to be the creator of the other stickers in the set. Returns True on success.

### Method
POST

### Endpoint
/createNewStickerSet

### Parameters
#### Path Parameters
- **userId** (number) - Required - User identifier for which the public health warning is requested.
- **name** (string) - Required - Sticker set name, be sure that the name contains only a-z, 0-9 and underscore. (and the length must be between 1 and 64)
- **title** (string) - Required - Sticker set title, 1-64 characters
#### Request Body
- **stickers** (array) - Required - A JSON-serialized array of 1-50 stickers to be added to the set
  - **sticker** (string) - Required - File identifier of the sticker (file_id, file_unique_id, or URL).
  - **emoji_list** (array) - Required - One or more emoji corresponding to the sticker
  - **format** (string) - Required - Format of the sticker set (e.g., 'static', 'animated', 'video').
  - **sticker_type** (string) - Required - Type of the sticker ('regular', 'mask', 'custom_emoji').

### Request Example
```json
{
  "userId": 123456789,
  "name": "my_custom_stickers",
  "title": "My Awesome Stickers",
  "stickers": [
    {
      "sticker": "CAACAgIAAxkBAAEk1ZZZabcde",
      "emoji_list": ["😊", "😀"],
      "format": "static",
      "sticker_type": "regular"
    }
  ]
}
````

### Response

#### Success Response (200)

- **result** (boolean) - True on success.

#### Response Example

```json
{
  "ok": true,
  "result": true
}
```

````

--------------------------------

### Settings Middleware

Source: https://telegraf.js.org/classes/Scenes

Registers middleware for handling the /settings command.

```APIDOC
## Settings Middleware

### Description
Registers middleware for handling the /settings command.

### Method
`composer.settings(...fns)`

### Parameters
#### Path Parameters
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **WizardScene<C>** - The scene context.

#### Response Example

```json
{
  "scene": "WizardScene"
}
```

````

--------------------------------

### getStickerSet

Source: https://telegraf.js.org/classes/Telegram

Method to get a sticker set by its name. It returns a Promise that resolves with the StickerSet object.

```APIDOC
## getStickerSet

### Description
Use this method to get a sticker set.

### Method
GET

### Endpoint
/getStickerSet

### Parameters
#### Query Parameters
- **name** (string) - Required - The name of the sticker set.

### Request Example
N/A

### Response
#### Success Response (200)
- **sticker_set** (object) - The sticker set object.

#### Response Example
{
  "name": "example_set",
  "title": "Example Set",
  "is_animated": false,
  "is_video": false,
  "stickers": []
}

````

---

### Launch Telegraf bot with config and callback

Source: https://telegraf.js.org/classes/Telegraf-1

Launches the Telegraf bot with specific launch options and an optional callback. The callback executes after the bot is launched. Returns a Promise that resolves upon successful launch.

```typescript
launch(config: LaunchOptions, onLaunch?: () => void): Promise<void>
```

---

### LaunchOptions Configuration

Source: https://telegraf.js.org/interfaces/Telegraf

Defines the configuration options for launching a Telegraf.js bot, including webhook settings.

```APIDOC
## Interface LaunchOptions

### Properties

#### `Optional` allowedUpdates

- **Type**: `UpdateType[]`
- **Description**: List the types of updates you want your bot to receive.

#### `Optional` dropPendingUpdates

- **Type**: `boolean`
- **Description**: Controls whether to drop pending updates.

#### `Optional` webhook

- **Type**: `object`
- **Description**: Configuration options for when the bot is run via webhooks.

##### Properties of `webhook`:

- **cb?** (`RequestListener<typeof IncomingMessage, typeof ServerResponse>`): Optional callback for handling requests.
- **certificate?** (`InputFile`): Optional certificate for public key verification.
- **domain**: `string` - Required. Public domain for the webhook.
- **hookPath?** (`string`): Optional webhook URL path; will be automatically generated if not specified. **Deprecated**: Pass `path` instead.
- **host?** (`string`): Optional host for webhook.
- **ipAddress?** (`string`): The fixed IP address for sending webhook requests.
- **maxConnections?** (`number`): Maximum allowed simultaneous HTTPS connections to the webhook (1-100). Defaults to 40.
- **path?** (`string`): Webhook URL path; will be automatically generated if not specified.
- **port?** (`number`): Optional port for webhook.
- **secretToken?** (`string`): A secret token for header verification (1-256 characters, `A-Z`, `a-z`, `0-9`, `_`, `-`).
- **tlsOptions?** (`TlsOptions`): Optional TLS server options. Omit to use http.
```

---

### Create New Sticker Set (Telegraf.js)

Source: https://telegraf.js.org/interfaces/Scenes

Creates a new sticker set for a user. Requires the bot to be an administrator and have `can_set_sticker_sets` permission.

```javascript
bot.api.createNewStickerSet(userId, "stickerSetName", "Sticker Set Title", [
  { sticker: "...", emoji: "😊" },
]);
```

---

### Get User Chat Boosts

Source: https://telegraf.js.org/interfaces/Scenes

Shorthand for Telegram.getUserChatBoosts. Retrieves a list of boosts added to a chat by all users.

````APIDOC
## GET /websites/telegraf_js/getUserChatBoosts

### Description
Retrieves a list of boosts added to a chat by all users. Shorthand for Telegram.getUserChatBoosts.

### Method
GET

### Endpoint
/websites/telegraf_js/getUserChatBoosts

### Parameters
#### Query Parameters
* **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target channel (in the format "@channelusername").

### Response
#### Success Response (200)
* **boosts** (Array<UserChatBoosts>) - An array of UserChatBoosts objects.

#### Response Example
```json
[
  {
    "boost_id": "...",
    "add_date": 1670000000,
    "source": {
      "type": "premium_gift"
    }
  }
]
````

````

--------------------------------

### getUserProfilePhotos

Source: https://telegraf.js.org/classes/Telegram

Method to get user profile photos. It returns a Promise that resolves with the UserProfilePhotos object.

```APIDOC
## getUserProfilePhotos

### Description
Get user profile photos.

### Method
GET

### Endpoint
/getUserProfilePhotos

### Parameters
#### Query Parameters
- **userId** (number) - Required - The user's ID.
- **offset** (number) - Optional - Sequential number of the first photo to be returned.
- **limit** (number) - Optional - Limits the number of photos to be fetched. Defaults to 100.

### Request Example
N/A

### Response
#### Success Response (200)
- **total_count** (number) - Total number of profile photos found.
- **photos** (array) - Requested profile photos.

#### Response Example
{
  "total_count": 1,
  "photos": [
    [
      {
        "file_id": "file_123",
        "file_unique_id": "unique_123",
        "file_size": 1024,
        "width": 160,
        "height": 160
      }
    ]
  ]
}

````

---

### getMyShortDescription

Source: https://telegraf.js.org/classes/Telegram

Use this method to get the current bot short description for the given user language. It returns a Promise that resolves with the bot's short description.

```APIDOC
## getMyShortDescription

### Description
Use this method to get the current bot short description for a specific language.

### Method
GET

### Endpoint
/getMyShortDescription

### Parameters
#### Query Parameters
- **language_code** (string) - Optional - A two-letter ISO 639-1 language code.

### Request Example
N/A

### Response
#### Success Response (200)
- **short_description** (string) - The bot's short description.

#### Response Example
{
  "short_description": "A helpful bot."
}

```

---

### Theme Settings

Source: https://telegraf.js.org/classes/Context

Settings for theme preferences.

```APIDOC
#### Theme
- **OSLightDark**
```

---

### answerInlineQuery

Source: https://telegraf.js.org/interfaces/Scenes

This method sends results in response to an inline query. It is used when a user types your bot's username in a chat to get suggestions.

````APIDOC
## answerInlineQuery

### Description
Sends results in response to an inline query.

### Method
POST

### Endpoint
N/A (Method on context object)

### Parameters
#### Rest Parameters
- `results` (array) - Required - An array of inline query results.
- `extra` (object) - Optional - Additional parameters.

### Request Example
```json
// Example parameters
{
  "results": [ ... ],
  "cache_time": 300
}
````

### Response

#### Success Response (200)

- `result` (boolean) - Indicates if the operation was successful.

#### Response Example

```json
true
```

````

--------------------------------

### Composer.command

Source: https://telegraf.js.org/classes/Scenes

Creates middleware for handling specific bot commands.

```APIDOC
## Composer.command

### Description
Generates middleware for handling specified commands.

### Method
`command<C>(command, ...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **command** (Triggers<NarrowedContext<C, { message: New & NonChannel & TextMessage; update_id: number; }>>) - Required - The command(s) to trigger the middleware.
- **fns** (NonemptyReadonlyArray<Middleware<Context<{ message: New & NonChannel & TextMessage; update_id: number; }>> & Omit<C, keyof Context<Update>> & CommandContextExtn>>) - Required - Middleware functions to execute.

### Returns
`MiddlewareFn<C>`
````

---

### Get Chat Administrators

Source: https://telegraf.js.org/classes/Context

Retrieves a list of administrators in a chat. This method is a shorthand for `Telegram.getChatAdministrators`.

````APIDOC
## GET /getChatAdministrators

### Description
Retrieves a list of administrators in a chat. This method is a shorthand for `Telegram.getChatAdministrators`.

### Method
GET

### Endpoint
/getChatAdministrators

### Parameters
#### Query Parameters
- **...args** (Rest) - Optional - Can be used to pass arguments if needed, typically none are required for basic usage.

### Request Example
```json
{
  "args": []
}
````

### Response

#### Success Response (200)

- **(ChatMemberOwner | ChatMemberAdministrator)[]** - An array of chat administrators.

````

--------------------------------

### answerPreCheckoutQuery

Source: https://telegraf.js.org/interfaces/Scenes

Answers a pre-checkout query, which is sent when the user confirms their payment details for a purchase via the bot.

```APIDOC
## answerPreCheckoutQuery

### Description
Answers a pre-checkout query.

### Method
POST

### Endpoint
N/A (Method on context object)

### Parameters
#### Rest Parameters
- `ok` (boolean) - Required - Specify True if everything is alright (Goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems.
- `errorMessage` (string) - Optional - Required for False result. Error message.

### Request Example
```json
// Example parameters
{
  "ok": true
}
````

### Response

#### Success Response (200)

- `result` (boolean) - Indicates if the operation was successful.

#### Response Example

```json
true
```

````

--------------------------------

### Get User Chat Boosts

Source: https://telegraf.js.org/classes/Context

Retrieves information about chat boosts applied to a chat. Shorthand for `Telegram.getUserChatBoosts`.

```APIDOC
## GET /getUserChatBoosts

### Description
Retrieves information about chat boosts applied to a chat. Shorthand for `Telegram.getUserChatBoosts`.

### Method
GET

### Endpoint
/getUserChatBoosts

### Response
#### Success Response (200)
- **UserChatBoosts[]** - An array of user chat boosts.
````

---

### Get My Commands with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Fetches the list of commands supported by the bot. This method returns a Promise resolving to an array of BotCommand. Deprecated: use Telegram.getMyCommands.

```typescript
getMyCommands(): Promise<BotCommand[]>
```

---

### Composer.branch

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that runs different middleware based on a predicate.

```APIDOC
## Composer.branch

### Description
Creates middleware that runs different middleware based on a predicate.

### Method
`branch<C>(predicate, trueMiddleware, falseMiddleware): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **predicate** (boolean | Predicate<C> | AsyncPredicate<C>) - Required - A condition to evaluate.
- **trueMiddleware** (Middleware<C>) - Required - Middleware to run if the predicate returns true.
- **falseMiddleware** (Middleware<C>) - Required - Middleware to run if the predicate returns false.

### Returns
`MiddlewareFn<C>`
```

---

### Create New Sticker Set using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Creates a new sticker set for a user. Requires the bot to be an administrator and the user to have sent the message. Requires sticker data and set details.

```typescript
import { Telegraf } from "telegraf";

const bot = new Telegraf<Context>("YOUR_BOT_TOKEN");

async function createStickerSet(
  name: string,
  title: string,
  stickerData: Record<string, any>,
): Promise<true> {
  // The 'createNewStickerSet' method creates a sticker set.
  // 'name' is the name of the sticker set.
  // 'title' is the title of the sticker set.
  // 'stickerData' contains information about the stickers to be added.
  return await bot.telegram.createNewStickerSet(name, title, stickerData);
}
```

---

### getMyDefaultAdministratorRights

Source: https://telegraf.js.org/classes/Telegram

Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success.

````APIDOC
## GET /getMyDefaultAdministratorRights

### Description
Retrieves the default administrator rights currently set for the bot.

### Method
GET

### Endpoint
/getMyDefaultAdministratorRights

### Parameters
#### Path Parameters
None

#### Query Parameters
- **forChannels** (boolean) - Optional - Pass true to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned.

#### Request Body
None

### Request Example
```json
{
  "forChannels": true
}
````

### Response

#### Success Response (200)

- **ChatAdministratorRights** (object) - The default administrator rights.

#### Response Example

```json
{
  "is_anonymous": false,
  "can_manage_chat": true,
  "can_delete_messages": false,
  "can_manage_video_chats": true,
  "can_restrict_members": false,
  "can_promote_members": false,
  "can_change_info": false,
  "can_invite_users": false,
  "can_pin_messages": false,
  "can_manage_topics": false
}
```

````

--------------------------------

### Get Chat Member

Source: https://telegraf.js.org/classes/Context

Retrieves information about a member of a chat. This method is a shorthand for `Telegram.getChatMember`.

```APIDOC
## GET /getChatMember

### Description
Retrieves information about a member of a chat. This method is a shorthand for `Telegram.getChatMember`.

### Method
GET

### Endpoint
/getChatMember

### Parameters
#### Path Parameters
- **userId** (number) - Required - The ID of the user to get information about.

#### Query Parameters
- **...args** (Rest) - Optional - Can be used to pass arguments if needed, typically none are required for basic usage.

### Request Example
```json
{
  "args": [123456789]
}
````

### Response

#### Success Response (200)

- **ChatMember** - An object containing information about the chat member.

````

--------------------------------

### WizardScene Constructor (id, ...steps)

Source: https://telegraf.js.org/classes/Scenes

Constructs a new WizardScene with a unique ID and a series of middleware functions representing the steps in the wizard. The context type C must extend Context and include scene and wizard properties.

```typescript
new WizardScene<C>(id: string, ...steps: Middleware<C>[]): WizardScene<C>
````

---

### Get Chat Administrators

Source: https://telegraf.js.org/interfaces/Scenes

Returns a list of administrators in a chat. This method is only available for basic groups, supergroups, and channels.

````APIDOC
## GET /websites/telegraf_js/getChatAdministrators

### Description
Returns a list of administrators in a chat. This method is only available for basic groups, supergroups, and channels.

### Method
GET

### Endpoint
/websites/telegraf_js/getChatAdministrators

### Parameters
#### Query Parameters
* **chatId** (string | number) - Required - The ID of the chat to retrieve administrators for.

### Response
#### Success Response (200)
* **administrators** (Array<ChatMemberOwner | ChatMemberAdministrator>) - An array of chat members who are administrators.

#### Response Example
```json
[
  {
    "user": {
      "id": 12345,
      "is_bot": false,
      "first_name": "Admin"
    },
    "status": "administrator",
    "can_be_edited": true
  }
]
````

````

--------------------------------

### help Middleware

Source: https://telegraf.js.org/classes/Composer

Registers a middleware specifically for handling the /help command.

```APIDOC
## POST /help

### Description
Registers a middleware specifically for handling the /help command.

### Method
POST

### Endpoint
/help

### Parameters
#### Query Parameters
- **Rest ...fns** (NonemptyReadonlyArray<Middleware<Context<{
  message: New & NonChannel & TextMessage;
  update_id: number;
}> & Omit<C, keyof Context<Update>> & CommandContextExtn>>) - Required - Middleware functions to process the /help command.

### Response
#### Success Response (200)
- **Composer<C>** - Returns a Composer instance for chaining middleware.
````

---

### Get Chat Members Count

Source: https://telegraf.js.org/classes/Context

Retrieves the number of members in a chat. This method is a shorthand for `Telegram.getChatMembersCount`.

````APIDOC
## GET /getChatMembersCount

### Description
Retrieves the number of members in a chat. This method is a shorthand for `Telegram.getChatMembersCount`.

### Method
GET

### Endpoint
/getChatMembersCount

### Parameters
#### Query Parameters
- **...args** (Rest) - Optional - Can be used to pass arguments if needed, typically none are required for basic usage.

### Request Example
```json
{
  "args": []
}
````

### Response

#### Success Response (200)

- **number** - The total number of members in the chat.

````

--------------------------------

### WizardScene Properties

Source: https://telegraf.js.org/classes/Scenes

Lists and describes the properties available on a WizardScene instance.

```APIDOC
## Properties

### enterHandler
`enterHandler`: MiddlewareFn<C>

### id
`id`: string

### leaveHandler
`leaveHandler`: MiddlewareFn<C>

### steps
`steps`: Middleware<C>[]

### `Optional` ttl
`ttl?`: number

### `Static` mount
`mount`: {
  <Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>;
  <Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>;
} = Composer.on

#### Type declaration
- <Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>
  Generates middleware for handling provided update types.
#### Type Parameters
- Ctx extends Context<Update>
- Filter extends UpdateType | Guard<Ctx["update"]>
#### Parameters
- filters: MaybeArray<Filter>
- `Rest` ...fns: NonemptyReadonlyArray<Middleware<FilteredContext<Ctx, Filter>>>
#### Returns MiddlewareFn<Ctx>
#### Deprecated
use `Composer.on` instead
- <Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>
  Generates middleware for handling provided update types.
#### Type Parameters
- Ctx extends Context<Update>
- Filter extends "text" | "sticker" | ... | "story" | "venue" | "forward_date"
#### Parameters
- filters: MaybeArray<Filter>
- `Rest` ...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<Ctx, MountMap[Filter]>, MountMap[Filter]>>
#### Returns MiddlewareFn<Ctx>
#### Deprecated
use `Composer.on` instead
````

---

### Get Bot Short Description (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Fetches the current bot's short description for a given user language. Accepts an optional language code string. Returns a Promise resolving to BotShortDescription.

```javascript
getMyShortDescription(language_code?: string): Promise<BotShortDescription>
```

---

### answerPreCheckoutQuery

Source: https://telegraf.js.org/classes/Context

Use this method to send an answer to a pre-checkout query. Caller must delegate the callback query to the client application using the appropriate method of the `Client.answerCallbackQuery` method.

```APIDOC
## answerPreCheckoutQuery

### Description
Sends an answer to a pre-checkout query. This method is used to confirm or deny a user's
```

---

### Set Chat Sticker Set API

Source: https://telegraf.js.org/classes/Telegram

Sets a new sticker set for a group, like a,【sticker pack】for all members of the group. The bot must be an administrator in the chat and must have the appropriate admin rights. Use the field `chatId` to pass the identifier of the chat. Use the field `setName` to pass the name of the sticker set. A chat can have no more than one linked sticker set installed, so the link will be removed as the new one is installed. The chat must be a supergroup.

````APIDOC
## POST /setChatStickerSet

### Description
Sets a new sticker set for a group. The bot must be an administrator in the chat and must have the appropriate admin rights. The chat must be a supergroup.

### Method
POST

### Endpoint
/setChatStickerSet

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`).
- **setName** (string) - Required - Name of the sticker set to be linked to the chat.

### Request Example
```json
{
  "chatId": "-1001234567890",
  "setName": "my_awesome_stickers"
}
````

### Response

#### Success Response (200)

- **true** - Returns true on success.

#### Response Example

```json
true
```

````

--------------------------------

### Get My Commands with Telegraf.js

Source: https://telegraf.js.org/classes/Context

Fetches the bot's currently set commands. This method is deprecated; use Telegram.getMyCommands instead. Returns a Promise resolving to BotCommand[].

```javascript
ctx.getMyCommands()
````

---

### sticker Management API

Source: https://telegraf.js.org/interfaces/Scenes

API methods for managing stickers, including setting keywords, mask positions, titles, and thumbnails.

````APIDOC
## POST /setStickerKeywords

### Description
Sets keywords for a sticker. This method is the same as:
`sendMessage(chatId, 'keywords', { reply_markup: { inline_keyboard: [[{ text: 'keywords', callback_game: { bot_id: bot.botInfo.id } }]] } })`

### Method
POST

### Endpoint
/setStickerKeywords

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **sticker** (string) - Required - The sticker to set keywords for.
- **keywords** (string[]) - Optional - An array of keywords for the sticker.

### Request Example
```json
{
  "sticker": "sticker_file_id",
  "keywords": ["keyword1", "keyword2"]
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

````

```APIDOC
## POST /setStickerMaskPosition

### Description
Sets the mask position for a sticker. This method is the same as:
`sendMessage(chatId, 'mask_position', { reply_markup: { inline_keyboard: [[{ text: 'mask_position', callback_game: { bot_id: bot.botInfo.id } }]] } })`

### Method
POST

### Endpoint
/setStickerMaskPosition

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **sticker** (string) - Required - The sticker to set the mask position for.
- **mask_position** (MaskPosition) - Optional - The mask position details.

### Request Example
```json
{
  "sticker": "sticker_file_id",
  "mask_position": {
    "point": "forehead",
    "x_shift": 0.5,
    "y_shift": 0.5,
    "scale": 1.0
  }
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

````

```APIDOC
## POST /setStickerPositionInSet

### Description
Sets the position of a sticker in a sticker set. This method is deprecated; use `Telegram.setStickerPositionInSet` instead.

### Method
POST

### Endpoint
/setStickerPositionInSet

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **sticker** (string) - Required - The file identifier of the sticker.
- **position** (number) - Required - The new position of the sticker in the set (0-based index).

### Request Example
```json
{
  "sticker": "sticker_file_id",
  "position": 0
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

### See Also

- https://core.telegram.org/bots/api#setstickerpositioninset

````

```APIDOC
## POST /setStickerSetThumb

### Description
Sets a new thumbnail for a sticker set. This method is deprecated; use `Telegram.setStickerSetThumbnail` instead.

### Method
POST

### Endpoint
/setStickerSetThumb

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **name** (string) - Required - Name of the sticker set.
- **userId** (number) - Required - User identifier of the sticker set owner.
- **thumbnail** (string | InputFile) - Optional - A file path or a `InputFile` object for the thumbnail.

### Request Example
```json
{
  "name": "my_sticker_set",
  "userId": 123456789,
  "thumbnail": "path/to/thumbnail.png"
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

````

```APIDOC
## POST /setStickerSetThumbnail

### Description
Sets a new thumbnail for a sticker set.

### Method
POST

### Endpoint
/setStickerSetThumbnail

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **name** (string) - Required - Name of the sticker set.
- **userId** (number) - Required - User identifier of the sticker set owner.
- **thumbnail** (string | InputFile) - Optional - A file path or a `InputFile` object for the thumbnail.

### Request Example
```json
{
  "name": "my_sticker_set",
  "userId": 123456789,
  "thumbnail": "path/to/thumbnail.png"
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

````

```APIDOC
## POST /setStickerSetTitle

### Description
Sets a new title for a sticker set.

### Method
POST

### Endpoint
/setStickerSetTitle

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **name** (string) - Required - Name of the sticker set.
- **title** (string) - Required - New title of the sticker set.

### Request Example
```json
{
  "name": "my_sticker_set",
  "title": "My Awesome Stickers"
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

````

--------------------------------

### Composer.inlineQuery

Source: https://telegraf.js.org/classes/Scenes

Generates middleware for handling matching inline queries.

```APIDOC
## Composer.inlineQuery

### Description
Generates middleware for handling matching inline queries.

### Method
`static`

### Endpoint
`inlineQuery<C>(triggers, ...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
* **triggers** (Triggers<NarrowedContext<C, InlineQueryUpdate>>) - Required - The inline query triggers to match.
* **...fns** (MatchedMiddleware<C, "inline_query">) - Required - Middleware to run when an inline query matches.

### Request Example
```javascript
// Example usage would involve providing inline query triggers and middleware.
````

### Response

#### Success Response (200)

`MiddlewareFn<C>`

#### Response Example

```json
// Middleware function returned
```

````

--------------------------------

### Composer.cashtag Method

Source: https://telegraf.js.org/classes/Composer

Registers middleware to handle messages containing specific cashtags (e.g., $example). It accepts a single cashtag string or an array of cashtags.

```typescript
cashtag(cashtag: MaybeArray<string>, ...fns: MatchedMiddleware<C, "channel_post" | "message">): Composer<C>
````

---

### MemorySessionStore get Method

Source: https://telegraf.js.org/classes/MemorySessionStore

Retrieves a session by its name. Returns undefined if the session is not found. This method is part of the SyncSessionStore interface.

```typescript
get(name: string): undefined | T
```

---

### WizardScene Class

Source: https://telegraf.js.org/classes/Scenes

Overview of the WizardScene class, its type parameters, hierarchy, and implemented interfaces.

```APIDOC
## Class WizardScene<C>

### Type Parameters
#### C extends Context & {
  scene: SceneContextScene<C, WizardSessionData>;
  wizard: WizardContextWizard<C>;
}

### Hierarchy
- BaseScene<C>
  - WizardScene

### Implements
- MiddlewareObj<C>

### Index
- Constructors
- Properties
- Methods
```

---

### Get Sticker Set with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Fetches information about a sticker set by its name. Requires the 'setName' parameter. Returns a Promise resolving to StickerSet. Deprecated: use Telegram.getStickerSet.

```typescript
getStickerSet(setName: string): Promise<StickerSet>
```

---

### Get User Chat Boosts with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Retrieves the chat boosts for a user. This is a shorthand for Telegram.getUserChatBoosts and returns a Promise resolving to an array of UserChatBoosts.

```typescript
getUserChatBoosts(): Promise<UserChatBoosts[]>
```

---

### Composer.fork

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that runs other middleware in the background.

```APIDOC
## Composer.fork

### Description
Generates middleware that runs in the background.

### Method
`fork<C>(middleware): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **middleware** (Middleware<C>) - Required - The middleware to run in the background.

### Returns
`MiddlewareFn<C>`
```

---

### Get User Chat Boosts with Telegraf.js

Source: https://telegraf.js.org/classes/Context

Retrieves chat boosts for a user. This is a shorthand for Telegram.getUserChatBoosts. Returns a Promise resolving to UserChatBoosts[].

```javascript
ctx.getUserChatBoosts();
```

---

### Get My Default Administrator Rights with Telegraf.js

Source: https://telegraf.js.org/classes/Context

Retrieves the default administrator rights for the bot. Optionally accepts a 'forChannels' boolean. Returns a Promise resolving to ChatAdministratorRights.

```javascript
ctx.getMyDefaultAdministratorRights(extra);
```

---

### Get Chat Information with Telegraf.js

Source: https://telegraf.js.org/classes/Context

Retrieves information about a chat. This method accepts rest parameters and returns a Promise resolving to ChatFromGetChat.

```javascript
ctx.getChat(...args);
```

---

### Get Sticker Set (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Retrieves information about a sticker set by its name. Requires a string `name` parameter. Returns a Promise resolving to StickerSet.

```javascript
getStickerSet(name: string): Promise<StickerSet>
```

---

### Get Telegraf secret path component

Source: https://telegraf.js.org/classes/Telegraf-1

Returns a string representing the secret path component for the Telegraf instance.

```typescript
secretPathComponent(): string
```

---

### File Upload API

Source: https://telegraf.js.org/classes/Context

Methods for uploading sticker files.

```APIDOC
## POST /uploadStickerFile

### Description
Uploads a sticker file to Telegram servers. This method is used for uploading stickers that are not yet in a sticker set.

### Method
POST

### Endpoint
/uploadStickerFile

### Parameters
#### Request Body
- **sticker** (InputFile) - Required - The sticker file to upload.
- **sticker_format** (string) - Required - The format of the sticker, can be "video", "static", or "animated".

### Response
#### Success Response (200)
- **result** (File) - The uploaded file object.

### See
https://core.telegram.org/bots/api#uploadstickerfile
```

---

### getUserChatBoosts

Source: https://telegraf.js.org/classes/Telegram

Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object.

```APIDOC
## getUserChatBoosts

### Description
Get the list of boosts added to a chat by a user.

### Method
GET

### Endpoint
/getUserChatBoosts

### Parameters
#### Query Parameters
- **chat_id** (string | number) - Required - Unique identifier for the chat or username of the channel.
- **user_id** (number) - Required - Unique identifier of the target user.

### Request Example
N/A

### Response
#### Success Response (200)
- **boosts** (array) - An array of UserChatBoosts objects.

#### Response Example
[
  {
    "boost_id": "boost1",
    "add_date": 1678886400,
    "expiration_date": 1681305600
  }
]

```

---

### Create Command Handling Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Creates middleware specifically for handling Telegram commands. It accepts the command string or pattern and the middleware to execute when the command is received.

```typescript
command<C>(command: Triggers<NarrowedContext<C, { message: New & NonChannel & TextMessage; update_id: number; }>>, ...fns: NonemptyReadonlyArray<Middleware<Context<{ message: New & NonChannel & TextMessage; update_id: number; }> & Omit<C, keyof Context<Update>> & CommandContextExtn>>>): MiddlewareFn<C>
```

---

### Get Chat Menu Button

Source: https://telegraf.js.org/classes/Context

Retrieves the current value of the bot's menu button in the current private chat.

```APIDOC
## GET /getChatMenuButton

### Description
Retrieves the current value of the bot's menu button in the current private chat. Returns MenuButton on success.

### Method
GET

### Endpoint
/getChatMenuButton

### Response
#### Success Response (200)
- **MenuButton** - An object representing the bot's menu button.
```

---

### Get Chat Administrators with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Fetches a list of administrators for a given chat. It accepts rest parameters and returns a Promise resolving to an array of ChatMemberOwner or ChatMemberAdministrator.

```typescript
getChatAdministrators(...args: []): Promise<(ChatMemberOwner | ChatMemberAdministrator)[]>
```

---

### getChat

Source: https://telegraf.js.org/classes/Telegram

Get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.).

````APIDOC
## GET /getChat

### Description
Retrieves up-to-date information about a chat.

### Method
GET

### Endpoint
/getChat

### Parameters
#### Path Parameters
None

#### Query Parameters
- **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)

#### Request Body
None

### Request Example
```json
{
  "chatId": "12345"
}
````

### Response

#### Success Response (200)

- **ChatFromGetChat** (object) - Information about the chat.

#### Response Example

```json
{
  "id": 12345,
  "first_name": "John",
  "username": "john_doe"
}
```

````

--------------------------------

### getCustomEmojiStickers

Source: https://telegraf.js.org/classes/Telegram

Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Returns an Array of Sticker objects.

```APIDOC
## GET /getCustomEmojiStickers

### Description
Retrieves custom emoji stickers available for use as forum topic icons.

### Method
GET

### Endpoint
/getCustomEmojiStickers

### Parameters
#### Path Parameters
None

#### Query Parameters
- **custom_emoji_ids** (string[]) - Required - List of custom emoji IDs.

#### Request Body
None

### Request Example
```json
{
  "custom_emoji_ids": ["5368123456789012345"]
}
````

### Response

#### Success Response (200)

- **Array of Sticker** - A list of sticker objects.

#### Response Example

```json
[
  {
    "width": 128,
    "height": 128,
    "is_animated": false,
    "is_video": false,
    "format": "png",
    "emoji": "😀"
  }
]
```

````

--------------------------------

### Upload Sticker File

Source: https://telegraf.js.org/interfaces/Scenes

Uploads a sticker file to be used in a sticker set. This method requires the sticker file (as InputFile) and its format (video, static, or animated). It returns a Promise that resolves to a File object.

```javascript
uploadStickerFile(...args: [sticker: InputFile, sticker_format: "video" | "static" | "animated"]): Promise<File>
````

---

### Get Chat Information with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Retrieves information about a Telegram chat. This method accepts rest parameters and returns a Promise resolving to ChatFromGetChat.

```typescript
getChat(...args: []): Promise<ChatFromGetChat>
```

---

### Get Middleware Function in Telegraf.js

Source: https://telegraf.js.org/classes/Composer

Returns the middleware function for the composer. This function can be used to process updates manually.

```typescript
composer.middleware();
```

---

### Get Chat Menu Button with Telegraf.js

Source: https://telegraf.js.org/classes/Context

Retrieves the current menu button for a private chat. Returns a Promise resolving to MenuButton.

```javascript
ctx.getChatMenuButton();
```

---

### use

Source: https://telegraf.js.org/classes/Telegraf-1

Registers a general-purpose middleware. This middleware will be executed for every incoming update.

````APIDOC
## use

### Description
Registers a general-purpose middleware.

### Method
POST

### Endpoint
/use

### Parameters
#### Path Parameters
* **fns** (ReadonlyArray<Middleware<C>>)
  * Required
  * Middleware functions to be registered. The `...fns` syntax collects all arguments into an array.

### Response
#### Success Response (200)
* **Telegraf<C>** (Telegraf)
  * The Telegraf instance, allowing for method chaining.

### Request Example
```json
{
  "example": "bot.use((ctx, next) => { console.log('Received update:', ctx.updateType); next(); })"
}
````

### Response Example

```json
{
  "example": "Telegraf<Context>"
}
```

````

--------------------------------

### getMyName

Source: https://telegraf.js.org/classes/Telegram

Use this method to get the current bot name for the given user language.  It returns a Promise that resolves with the bot's name.

```APIDOC
## getMyName

### Description
Use this method to get the current bot name for a specific language.

### Method
GET

### Endpoint
/getMyName

### Parameters
#### Query Parameters
- **language_code** (string) - Optional - A two-letter ISO 639-1 language code.

### Request Example
N/A

### Response
#### Success Response (200)
- **name** (string) - The bot's name.

#### Response Example
{
  "name": "MyBot"
}

````

---

### Telegraf Class Constructor

Source: https://telegraf.js.org/classes/Telegraf-1

Initializes a new Telegraf bot instance with a Telegram API token and optional configuration.

````APIDOC
## Constructor: Telegraf<C>

### Description
Initializes a new Telegraf bot instance.

### Parameters
* **token** (string) - Your Telegram Bot API token.
* **`Optional` options** (Partial<Options<C>>) - Optional configuration settings for the Telegraf instance.

### Returns
Telegraf<C> - A new instance of the Telegraf bot.

### Example
```javascript
const { Telegraf } = require('telegraf');
const bot = new Telegraf('YOUR_BOT_TOKEN');
````

````

--------------------------------

### Get Bot Description (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Fetches the bot's description for a specific user language. The `getMyDescription` method accepts an optional `language_code`. It returns a `BotDescription` object.

```typescript
import { BotDescription } from "telegraf/types";

async function getBotDescription(languageCode?: string): Promise<BotDescription> {
  // Implementation to get bot description
  return {} as BotDescription;
}
````

---

### Create Forum Topic (Telegraf.js)

Source: https://telegraf.js.org/interfaces/Scenes

Creates a new topic in a forum supergroup. Requires the bot to be an administrator with `can_manage_topics` rights. Returns information about the created topic.

```javascript
bot.api.createForumTopic(chatId, "Topic Name", { iconEmoji: "💡" });
```

---

### Upload Sticker File (Telegraf.js)

Source: https://telegraf.js.org/classes/Context

Uploads a sticker file to be used with Telegram. Requires the sticker file and its format (video, static, or animated). Returns a promise that resolves to a File object.

```javascript
bot.api.uploadStickerFile(...args: [sticker: InputFile, sticker_format: "video" | "static" | "animated"]): Promise<File>
```

---

### Get enter middleware function in Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Returns a middleware function that can be used to enter the scene. This is typically used internally or for advanced composition.

```typescript
const enterMiddleware = wizardScene.enterMiddleware();
```

---

### getForumTopicIconStickers

Source: https://telegraf.js.org/classes/Telegram

Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects.

````APIDOC
## GET /getForumTopicIconStickers

### Description
Retrieves custom emoji stickers that can be used as forum topic icons.

### Method
GET

### Endpoint
/getForumTopicIconStickers

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
{}
````

### Response

#### Success Response (200)

- **Array of Sticker** - A list of sticker objects.

#### Response Example

```json
[
  {
    "width": 128,
    "height": 128,
    "is_animated": true,
    "is_video": false,
    "format": "webp",
    "emoji": "🔥"
  }
]
```

````

--------------------------------

### preCheckoutQuery

Source: https://telegraf.js.org/classes/Context

Provides access to the `pre_checkout_query` object from an update, which contains information about a pre-checkout query for payment.

```APIDOC
## preCheckoutQuery

### Description
A shorthand property to access the `pre_checkout_query` object from the current update. This is used to handle payment pre-checkout requests.

### Method
GET

### Endpoint
/websites/telegraf_js/preCheckoutQuery

### Parameters
None

### Response
#### Success Response (200)
* `PropOr<U, "pre_checkout_query">` - The pre-checkout query object or undefined if not present.

### Response Example
```json
{
  "id": "1234567890",
  "from": {
    "id": 123456789,
    "is_bot": false,
    "first_name": "John"
  },
  "currency": "USD",
  "total_amount": 1000,
  "invoice_payload": "invoice_payload_123"
}
````

````

--------------------------------

### Get Webhook Info (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Retrieves information about the bot's webhook status. This method takes no parameters. Returns a Promise resolving to WebhookInfo.

```javascript
getWebhookInfo(): Promise<WebhookInfo>
````

---

### Get Telegraf middleware function

Source: https://telegraf.js.org/classes/Telegraf-1

Returns the middleware function for the Telegraf instance. This function can be used to integrate Telegraf with other middleware systems.

```typescript
middleware(): MiddlewareFn<C>
```

---

### MemorySessionStore Constructor

Source: https://telegraf.js.org/classes/MemorySessionStore

Initializes a new instance of the MemorySessionStore class. This constructor is deprecated and recommends using Map.

```APIDOC
## new MemorySessionStore<T>(ttl?: number)

### Description
Initializes a new instance of the MemorySessionStore class. This constructor is deprecated and recommends using Map.

### Method
CONSTRUCTOR

### Parameters
#### ttl (number) - Optional
The time-to-live for sessions in milliseconds. Defaults to Infinity.

### Returns
MemorySessionStore<T>
```

---

### Get Updates (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Directly requests incoming updates. It's recommended to use `Telegraf::launch` instead. Accepts timeout, limit, offset, and allowedUpdates parameters. Returns a Promise resolving to an array of Update objects.

```javascript
getUpdates(timeout: number, limit: number, offset: number, allowedUpdates: undefined | readonly UpdateType[]): Promise<Update[]>
```

---

### Register help command middleware in Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Registers a middleware specifically for handling the `/help` command. It takes middleware functions as arguments.

```typescript
wizardScene.help(async (ctx) => {
  await ctx.reply("This is the help message.");
});
```

---

### Get My Default Administrator Rights with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Retrieves the default administrator rights for the bot in chats. Accepts an optional 'extra' parameter, including 'forChannels', and returns a Promise resolving to ChatAdministratorRights.

```typescript
getMyDefaultAdministratorRights(extra?: { forChannels?: boolean }): Promise<ChatAdministratorRights>
```

---

### Get middleware function in Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Returns a middleware function representing the entire wizard scene. This is useful when composing multiple scenes or middleware.

```typescript
const wizardMiddleware = wizardScene.middleware();
```

---

### POST /createForumTopic

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object.

````APIDOC
## POST /createForumTopic

### Description
Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object.

### Method
POST

### Endpoint
/createForumTopic

### Parameters
#### Path Parameters
- **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
- **name** (string) - Required - Topic name, 1-63 characters.
#### Query Parameters
- **icon_color** (string) - Optional - Unique identifier of the custom emoji as a string, or the emoji itself.

### Request Example
```json
{
  "chatId": "@group",
  "name": "General Discussion",
  "icon_color": "#007bff"
}
````

### Response

#### Success Response (200)

- **result** (object) - Information about the created topic.
  - **message_thread_id** (integer) - Unique identifier of the forum topic.
  - **name** (string) - Name of the forum topic.
  - **icon_color** (string) - Color of the icon in the form of a hexadecimal RGB color code.

#### Response Example

```json
{
  "ok": true,
  "result": {
    "message_thread_id": 1,
    "name": "General Discussion",
    "icon_color": "#007bff"
  }
}
```

````

--------------------------------

### Get Chat Member with Telegraf.js

Source: https://telegraf.js.org/classes/Context

Retrieves information about a specific chat member. Takes a userId as a parameter and returns a Promise resolving to ChatMember.

```javascript
ctx.getChatMember(...args)
````

---

### Sticker Management API

Source: https://telegraf.js.org/classes/Context

Methods related to setting and managing stickers within Telegram.

````APIDOC
## POST /setStickerKeywords

### Description
Sets a list of keywords for a sticker.

### Method
POST

### Endpoint
/setStickerKeywords

### Parameters
#### Request Body
- **sticker** (string) - Required - The sticker to set keywords for.
- **keywords** (string[]) - Optional - An array of keywords for the sticker.

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### Response Example
```json
{
  "ok": true,
  "result": true
}
````

````

```APIDOC
## POST /setStickerMaskPosition

### Description
Sets the mask position for a sticker.

### Method
POST

### Endpoint
/setStickerMaskPosition

### Parameters
#### Request Body
- **sticker** (string) - Required - The sticker to set the mask position for.
- **mask_position** (MaskPosition) - Optional - The mask position details.

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### Response Example
```json
{
  "ok": true,
  "result": true
}
````

````

```APIDOC
## POST /setStickerPositionInSet

### Description
Changes the position of a sticker in its set. Use this method to change the order of stickers in a set. The bot must be the owner of the set for this to work.

### Method
POST

### Endpoint
/setStickerPositionInSet

### Parameters
#### Request Body
- **sticker** (string) - Required - The sticker to change the position of.
- **position** (number) - Required - The new position of the sticker in the set (0-based).

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### Deprecated
This method is deprecated. Use `Telegram.setStickerPositionInSet` instead.

### See
https://core.telegram.org/bots/api#setstickerpositioninset
````

```APIDOC
## POST /setStickerSetThumb

### Description
Sets a new sticker set thumbnail. The file must be in PNG format and the size should not exceed 512 KB. The sticker set must contain at least one sticker.

### Method
POST

### Endpoint
/setStickerSetThumb

### Parameters
#### Request Body
- **name** (string) - Required - Name of the sticker set.
- **userId** (number) - Required - User identifier of the sticker set owner.
- **thumbnail** (string | InputFile) - Optional - A file ID or URL for the thumbnail.

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### Deprecated
This method is deprecated. Use `Telegram.setStickerSetThumbnail` instead.

### See
https://core.telegram.org/bots/api#setstickersetthumbnail
```

```APIDOC
## POST /setStickerSetThumbnail

### Description
Sets a new thumbnail for a sticker set. The file must be in PNG format and the size should not exceed 512 KB. The sticker set must contain at least one sticker.

### Method
POST

### Endpoint
/setStickerSetThumbnail

### Parameters
#### Request Body
- **name** (string) - Required - Name of the sticker set.
- **userId** (number) - Required - User identifier of the sticker set owner.
- **thumbnail** (string | InputFile) - Optional - A file ID or URL for the thumbnail.

### Response
#### Success Response (200)
- **result** (boolean) - True on success.
```

```APIDOC
## POST /setStickerSetTitle

### Description
Sets a new title for a sticker set. The bot must be the owner of the set for this to work.

### Method
POST

### Endpoint
/setStickerSetTitle

### Parameters
#### Request Body
- **name** (string) - Required - Name of the sticker set.
- **title** (string) - Required - New title for the sticker set.

### Response
#### Success Response (200)
- **result** (boolean) - True on success.
```

---

### Get Chat Administrators with Telegraf.js

Source: https://telegraf.js.org/classes/Context

Fetches a list of administrators for a given chat. This method uses rest parameters and returns a Promise resolving to an array of ChatMemberOwner or ChatMemberAdministrator.

```javascript
ctx.getChatAdministrators(...args);
```

---

### Composer.gameQuery

Source: https://telegraf.js.org/classes/Scenes

Creates middleware for handling game query updates.

```APIDOC
## Composer.gameQuery

### Description
Generates middleware for handling game queries.

### Method
`gameQuery<C>(...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **fns** (NonemptyReadonlyArray<Middleware<NarrowedContext<C, CallbackQueryUpdate<GameQuery>>>>) - Required - Middleware functions to execute for game queries.

### Returns
`MiddlewareFn<C>`
```

---

### LaunchOptions Interface Properties

Source: https://telegraf.js.org/interfaces/Telegraf

Defines the configurable options for launching a Telegraf bot, including allowed update types, dropping pending updates, and webhook configurations.

```typescript
interface LaunchOptions {
  allowedUpdates?: UpdateType[];
  dropPendingUpdates?: boolean;
  webhook?: {
    cb?: RequestListener<IncomingMessage, ServerResponse>;
    certificate?: InputFile;
    domain: string;
    hookPath?: string;
    host?: string;
    ipAddress?: string;
    maxConnections?: number;
    path?: string;
    port?: number;
    secretToken?: string;
    tlsOptions?: TlsOptions;
  };
}
```

---

### Get Chat Menu Button with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Retrieves the current value of the bot's menu button in a private chat. Returns a Promise resolving to MenuButton.

```typescript
getChatMenuButton(): Promise<MenuButton>
```

---

### Context Class Overview

Source: https://telegraf.js.org/classes/Context

This section provides an overview of the Telegraf.js Context class, including its constructors, properties, and accessors for interacting with Telegram data.

```APIDOC
## Class Context<U>

### Description
Represents the context of a Telegram update, providing convenient access to related data and methods.

### Hierarchy
- Context
  - SceneContext
  - WizardContext

### Constructors
#### constructor
`new Context<U>(update, telegram, botInfo): Context<U>`

##### Parameters
- `update` (U): The Telegram update object.
- `telegram` (Telegram): An instance of the Telegram API client.
- `botInfo` (UserFromGetMe): Information about the bot.

### Properties
- `botInfo` (UserFromGetMe): Readonly. Information about the bot.
- `state` (Record<string | symbol, any>): Readonly. A state object for custom data.
- `telegram` (Telegram): Readonly. The Telegram API client instance.
- `update` (U): Readonly. The raw Telegram update object.

### Accessors
- `callbackQuery`(): PropOr<U, "callback_query">
- `channelPost`(): PropOr<U, "channel_post">
- `chat`(): PropOr<GetUpdateContent<U>, "chat", undefined>
- `chatBoost`(): PropOr<U, "chat_boost">
- `chatJoinRequest`(): PropOr<U, "chat_join_request">
- `chatMember`(): PropOr<U, "chat_member">
- `chosenInlineResult`(): PropOr<U, "chosen_inline_result">
- `editedChannelPost`(): PropOr<U, "edited_channel_post">
- `editedMessage`(): PropOr<U, "edited_message">
- `from`(): GetUserFromAnySource<U>
- `inlineMessageId`(): undefined | string
- `inlineQuery`(): PropOr<U, "inline_query">

```

---

### Get leave middleware function in Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Returns a middleware function that can be used to leave the scene. This is typically used internally or for advanced composition.

```typescript
const leaveMiddleware = wizardScene.leaveMiddleware();
```

---

### Export Chat Invite Link (Telegraf.js)

Source: https://telegraf.js.org/interfaces/Scenes

Creates a new invite link for a chat. This method takes a rest parameter `...args` and returns a Promise that resolves to the invite link as a string.

```javascript
exportChatInviteLink(...args): Promise<string>
```

---

### Get Bot Commands (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Fetches the current list of commands registered for the bot. The `getMyCommands` method can take an optional `extra` parameter and returns an array of `BotCommand` objects.

```typescript
import { BotCommand } from "telegraf/types";

async function getBotCommands(extra?: {}): Promise<BotCommand[]> {
  // Implementation to get bot commands
  return [];
}
```

---

### Composer Methods

Source: https://telegraf.js.org/classes/Composer

Documentation for various methods available on the Composer class, including action, cashtag, command, and drop.

```APIDOC
## Methods

### action
* **action(triggers, ...fns): Composer<C>**
  * Description: Registers middleware for handling matching callback queries.
  * Parameters:
    * **triggers**: Triggers<NarrowedContext<C, CallbackQueryUpdate<CallbackQuery>>>
    * `...fns` (MatchedMiddleware<C, "callback_query">): Middleware functions for callback queries.
  * Returns: Composer<C>

### cashtag
* **cashtag(cashtag, ...fns): Composer<C>**
  * Parameters:
    * **cashtag**: MaybeArray<string>
    * `...fns` (MatchedMiddleware<C, "channel_post" | "message">): Middleware functions for cashtags.
  * Returns: Composer<C>

### command
* **command(command, ...fns): Composer<C>**
  * Description: Registers middleware for handling specified commands.
  * Parameters:
    * **command**: Triggers<NarrowedContext<C, {
        message: New & NonChannel & TextMessage;
        update_id: number;
      }>>
    * `...fns` (NonemptyReadonlyArray<Middleware<Context<{ message: New & NonChannel & TextMessage; update_id: number; }> & Omit<C, keyof Context<Update>> & CommandContextExtn>>): Middleware functions for commands.
  * Returns: Composer<C>

### drop
* **drop(predicate): Composer<C>**
  * Description: Registers middleware for dropping matching updates.
  * Parameters:
    * **predicate**: Predicate<C>
  * Returns: Composer<C>
```

---

### WizardScene API Endpoints

Source: https://telegraf.js.org/classes/Scenes

This section details the various methods available on the WizardScene class to register middleware for handling different types of updates and commands.

````APIDOC
## POST /wizardscene/command

### Description
Registers middleware for handling specified commands.

### Method
POST

### Endpoint
/wizardscene/command

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
```json
{
  "command": "string",
  "fns": "Middleware<Context<...>>[]"
}
````

### Request Example

```json
{
  "command": "/start",
  "fns": ["(ctx) => ctx.reply('Welcome!')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## POST /wizardscene/drop

### Description

Registers middleware for dropping matching updates.

### Method

POST

### Endpoint

/wizardscene/drop

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "predicate": "Predicate<C>"
}
```

### Request Example

```json
{
  "predicate": "(ctx) => ctx.message.text === 'ignore'"
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## POST /wizardscene/email

### Description

Registers middleware for handling messages with email addresses.

### Method

POST

### Endpoint

/wizardscene/email

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "email": "Triggers<C>",
  "fns": "MatchedMiddleware<C, 'channel_post' | 'message'>[]"
}
```

### Request Example

```json
{
  "email": "@example.com",
  "fns": ["(ctx) => ctx.reply('Email received!')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## POST /wizardscene/enter

### Description

Registers middleware to be executed when entering the scene.

### Method

POST

### Endpoint

/wizardscene/enter

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "fns": "Middleware<C>[]"
}
```

### Request Example

```json
{
  "fns": ["(ctx) => ctx.reply('Entering the scene...')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## GET /wizardscene/enterMiddleware

### Description

Returns the middleware function for entering the scene.

### Method

GET

### Endpoint

/wizardscene/enterMiddleware

### Parameters

None

### Response

#### Success Response (200)

Returns the middleware function.

#### Response Example

```json
{
  "middlewareFn": "(ctx, next) => { ... }"
}
```

## POST /wizardscene/filter

### Description

Registers middleware for filtering updates based on a predicate. Deprecated: use `Composer.drop`.

### Method

POST

### Endpoint

/wizardscene/filter

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "predicate": "Predicate<C>"
}
```

### Request Example

```json
{
  "predicate": "(ctx) => ctx.message.text.length > 10"
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## POST /wizardscene/gameQuery

### Description

Registers middleware for handling game queries.

### Method

POST

### Endpoint

/wizardscene/gameQuery

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "fns": "NonemptyReadonlyArray<Middleware<NarrowedContext<C, CallbackQueryUpdate<GameQuery>>>>"
}
```

### Request Example

```json
{
  "fns": ["(ctx) => ctx.answerGameQuery('Game started!')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## POST /wizardscene/guard

### Description

Registers middleware for handling updates matching a given type guard function. Deprecated: use `Composer.on`.

### Method

POST

### Endpoint

/wizardscene/guard

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "guardFn": "(update) => update is U",
  "fns": "NonemptyReadonlyArray<Middleware<NarrowedContext<C, U>, U>>"
}
```

### Request Example

```json
{
  "guardFn": "(update) => update.type === 'message' && update.message.text === 'secret'",
  "fns": ["(ctx) => ctx.reply('Secret received!')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## POST /wizardscene/hashtag

### Description

Registers middleware for handling messages containing specific hashtags.

### Method

POST

### Endpoint

/wizardscene/hashtag

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "hashtag": "MaybeArray<string>",
  "fns": "MatchedMiddleware<C, 'channel_post' | 'message'>[]"
}
```

### Request Example

```json
{
  "hashtag": "#help",
  "fns": ["(ctx) => ctx.reply('How can I help you?')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## POST /wizardscene/hears

### Description

Registers middleware for handling matching text messages.

### Method

POST

### Endpoint

/wizardscene/hears

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "triggers": "Triggers<NarrowedContext<C, ...>>",
  "fns": "MatchedMiddleware<C, 'text'>[]"
}
```

### Request Example

```json
{
  "triggers": ["hello", "hi"],
  "fns": ["(ctx) => ctx.reply('Hello there!')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## POST /wizardscene/help

### Description

Registers a middleware for handling the /help command.

### Method

POST

### Endpoint

/wizardscene/help

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "fns": "NonemptyReadonlyArray<Middleware<Context<...>>>"
}
```

### Request Example

```json
{
  "fns": ["(ctx) => ctx.reply('This is the help message.')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## POST /wizardscene/inlineQuery

### Description

Registers middleware for handling matching inline queries.

### Method

POST

### Endpoint

/wizardscene/inlineQuery

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "triggers": "Triggers<NarrowedContext<C, InlineQueryUpdate>>",
  "fns": "MatchedMiddleware<C, 'inline_query'>[]"
}
```

### Request Example

```json
{
  "triggers": ["search"],
  "fns": [
    "(ctx) => ctx.answerInlineQuery(["result1", "result2"])"
  ]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## POST /wizardscene/leave

### Description

Registers middleware to be executed when leaving the scene.

### Method

POST

### Endpoint

/wizardscene/leave

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "fns": "Middleware<C>[]"
}
```

### Request Example

```json
{
  "fns": ["(ctx) => ctx.reply('Leaving the scene...')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## GET /wizardscene/leaveMiddleware

### Description

Returns the middleware function for leaving the scene.

### Method

GET

### Endpoint

/wizardscene/leaveMiddleware

### Parameters

None

### Response

#### Success Response (200)

Returns the middleware function.

#### Response Example

```json
{
  "middlewareFn": "(ctx, next) => { ... }"
}
```

## POST /wizardscene/mention

### Description

Registers middleware for handling messages mentioning specific users or bots.

### Method

POST

### Endpoint

/wizardscene/mention

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "mention": "MaybeArray<string>",
  "fns": "MatchedMiddleware<C, 'channel_post' | 'message'>[]"
}
```

### Request Example

```json
{
  "mention": "@mybot",
  "fns": ["(ctx) => ctx.reply('You mentioned me!')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

## GET /wizardscene/middleware

### Description

Returns the middleware function for the wizard scene.

### Method

GET

### Endpoint

/wizardscene/middleware

### Parameters

None

### Response

#### Success Response (200)

Returns the middleware function.

#### Response Example

```json
{
  "middlewareFn": "(ctx, next) => { ... }"
}
```

## POST /wizardscene/on

### Description

Registers middleware for handling updates narrowed by update types or filter queries.

### Method

POST

### Endpoint

/wizardscene/on

### Parameters

#### Path Parameters

None

#### Query Parameters

None

#### Request Body

```json
{
  "filters": "MaybeArray<Filter>",
  "fns": "NonemptyReadonlyArray<Middleware<FilteredContext<C, Filter>>>"
}
```

### Request Example

```json
{
  "filters": "message",
  "fns": ["(ctx) => ctx.reply('Message received!')"]
}
```

### Response

#### Success Response (200)

Returns the WizardScene instance for chaining.

#### Response Example

```json
{
  "message": "WizardScene instance returned"
}
```

````

--------------------------------

### Get Bot Information (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Retrieves basic information about the bot itself. This method, `getMe`, requires no parameters and returns a `UserFromGetMe` object containing details like the bot's username and ID.

```typescript
import { UserFromGetMe } from "telegraf/types";

async function getBotInfo(): Promise<UserFromGetMe> {
  // Implementation to get bot information
  return {} as UserFromGetMe;
}
````

---

### getChatMenuButton

Source: https://telegraf.js.org/classes/Telegram

Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success.

````APIDOC
## GET /getChatMenuButton

### Description
Retrieves the current menu button for a private chat or the default menu button.

### Method
GET

### Endpoint
/getChatMenuButton

### Parameters
#### Path Parameters
None

#### Query Parameters
- **chatId** (number) - Optional - Unique identifier for the target private chat. If not specified, the default bot's menu button will be returned.

#### Request Body
None

### Request Example
```json
{
  "chatId": 12345
}
````

### Response

#### Success Response (200)

- **MenuButton** (object) - The menu button information.

#### Response Example

```json
{
  "type": "commands"
}
```

````

--------------------------------

### Get Sticker Set with Telegraf.js

Source: https://telegraf.js.org/classes/Context

Fetches a sticker set by its name. This method is deprecated; use Telegram.getStickerSet instead. Requires a setName string and returns a Promise resolving to StickerSet.

```javascript
ctx.getStickerSet(setName)
````

---

### sticker file upload API

Source: https://telegraf.js.org/interfaces/Scenes

API method for uploading sticker files.

````APIDOC
## POST /uploadStickerFile

### Description
Uploads a sticker file to be used for creating stickers. Requires the bot to have the `change_info` administrator right.

### Method
POST

### Endpoint
/uploadStickerFile

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **sticker** (InputFile) - Required - File to upload. The file can be sent lazily using `InputFile`.
- **sticker_format** (string) - Required - Format of the uploaded sticker file (`video`, `static`, or `animated`).

### Request Example
```json
{
  "sticker": "path/to/sticker.webp",
  "sticker_format": "static"
}
````

### Response

#### Success Response (200)

- **result** (File) - Information about the uploaded file.

#### Response Example

```json
{
  "result": {
    "file_id": "CAACAgIAAxkBAAEu_sZl_mB_1g_Example",
    "file_unique_id": "AQAD_mB_1g_Example",
    "file_size": 1024,
    "file_path": "stickers/static/example.webp"
  }
}
```

### See Also

- https://core.telegram.org/bots/api#uploadstickerfile

````

--------------------------------

### Registering /help command middleware

Source: https://telegraf.js.org/classes/Telegraf-1

Registers a middleware specifically for handling the /help command. It accepts a series of middleware functions to be executed when the /help command is received. Dependencies include Telegraf.

```typescript
help(...fns: MatchedMiddleware<C, "text">): Telegraf<C>
````

---

### Get User Profile Photos (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Retrieves a list of user profile photos. Accepts `userId` (number), and optional `offset` (number) and `limit` (number) parameters. Returns a Promise resolving to UserProfilePhotos.

```javascript
getUserProfilePhotos(userId: number, offset?: number, limit?: number): Promise<UserProfilePhotos>
```

---

### replyWithGame

Source: https://telegraf.js.org/interfaces/Scenes

Sends a game to a chat.

````APIDOC
## POST /replyWithGame

### Description
Sends a game to a chat.

### Method
POST

### Endpoint
/replyWithGame

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **gameName** (string) - Required - The short name of the game.
- **extra** (object) - Optional - Additional parameters for the game message, excluding 'chat_id' and 'game_short_name'.

### Request Example
```json
{
  "gameName": "my_game_123"
}
````

### Response

#### Success Response (200)

- **message** (object) - The sent game message object.

#### Response Example

```json
{
  "message": {
    "message_id": 12345,
    "chat": {
      "id": 123456789,
      "type": "private"
    },
    "game": {
      "title": "Awesome Game"
    }
  }
}
```

````

--------------------------------

### createForumTopic

Source: https://telegraf.js.org/classes/Context

Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object.

```APIDOC
## POST /createForumTopic

### Description
Creates a topic in a forum supergroup chat. Requires `can_manage_topics` administrator rights.

### Method
POST

### Endpoint
/createForumTopic

### Parameters
#### Path Parameters
- None

#### Query Parameters
- **name** (string) - Required - Topic name, 1-60 characters.
- **icon_color** (number) - Optional - Color of the topic icon in RGB format.

#### Request Body
- **chat_id** (string | number) - Required - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
- **name** (string) - Required - Topic name, 1-60 characters.
- **icon_color** (number) - Optional - Color of the topic icon in RGB format.
- **short_name** (string) - Optional - Unique name of the topic, 1-32 characters. Ignored if the topic has a short name, or if the chat is not a forum.

### Request Example
```json
{
  "chat_id": "@channelusername",
  "name": "New Topic",
  "icon_color": 7307641
}
````

### Response

#### Success Response (200)

- **message_thread_id** (number) - Unique identifier for the created topic.
- **name** (string) - Name of the topic.
- **icon_color** (number) - Color of the topic icon.
- **icon_emoji_id** (string) - Optional - Emoji sticker to be used as the icon for the topic.

#### Response Example

```json
{
  "message_thread_id": 1,
  "name": "New Topic",
  "icon_color": 7307641
}
```

````

--------------------------------

### Composer.settings

Source: https://telegraf.js.org/classes/Composer

Registers a middleware for handling the /settings command.

```APIDOC
## Composer.settings

### Description
Registers a middleware for handling the /settings command.

### Method
Composer.settings

### Parameters
#### Parameters
- **Rest** ...fns: NonemptyReadonlyArray<Middleware<Context<{message: New & NonChannel & TextMessage;
update_id: number;
}> & Omit<C, keyof Context<Update>> & CommandContextExtn>>

### Returns
Composer<C>
````

---

### Get Forum Topic Icon Stickers (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Retrieves custom emoji stickers suitable for use as forum topic icons. This method requires no parameters and returns an array of `Sticker` objects. It's specifically for bots that manage or interact with Telegram's forum features.

```typescript
import { Sticker } from "telegraf/types";

async function getForumTopicIconStickers(): Promise<Sticker[]> {
  // Implementation to get forum topic icon stickers
  return [];
}
```

---

### Static.action

Source: https://telegraf.js.org/classes/Composer

Generates middleware for handling matching callback queries.

```APIDOC
## Static.action

### Description
Generates middleware for handling matching callback queries.

### Method
Static.action

### Type Parameters
- **C**: Context<Update>

### Parameters
#### Parameters
- **triggers**: Triggers<NarrowedContext<C, CallbackQueryUpdate<CallbackQuery>>>
- **Rest** ...fns: MatchedMiddleware<C, "callback_query">

### Returns
MiddlewareFn<C>
```

---

### Get Bot Name (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Retrieves the current bot name for a specified user language. Requires a language code string as input. Returns a Promise resolving to BotName.

```javascript
getMyName(language_code?: string): Promise<BotName>
```

---

### Router Constructor

Source: https://telegraf.js.org/classes/Router

Details on how to create a new instance of the Router class.

```APIDOC
## Constructors

### constructor

* `new Router<C>(routeFn: RouteFn<C>, handlers?: Map<string, Middleware<C>>): Router<C>`

#### Description

Initializes a new instance of the Router class.

#### Type Parameters

* **C**: Extends `Context<Update>`, the context type.

#### Parameters

* **routeFn**: `RouteFn<C>` - The function used to define the routing logic.
* **handlers**: `Map<string, Middleware<C>>` (optional) - A map of route handlers.

#### Returns

* `Router<C>` - A new Router instance.
```

---

### Get Chat Administrators (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Fetches a list of administrators for a given chat. It requires the `chatId` and returns an array of `ChatMemberOwner` or `ChatMemberAdministrator` objects. This is useful for understanding permissions within a group or channel.

```typescript
import { ChatMemberOwner, ChatMemberAdministrator } from "telegraf/types";

async function getChatAdmins(
  chatId: string | number,
): Promise<ChatMemberOwner | ChatMemberAdministrator> {
  // Implementation to get chat administrators
  return {} as ChatMemberOwner | ChatMemberAdministrator;
}
```

---

### Reply with Audio using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends an audio file. Accepts a file path or InputFile, and optional caption. Returns the sent AudioMessage.

```typescript
/**
 * Sends an audio file.
 * @param args - The audio file and optional extra parameters like caption.
 * @returns Promise<AudioMessage>
 */
async replyWithAudio(...args: [audio: string | InputFile, extra?: { caption?: string | FmtString<string>; }]): Promise<AudioMessage>
```

---

### Composer.command Method

Source: https://telegraf.js.org/classes/Composer

Registers middleware to handle specific bot commands (e.g., /start, /help). It takes the command name or an array of command names and associated middleware functions.

```typescript
command(command: Triggers<NarrowedContext<C, { message: New & NonChannel & TextMessage; update_id: number; }>>, ...fns: NonemptyReadonlyArray<Middleware<Context<{ message: New & NonChannel & TextMessage; update_id: number; }> & Omit<C, keyof Context<Update>> & CommandContextExtn}>>): Composer<C>
```

---

### answerCbQuery

Source: https://telegraf.js.org/interfaces/Scenes

This method is used to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.

````APIDOC
## answerCbQuery

### Description
Sends an answer to a callback query.

### Method
POST

### Endpoint
N/A (Method on context object)

### Parameters
#### Rest Parameters
- `text` (string) - Optional - Text of the notification. If not specified, nothing will be shown.
- `extra` (object) - Optional - Additional parameters.

### Request Example
```json
// Example parameters
{
  "text": "Callback query response",
  "show_alert": true
}
````

### Response

#### Success Response (200)

- `result` (boolean) - Indicates if the operation was successful.

#### Response Example

```json
true
```

````

--------------------------------

### Lazy Middleware Factory with Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Provides a way to create middleware dynamically using a factory function. This is useful for lazy initialization or when middleware configuration depends on runtime context.

```typescript
const dynamicMiddleware = Composer.lazy<MyContext>(async (ctx) => {
  // Perform some async operation to determine the middleware
  return Composer.hears('dynamic', (ctx) => ctx.reply('This middleware was loaded dynamically!'))
})
````

---

### Get Game High Scores (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Fetches the high scores for a specific game. This method requires `userId`, and optionally `inlineMessageId`, `chatId`, and `messageId`. It returns an array of `GameHighScore` objects.

```typescript
import { GameHighScore } from "telegraf/types";

async function getGameHighScores(
  userId: number,
  inlineMessageId?: string,
  chatId?: number,
  messageId?: number,
): Promise<GameHighScore[]> {
  // Implementation to get game high scores
  return [];
}
```

---

### Generate middleware for callback queries (Telegraf.js)

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that handles matching callback queries from inline keyboards. It takes triggers to identify specific callback data and applies middleware functions accordingly.

```typescript
`Static` action
  * action<C>(triggers, ...fns): MiddlewareFn<C>
  * Generates middleware for handling matching callback queries.
#### Type Parameters
    * #### C extends Context<Update>
#### Parameters
    * ##### triggers: Triggers<NarrowedContext<C, CallbackQueryUpdate<CallbackQuery>>>
    * ##### `Rest` ...fns: MatchedMiddleware<C, "callback_query">
`Rest`
#### Returns MiddlewareFn<C>
```

---

### Set Sticker Keywords

Source: https://telegraf.js.org/interfaces/Scenes

Sets a list of keywords for a sticker. This method takes a sticker identifier and an optional array of keywords as input. It returns a Promise that resolves to true on success.

```javascript
setStickerKeywords(...args: [sticker: string, keywords?: string[]]): Promise<true>
```

---

### Get User Chat Boosts (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Fetches the list of boosts added to a chat by a specific user. Requires `chat_id` (string or number) and `user_id` (number). The bot needs administrator rights. Returns a Promise resolving to an array of UserChatBoosts.

```javascript
getUserChatBoosts(chat_id: string | number, user_id: number): Promise<UserChatBoosts[]>
```

---

### Get Chat Member with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Retrieves information about a specific chat member using their user ID. The method accepts rest parameters, including the userId, and returns a Promise resolving to ChatMember.

```typescript
getChatMember(...args: [userId: number]): Promise<ChatMember>
```

---

### Composer.reaction Middleware

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that triggers based on specific message reactions.

````APIDOC
## Composer.reaction

### Description
Creates middleware that triggers based on specific message reactions (added or removed). The `reaction` parameter can be a single reaction or an array of reactions.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage:
// bot.use(Composer.reaction('👍', ctx => ctx.reply('Thumbs up received!')))
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### answerCbQuery

Source: https://telegraf.js.org/classes/Context

Use this method to send answers to callback queries sent from inline keyboards. The answer can be a notification or an alert.

```APIDOC
## answerCbQuery

### Description
Sends answers to callback queries received from inline keyboards. The response can be a simple notification shown to the user or a modal alert.

### Method
POST

### Endpoint
/websites/telegraf_js/answerCbQuery

### Parameters
#### Path Parameters
* None

#### Query Parameters
* None

#### Request Body
* `text` (string) - Optional - Text of the notification. If not specified, nothing will be shown to the user.
* `extra` (object) - Optional - Additional parameters, excluding `chat_id`, `callback_query_id`, and `text`.

### Request Example
```json
{
  "text": "Button clicked!",
  "show_alert": false
}
````

### Response

#### Success Response (200)

- `true` (boolean) - Indicates that the callback query was successfully answered.

#### Response Example

```json
{
  "ok": true,
  "result": true
}
```

### See Also

- https://core.telegram.org/bots/api#answercallbackquery

````

--------------------------------

### Get Chat Menu Button (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Retrieves the current menu button configuration for a private chat or the default bot menu button. It accepts an optional `chatId`. The method returns a `MenuButton` object.

```typescript
import { MenuButton } from "telegraf/types";

async function getChatMenuButton(chatId?: number): Promise<MenuButton> {
  // Implementation to get chat menu button
  return {} as MenuButton;
}
````

---

### Get Custom Emoji Stickers (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Fetches custom emoji stickers based on provided `custom_emoji_ids`. It returns an array of `Sticker` objects. This is useful for bots that utilize custom emoji in their responses or functionalities.

```typescript
import { Sticker } from "telegraf/types";

async function getCustomEmojiStickers(
  customEmojiIds: string[],
): Promise<Sticker[]> {
  // Implementation to get custom emoji stickers
  return [];
}
```

---

### Telegraf Constructor

Source: https://telegraf.js.org/classes/Telegraf-1

Initializes a new Telegraf instance for Telegram bot development. It requires a bot token and accepts optional configuration options.

```typescript
new Telegraf<C>(token, options?): Telegraf<C>
```

---

### Telegraf.js: Send Poll or Quiz

Source: https://telegraf.js.org/classes/Context

Sends a poll or a quiz to a Telegram chat. Requires the question text and an array of options. Quizzes require correct answer setup within the poll options.

```typescript
async sendPoll(poll: string, options: readonly string[], extra?: Omit<{}, "type" | "chat_id" | "question" | "options">): Promise<PollMessage>
```

```typescript
async sendQuiz(quiz: string, options: readonly string[], extra?: Omit<{}, "type" | "chat_id" | "question" | "options">): Promise<PollMessage>
```

---

### Handle Inline Queries with Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Generates middleware for processing inline queries sent by users. This allows bots to respond to user input directly within any chat, providing search results or interactive elements.

```typescript
Composer.inlineQuery<MyContext>(["search", "find"], async (ctx) => {
  const query = ctx.inlineQuery;
  // Return inline query results
});
```

---

### Launch Telegraf bot with optional callback

Source: https://telegraf.js.org/classes/Telegraf-1

Launches the Telegraf bot. It can optionally take a callback function that executes once the bot is launched. Returns a Promise that resolves when the bot has launched.

```typescript
launch(onLaunch?: () => void): Promise<void>
```

---

### Telegram Constructor

Source: https://telegraf.js.org/classes/Telegram

Initializes a new instance of the Telegram class with the provided token and options.

```APIDOC
## Constructor Telegram

### Description
Initializes a new instance of the Telegram class.

### Method
constructor

### Parameters
#### Path Parameters
- **token** (string) - Required - The bot token for Telegram API authentication.
- **options** (Partial<Options>) - Optional - Additional configuration options for the Telegram client.
- **response** (Response) - Optional - A response object, potentially for handling initial connection states.

#### Returns
Telegram - An instance of the Telegram class.
```

---

### Get Chat Information (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Retrieves up-to-date information about a Telegram chat. This includes the current name of a user in private chats or the username of a group or channel. It requires the `chatId` and returns a `ChatFromGetChat` object.

```typescript
import { ChatFromGetChat } from "telegraf/types";

async function getChatInfo(chatId: string | number): Promise<ChatFromGetChat> {
  // Implementation to get chat information
  return {} as ChatFromGetChat;
}
```

---

### replyWithVideoNote

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send a video note. See the Telegram Bot API documentation for detailed usage.

````APIDOC
## POST /replyWithVideoNote

### Description
Sends a video note to the user.

### Method
POST

### Endpoint
/replyWithVideoNote

### Parameters
#### Request Body
- **videoNote** (string | InputFileVideoNote) - Required - The video note to send.
- **extra** (object) - Optional - Extra parameters.

### Request Example
```json
{
  "videoNote": "..."
}
````

### Response

#### Success Response (200)

- **VideoNoteMessage** (object) - The sent video note message.

#### Response Example

```json
{}
```

### See

https://core.telegram.org/bots/api#sendvideonote

````

--------------------------------

### Get Chat Member (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Retrieves information about a specific member of a chat. This method requires both the `chatId` and the `userId` of the member. It returns a `ChatMember` object containing details about the user's status in the chat.

```typescript
import { ChatMember } from "telegraf/types";

async function getChatMemberInfo(
  chatId: string | number,
  userId: number
): Promise<ChatMember> {
  // Implementation to get chat member information
  return {} as ChatMember;
}
````

---

### createNewStickerSet

Source: https://telegraf.js.org/classes/Context

Use this method to create a new sticker set or add a new sticker to a set created by the bot. The bot must be the creator of the set. Returns True on success.

````APIDOC
## POST /createNewStickerSet

### Description
Creates a new sticker set or adds a new sticker to a set created by the bot. The bot must be the creator of the set.

### Method
POST

### Endpoint
/createNewStickerSet

### Parameters
#### Path Parameters
- None

#### Query Parameters
- **name** (string) - Required - Name of the sticker set. Must be unique and between 1 and 64 characters long. Should be without "@TelegramStickers" suffix, only containing characters from "a-z", "0-9" and "_.
- **title** (string) - Required - Sticker set title, 1-64 characters.
- **stickerData** (object) - Required - Contains sticker data and type.
  - **sticker** (string) - Required - File is using multipart/form-data (e.g. a .WEBP file).
  - **emoji_list** (string[]) - Required - One or more emoji corresponding to the sticker.
  - **sticker_type** (string) - Required - Type of the sticker (regular, mask, or custom_emoji).
  - **mask_position** (object) - Optional - Position where the mask should be placed on the face.
    - **point** (string) - Required - The part of the face the mask is applied to (optional). One of “forehead”, “eyes”, “mouth”, or “chin”.
    - **x_shift** (number) - Required - Shift by X-axis according to the mask's position with respect to player head (0.0-1.0).
    - **y_shift** (number) - Required - Shift by Y-axis according to the mask's position with respect to player head (0.0-1.0).
    - **scale** (number) - Required - Shift by Y-axis according to the mask's position with respect to player head (0.0-1.0).

#### Request Body
- **user_id** (number) - Required - User identifier for whom the sticker set is created.
- **name** (string) - Required - Name of the sticker set.
- **title** (string) - Required - Sticker set title.
- **stickers** (array) - Required - A JSON-serialized list of 1-100 attached stickers. You can use inputSticker objects to import a sticker.
  - **sticker** (string) - Required - File is using multipart/form-data (e.g. a .WEBP file).
  - **emoji_list** (string[]) - Required - One or more emoji corresponding to the sticker.
  - **sticker_type** (string) - Required - Type of the sticker (regular, mask, or custom_emoji).
  - **mask_position** (object) - Optional - Position where the mask should be placed on the face.

### Request Example
```json
{
  "user_id": 123456789,
  "name": "my_sticker_set",
  "title": "My Awesome Stickers",
  "stickers": [
    {
      "sticker": "attach://sticker.webp",
      "emoji_list": ["👍", "🙌"],
      "sticker_type": "regular"
    }
  ]
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - True if successful.

#### Response Example

```json
{
  "ok": true
}
```

````

--------------------------------

### Create Game Query Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Creates middleware specifically for handling game query updates from Telegram. It accepts a variable list of middleware functions to process these queries.

```typescript
gameQuery<C>(...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, CallbackQueryUpdate<GameQuery>>>>): MiddlewareFn<C>
````

---

### Webhook Integration

Source: https://telegraf.js.org/index

This section details how to set up webhook integration for your Telegraf bot, including launching with webhook configurations and attaching to existing HTTP servers.

````APIDOC
## POST /webhook

### Description
Sets up a webhook for receiving Telegram updates. This method is preferred for launching a bot with webhook support.

### Method
POST

### Endpoint
/webhook

### Parameters
#### Request Body
- **webhookDomain** (string) - Required - The public domain for the webhook.
- **port** (number) - Optional - The port to listen on.
- **path** (string) - Optional - The path to listen for webhook updates. Defaults to `bot.secretPathComponent()`.
- **secretToken** (string) - Optional - A secret token for security, sent back in a header.

### Request Example
```json
{
  "webhookDomain": "yourdomain.com",
  "port": 8080,
  "path": "/your-secret-path",
  "secretToken": "your-secret-token"
}
````

### Response

#### Success Response (200)

Indicates the webhook has been successfully configured and the bot is listening for updates.

#### Response Example

```json
{
  "status": "webhook_listening"
}
```

````

```APIDOC
## Attaching Telegraf to an Existing HTTP Server

### Description
Use `createWebhook()` to attach Telegraf to an existing HTTP or HTTPS server.

### Method
GET/POST (depending on server setup)

### Endpoint
`/` (or your server's configured route)

### Parameters
#### Request Body (for `createWebhook()`)
- **domain** (string) - Required - The public domain for the webhook.

### Request Example (HTTP)
```javascript
import { createServer } from "http";
import { Telegraf } from 'telegraf';

const bot = new Telegraf(token);

createServer(await bot.createWebhook({ domain: "example.com" })).listen(3000);
````

### Request Example (HTTPS)

```javascript
import { createServer } from "https";
import { Telegraf } from "telegraf";

const bot = new Telegraf(token);
const tlsOptions = {
  /* your TLS options */
};

createServer(
  tlsOptions,
  await bot.createWebhook({ domain: "example.com" }),
).listen(8443);
```

````

--------------------------------

### Create Forum Topic using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Creates a new topic in a forum supergroup. The bot must be an administrator with 'can_manage_topics' rights. Returns information about the created topic.

```typescript
import { Telegraf } from 'telegraf';
import { ForumTopic } from 'telegraf/types';

const bot = new Telegraf<Context>('YOUR_BOT_TOKEN');

async function createForumTopic(name: string, extra?: Record<string, any>): Promise<ForumTopic> {
  // The 'createForumTopic' method creates a new topic.
  // 'name' is the topic's display name.
  // 'extra' can include options like 'icon_emoji_id'.
  return await bot.telegram.createForumTopic(name, extra);
}
````

---

### Answer Callback Query using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Answers a callback query made by a user. It can optionally include text to be displayed to the user. This method returns a promise that resolves to true.

```typescript
answerCbQuery(text?: string, extra?: Omit<{}, "text" | "chat_id" | "callback_query_id">): Promise<true>
```

---

### POST /createChatInviteLink

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to create a new invite link for a chat; the bot must be an administrator in the chat for this to work. The link for the chat can be used by anyone to join the chat. The bot must have the can_invite_users administrator rights. Returns the new invite link on success.

````APIDOC
## POST /createChatInviteLink

### Description
Use this method to create a new invite link for a chat; the bot must be an administrator in the chat for this to work. The link for the chat can be used by anyone to join the chat. The bot must have the can_invite_users administrator rights. Returns the new invite link on success.

### Method
POST

### Endpoint
/createChatInviteLink

### Parameters
#### Path Parameters
- **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
#### Query Parameters
- **name** (string) - Optional - Name of the invite link; 0-32 characters
- **expireDate** (integer) - Optional - Point in time (Unix timestamp) when the invite link will become invalid
- **memberLimit** (integer) - Optional - Maximum number of users that can be linked to the chat; 1-99999
- **createsJoinRequest** (boolean) - Optional - True, if the users are supposed to be approved by an administrator before joining the chat

### Request Example
```json
{
  "chatId": "@group",
  "name": "Summer Meetup",
  "expireDate": 1678886400,
  "memberLimit": 50,
  "createsJoinRequest": true
}
````

### Response

#### Success Response (200)

- **result** (object) - Information about the created invite link.
  - **invite_link** (string) - The invite link (new).
  - **creator** (object) - Creator of the link, information about the user.
  - **is_primary** (boolean) - True, if the link is primary.
  - **is_revoked** (boolean) - True, if the link is revoked.

#### Response Example

```json
{
  "ok": true,
  "result": {
    "invite_link": "https://t.me/+abcdefg12345",
    "creator": {
      "id": 123456789,
      "is_bot": false,
      "first_name": "John",
      "last_name": "Doe"
    },
    "is_primary": false,
    "is_revoked": false
  }
}
```

````

--------------------------------

### Set Sticker Keywords (Telegraf.js)

Source: https://telegraf.js.org/classes/Context

Sets keywords for a sticker. This method takes a sticker identifier and an optional array of keywords as input. It returns a promise that resolves to true on success.

```javascript
bot.api.setStickerKeywords(...args: [sticker: string, keywords?: string[]]): Promise<true>
````

---

### Reply with Video using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a video to a chat. Accepts a video file path or InputFile and optional extra parameters, including a caption.

```typescript
/**
 * Sends a video to a chat.
 * @param video The video to send (file path or InputFile).
 * @param extra Optional additional parameters, including a caption.
 * @returns A promise that resolves with the VideoMessage.
 */
replyWithVideo(video: string | InputFile, extra?: { caption?: string | FmtString<string>; }): Promise<VideoMessage>
```

---

### WizardScene.action Method

Source: https://telegraf.js.org/classes/Scenes

Registers middleware to handle specific callback query triggers within the WizardScene. This is used to respond to button presses or inline keyboard interactions.

```typescript
action(triggers: Triggers<NarrowedContext<C, CallbackQueryUpdate<CallbackQuery>>>, ...fns: MatchedMiddleware<C, "callback_query">): WizardScene<C>
```

---

### replyWithInvoice

Source: https://telegraf.js.org/interfaces/Scenes

Sends a product invoice to a chat.

````APIDOC
## POST /replyWithInvoice

### Description
Sends a product invoice to a chat.

### Method
POST

### Endpoint
/replyWithInvoice

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **invoice** (object) - Required - An object containing invoice details.
  - **title** (string) - Required - Product name.
  - **description** (string) - Required - Product description.
  - **payload** (string) - Required - Bot-defined invoice payload.
  - **provider_token** (string) - Required - Bot's payment provider token.
  - **currency** (string) - Required - Three-letter ISO 4217 currency code.
  - **prices** (array) - Required - Price list for the product.
    - **label** (string) - Required - Portion label.
    - **amount** (integer) - Required - Price of the portion in the smallest entities of the currency (e.g., kopecks for RUB, cents for USD).
  - **max_tip_amount** (integer) - Optional - The maximum amount that can be received as a tip for the invoice in the smallest entities of the currency.
  - **suggested_tip_amounts** (array) - Optional - An array of integers, representing the amounts that the user can choose to tip besides the amount in the `start_parameter`.
  - **provider_data** (object) - Optional - JSON-serialized data about the receipt.
  - **photo_url** (string) - Optional - URL of the product photo.
  - **photo_size** (integer) - Optional - Photo width.
  - **photo_width** (integer) - Optional - Photo height.
  - **photo_height** (integer) - Optional - Photo height.
  - **need_name** (boolean) - Optional - Pass True if you require the customer's name.
  - **need_phone_number** (boolean) - Optional - Pass True if you require the customer's phone number.
  - **need_email** (boolean) - Optional - Pass True if you require the customer's email address.
  - **need_shipping_address** (boolean) - Optional - Pass True if you require the customer's shipping address.
  - **send_phone_number_to_provider** (boolean) - Optional - Pass True if you want to send the phone number to the provider.
  - **send_email_to_provider** (boolean) - Optional - Pass True if you want to send the email address to the provider.
  - **is_flexible** (boolean) - Optional - Pass True if the final price depends on the shipping method.
  - **start_parameter** (string) - Optional - Unique deep-link parameter that was used to generate this invoice.
- **extra** (object) - Optional - Additional parameters for the invoice message, excluding specific invoice fields and 'chat_id'.

### Request Example
```json
{
  "invoice": {
    "title": "Awesome T-Shirt",
    "description": "High-quality cotton t-shirt",
    "payload": "unique_invoice_payload",
    "provider_token": "YOUR_PROVIDER_TOKEN",
    "currency": "USD",
    "prices": [
      { "label": "T-Shirt", "amount": 2000 },
      { "label": "Shipping", "amount": 500 }
    ],
    "photo_url": "https://example.com/tshirt.jpg",
    "need_name": true,
    "is_flexible": true
  }
}
````

### Response

#### Success Response (200)

- **message** (object) - The sent invoice message object.

#### Response Example

```json
{
  "message": {
    "message_id": 12345,
    "chat": {
      "id": 123456789,
      "type": "private"
    },
    "invoice": {
      "title": "Awesome T-Shirt",
      "description": "High-quality cotton t-shirt",
      "start_parameter": "unique_invoice_payload",
      "currency": "USD",
      "total_amount": 2500
    }
  }
}
```

````

--------------------------------

### Reply with Sticker using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a sticker to a chat. Accepts a sticker file path or InputFile and optional extra parameters.

```typescript
/**
 * Sends a sticker to a chat.
 * @param sticker The sticker to send (file path or InputFile).
 * @param extra Optional additional parameters.
 * @returns A promise that resolves with the StickerMessage.
 */
replyWithSticker(sticker: string | InputFile, extra?: Omit<Parameters<typeof telegram.sendSticker>[1], "chat_id" | "sticker">): Promise<StickerMessage>
````

---

### Answer Pre-Checkout Query using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Answers a pre-checkout query. This method is used to confirm or reject a payment attempt. It takes a boolean indicating success and an optional error message. Returns a promise that resolves to true.

```typescript
answerPreCheckoutQuery(ok: boolean, errorMessage?: string): Promise<true>
```

---

### Register /settings Command Handler with Telegraf.js

Source: https://telegraf.js.org/classes/Composer

The `settings` middleware registers a handler specifically for the `/settings` command. This is a common pattern for bots to allow users to configure their preferences.

```typescript
import { Composer } from "telegraf";
import { Context } from "telegraf/typings/context";
import { CommandContextExtn } from "telegraf/typings/composer";

const bot = new Composer<Context>();

bot.settings(async (ctx: Context & CommandContextExtn, next) => {
  console.log("Settings command received.");
  await ctx.reply("Welcome to the settings page!");
  // Add your settings logic here
  return next();
});

// You can also chain multiple middleware functions for the settings command
bot.settings(
  (ctx, next) => {
    console.log("First settings middleware.");
    return next();
  },
  async (ctx, next) => {
    console.log("Second settings middleware.");
    await ctx.reply("Processing settings...");
    return next();
  },
);
```

---

### Generating webhook domain options

Source: https://telegraf.js.org/classes/Telegraf-1

A private helper method to generate options for webhook configuration, including the domain, path, and URL. It takes an options object with domain and an optional path. Dependencies include string and path.

```typescript
getDomainOpts(opts: {
  domain: string;
  path?: string;
}): {
  domain: string;
  path: string;
  url: string;
}
```

---

### Use Middleware

Source: https://telegraf.js.org/classes/Scenes

Registers a general middleware function.

````APIDOC
## Use Middleware

### Description
Registers a middleware function.

### Method
`composer.use(...fns)`

### Parameters
#### Path Parameters
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **WizardScene<C>** - The scene context.

#### Response Example

```json
{
  "scene": "WizardScene"
}
```

````

--------------------------------

### Telegraf Methods

Source: https://telegraf.js.org/classes/Telegraf-1

A comprehensive list of methods available on the Telegraf instance for handling various Telegram updates and bot functionalities.

```APIDOC
## Methods

### action
Handles `callback_query.game_short_name`.

### cashtag
Handles messages containing cashtags.

### catch
Handles errors that occur during update processing.

### command
Handles specific commands (e.g., `/start`).

### createWebhook
Creates a webhook endpoint for receiving updates.

### drop
Skips updates that match the given filters.

### email
Handles messages containing email addresses.

### filter
Filters updates based on a provided predicate function.

### gameQuery
Handles `callback_query.game_short_name`.

### getDomainOpts
Retrieves domain options for webhook setup.

### guard
Provides a way to guard middleware execution based on conditions.

### handleError
Custom error handling logic.

### handleUpdate
Internal method to process incoming updates.

### hashtag
Handles messages containing hashtags.

### hears
Handles messages that match a given string or regular expression.

### help
Handles the `/help` command.

### inlineQuery
Handles incoming inline queries.

### launch
Starts the bot, either via polling or webhooks.

### mention
Handles messages mentioning the bot.

### middleware
Returns the main middleware for the bot.

### on
Handles updates of specific types (e.g., 'text', 'sticker').

### optional
Marks middleware as optional.

### passThru
Allows updates to pass through without stopping the middleware chain.

### phone
Handles messages containing phone numbers.

### reaction
Handles reactions to messages.

### reply
Sends a reply message to the chat.

### secretPathComponent
Configures the secret path component for webhooks.

### settings
Provides access to bot settings.

### spoiler
Handles messages containing spoiler text.

### start
Starts the bot using polling.

### startPolling
Initiates polling for updates from Telegram.

### startWebhook
Starts the bot using webhooks.

### stop
Stops the bot.

### tap
Performs an action on an update without modifying it.

### textLink
Handles messages containing text links.

### textMention
Handles messages containing text mentions.

### unwrap
Unwraps middleware from a composer.

### url
Handles messages containing URLs.

### use
Adds middleware to the bot's update processing chain.

### webhookCallback
Handles incoming updates via webhook.

### acl
Provides Access Control List functionality.

### admin
Checks if the user is an admin.

### branch
Creates a middleware branch based on conditions.

### chatType
Filters middleware based on chat type (private, group, etc.).

### compose
Composes multiple middleware functions into one.

### creator
Checks if the user is the creator of the bot.

### dispatch
Dispatches updates to the appropriate middleware handlers.

### log
Logs update processing information.

### private
Filters middleware for private chats.

````

---

### replyWithVideo

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send a video. See the Telegram Bot API documentation for detailed usage.

````APIDOC
## POST /replyWithVideo

### Description
Sends a video to the user.

### Method
POST

### Endpoint
/replyWithVideo

### Parameters
#### Request Body
- **video** (string | InputFile) - Required - The video to send.
- **extra** (object) - Optional - Extra parameters, including caption.

### Request Example
```json
{
  "video": "...",
  "extra": { "caption": "..." }
}
````

### Response

#### Success Response (200)

- **VideoMessage** (object) - The sent video message.

#### Response Example

```json
{}
```

### See

https://core.telegram.org/bots/api#sendvideo

````

--------------------------------

### Composer Constructor

Source: https://telegraf.js.org/classes/Composer

Initializes a new Composer instance with a set of middleware functions. This is the fundamental way to create a composer object that can then be used to group other middleware.

```typescript
new Composer<C>(...fns): Composer<C>
````

---

### Create Chat Invite Link using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Creates a new invite link for a chat. The bot must be an administrator with the 'can_invite_users' permission. Returns the invite link details.

```typescript
import { Telegraf } from "telegraf";
import { ChatInviteLink } from "telegraf/types";

const bot = new Telegraf<Context>("YOUR_BOT_TOKEN");

async function createInviteLink(
  extra?: Record<string, any>,
): Promise<ChatInviteLink> {
  // The 'createChatInviteLink' method generates a new invite link.
  // 'extra' can include parameters like 'name', 'expire_date', etc.
  return await bot.telegram.createChatInviteLink(extra);
}
```

---

### replyWithGame

Source: https://telegraf.js.org/classes/Context

Sends a game to a chat.

````APIDOC
## POST /websites/telegraf_js

### Description
Sends a game to a chat.

### Method
POST

### Endpoint
/websites/telegraf_js

### Parameters
#### Request Body
- **gameName** (string) - Short name of the game, serves as the unique game identifier.
- **extra** (object) - Optional - Additional parameters, excluding `chat_id` and `game_short_name`.

### Response
#### Success Response (200)
- **result** (object) - The sent `GameMessage` object.

### Response Example
```json
{
  "result": {
    "message_id": 123,
    "from": {
      "id": 456,
      "is_bot": true,
      "first_name": "TestBot"
    },
    "chat": {
      "id": 789,
      "type": "private"
    },
    "date": 1678886400,
    "game": {
      "title": "Awesome Game"
    }
  }
}
````

### See

https://core.telegram.org/bots/api#sendgame

````

--------------------------------

### addStickerToSet

Source: https://telegraf.js.org/interfaces/Scenes

This method adds a new sticker to a set created by the bot. Requires the user to be the creator of the sticker set.

```APIDOC
## addStickerToSet

### Description
Adds a new sticker to a set created by the bot.

### Method
POST

### Endpoint
N/A (Method on context object)

### Parameters
#### Rest Parameters
- `name` (string) - Required - Sticker set name.
- `stickerData` (object) - Required - Sticker data.

### Request Example
```json
// Example parameters
{
  "name": "my_sticker_set",
  "stickerData": { ... }
}
````

### Response

#### Success Response (200)

- `result` (boolean) - Indicates if the operation was successful.

#### Response Example

```json
true
```

````

--------------------------------

### Promote Chat Member with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Promotes a chat member to administrator. Requires userId and optional extra parameters for promotion rights. Returns a Promise resolving to true.

```typescript
promoteChatMember(...args: [userId: number, extra: Omit<{}, "chat_id" | "user_id">]): Promise<true>
````

---

### Create Cashtag Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that triggers on specific cashtags. It accepts a cashtag (or an array of cashtags) and a variable number of middleware functions to execute when a match is found.

```typescript
cashtag<C>(cashtag: MaybeArray<string>, ...fns: MatchedMiddleware<C, "channel_post" | "message">): MiddlewareFn<C>
```

---

### Reaction Middleware

Source: https://telegraf.js.org/classes/Scenes

Registers middleware for handling specific reaction updates.

````APIDOC
## Reaction Middleware

### Description
Registers middleware for handling specific reaction updates (added or removed).

### Method
`composer.reaction(reaction, ...fns)`

### Parameters
#### Path Parameters
- **reaction** (MaybeArray<ReactionAddedOrRemoved>) - Required - The reaction triggers.
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "reaction": "👍",
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **WizardScene<C>** - The scene context.

#### Response Example

```json
{
  "scene": "WizardScene"
}
```

````

--------------------------------

### answerGameQuery

Source: https://telegraf.js.org/classes/Context

Use this method to send a response to an inline query that was sent to your bot.

```APIDOC
## answerGameQuery

### Description
Responds to an inline query. This method is used to provide results for an inline query initiated by a user.

### Method
POST

### Endpoint
/websites/telegraf_js/answerGameQuery

### Parameters
#### Path Parameters
* None

#### Query Parameters
* None

#### Request Body
* `url` (string) - Required - URL of the game to be launched. The URL must be a valid HTTPS URL.

### Request Example
```json
{
  "url": "https://example.com/game"
}
````

### Response

#### Success Response (200)

- `true` (boolean) - Indicates that the game query was successfully answered.

#### Response Example

```json
{
  "ok": true,
  "result": true
}
```

### See Also

- https://core.telegram.org/bots/api#answercallbackquery

````

--------------------------------

### Composer.inlineQuery

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware for handling matching inline queries.

```APIDOC
## POST /api/users

### Description
Generates middleware for handling matching inline queries.

### Method
POST

### Endpoint
/api/users

### Parameters
#### Request Body
- **triggers** (Array<string>) - Required - The inline query triggers to listen for.
- **...fns** (Array<MiddlewareFn>) - Required - The middleware functions to execute when a trigger matches.
````

---

### Context Methods

Source: https://telegraf.js.org/classes/Context

This section lists the available methods on the Context object in Telegraf.js, which allow for various bot functionalities like sending messages, managing chats, and handling user interactions.

```APIDOC
## Methods

### send methods
- `sendAnimation(animation: string | InputFile, extra?: ExtraAnimation)`
- `sendAudio(audio: string | InputFile, extra?: ExtraAudio)`
- `sendChatAction(action: ChatAction)`
- `sendContact(contact: Contact, extra?: ExtraContact)`
- `sendDice(dice: DiceParameters, extra?: ExtraDice)`
- `sendDocument(document: string | InputFile, extra?: ExtraDocument)`
- `sendGame(gameName: string, extra?: ExtraGame)`
- `sendInvoice(invoice: Invoice, extra?: ExtraInvoice)`
- `sendLocation(location: Location, extra?: ExtraLocation)`
- `sendMediaGroup(media: MediaGroup, extra?: ExtraMediaGroup)`
- `sendPhoto(photo: string | InputFile, extra?: ExtraPhoto)`
- `sendPoll(poll: PollOptions, extra?: ExtraPoll)`
- `sendSticker(sticker: string | InputFile, extra?: ExtraSticker)`
- `sendVenue(venue: Venue, extra?: ExtraVenue)`
- `sendVideo(video: string | InputFile, extra?: ExtraVideo)`
- `sendVideoNote(videoNote: string | InputFile, extra?: ExtraVideoNote)`
- `sendVoice(voice: string | InputFile, extra?: ExtraVoice)`

### message modification methods
- `editMessageCaption(caption: string, extra?: ExtraEditMessageCaption)`
- `editMessageLiveLocation(location: Location, extra?: ExtraEditMessageLiveLocation)`
- `editMessageMedia(media: Media, extra?: ExtraEditMessageMedia)`
- `editMessageReplyMarkup(markup: InlineKeyboardMarkup, extra?: ExtraEditMessageReplyMarkup)`
- `editMessageText(text: string, extra?: ExtraEditMessageText)`
- `stopMessageLiveLocation(extra?: ExtraStopMessageLiveLocation)`

### message management methods
- `copyMessage(chatId: number | string, messageId: number, extra?: ExtraCopyMessage)`
- `copyMessages(chatId: number | string, messageIds: number[], extra?: ExtraCopyMessages)`
- `deleteMessage(messageId?: number)`
- `deleteMessages(messageIds: number[])`
- `forwardMessage(chatId: number | string, messageId: number)`
- `forwardMessages(chatId: number | string, messageIds: number[])`
- `pinChatMessage(messageId: number, options?: PinChatMessageOptions)`
- `unpinChatMessage(messageId?: number)`
- `unpinAllChatMessages()`

### chat methods
- `getChat()`
- `getChatAdministrators()`
- `getChatMember(userId: number)`
- `getChatMembersCount()`
- `getChatMenuButton()`
- `getMyCommands()`
- `getMyDefaultAdministratorRights()`
- `getStickerSet(name: string)`
- `getUserChatBoosts(userId: number)`
- `banChatMember(userId: number, options?: BanChatMemberOptions)`
- `unbanChatMember(userId: number)`
- `banChatSenderChat(senderChatId: number)`
- `unbanChatSenderChat(senderChatId: number)`
- `restrictChatMember(userId: number, permissions: ChatPermissions, options?: RestrictChatMemberOptions)`
- `promoteChatMember(userId: number, options?: PromoteChatMemberOptions)`
- `setChatAdministratorCustomTitle(userId: number, title: string)`
- `setChatDescription(description: string)`
- `setChatMenuButton(menuButton: MenuButton, options?: SetChatMenuButtonOptions)`
- `setChatPermissions(permissions: ChatPermissions)`
- `setChatPhoto(photo: string | InputFile)`
- `setChatStickerSet(stickerSetName: string)`
- `setChatTitle(title: string)`
- `leaveChat(chatId: number | string)`
- `createChatInviteLink(expireDate?: number, memberLimit?: number, pendingPreCheckoutQuery?: string)`
- `editChatInviteLink(inviteLink: string, expireDate?: number, memberLimit?: number, pendingPreCheckoutQuery?: string)`
- `revokeChatInviteLink(inviteLink: string)`
- `approveChatJoinRequest(userId: number, queryId: string)`
- `declineChatJoinRequest(userId: number, queryId: string)`
- `createForumTopic(title: string, options?: CreateForumTopicOptions)`
- `editForumTopic(messageId: number, title: string)`
- `closeForumTopic(messageId: number)`
- `reopenForumTopic(messageId: number)`
- `deleteForumTopic(messageId: number)`
- `unpinAllForumTopicMessages(messageId: number)`
- `closeGeneralForumTopic()`
- `reopenGeneralForumTopic()`
- `hideGeneralForumTopic()`
- `unhideGeneralForumTopic()`

### other methods
- `reply(text: any, extra?: ExtraReplyMessage)`
- `replyWithHTML(html: string, extra?: ExtraReplyMessage)`
- `replyWithMarkdown(markdown: string, extra?: ExtraReplyMessage)`
- `replyWithMarkdownV2(markdown: string, extra?: ExtraReplyMessage)`
- `replyWithPhoto(photo: string | InputFile, extra?: ExtraPhoto)`
- `replyWithAudio(audio: string | InputFile, extra?: ExtraAudio)`
- `replyWithVideo(video: string | InputFile, extra?: ExtraVideo)`
- `replyWithAnimation(animation: string | InputFile, extra?: ExtraAnimation)`
- `replyWithDocument(document: string | InputFile, extra?: ExtraDocument)`
- `replyWithSticker(sticker: string | InputFile, extra?: ExtraSticker)`
- `replyWithVideoNote(videoNote: string | InputFile, extra?: ExtraVideoNote)`
- `replyWithVoice(voice: string | InputFile, extra?: ExtraVoice)`
- `replyWithChatAction(action: ChatAction)`
- `replyWithContact(contact: Contact, extra?: ExtraContact)`
- `replyWithLocation(location: Location, extra?: ExtraLocation)`
- `replyWithVenue(venue: Venue, extra?: ExtraVenue)`
- `replyWithPoll(poll: PollOptions, extra?: ExtraPoll)`
- `replyWithQuiz(quiz: QuizOptions, extra?: ExtraQuiz)`
- `replyWithGame(gameName: string, extra?: ExtraGame)`
- `replyWithInvoice(invoice: Invoice, extra?: ExtraInvoice)`
- `replyWithDice(dice: DiceParameters, extra?: ExtraDice)`
- `replyWithCarousel(chatId: number | string, businesses: Business[]): Promise<Message>`
- `answerCbQuery(callbackQueryId: string, text?: string, showAlert?: boolean, url?: string, cacheTime?: number)`
- `answerShippingQuery(shippingQueryId: string, ok: boolean, shippingOptions?: InlineQueryResultArticle[], error?: string)`
- `answerPreCheckoutQuery(preCheckoutQueryId: string, ok: boolean, errorMessage?: string)`
- `answerInlineQuery(inlineQueryId: string, results: InlineQueryResult[], extra?: AnswerInlineQueryExtra)`
- `answerGameQuery(text: string)`
- `exportChatInviteLink(title: string)`
- `setCustomEmojiStickerSetThumbnail(stickerSetName: string, customEmojiId: string)`
- `setStickerEmojiList(sticker: string | InputFile, emojiList: string[])`
- `setStickerKeywords(sticker: string | InputFile, keywords: string)`
- `setStickerMaskPosition(sticker: string | InputFile, maskPosition: MaskPosition)`
- `setStickerPositionInSet(sticker: string | InputFile, position: number)`
- `setStickerSetThumbnail(stickerSet: string | InputFile, sticker: string | InputFile)`
- `setStickerSetTitle(name: string, title: string)`
- `uploadStickerFile(sticker: string | InputFile)`
- `deleteSticker(stickerId: string)`
- `deleteStickerSet(name: string)`
- `addStickerToSet(userId: number, name: string, emojis: string, pngSticker: string | InputFile, maskPosition?: MaskPosition, tgsSticker?: string | InputFile, webpSticker?: string | InputFile)`
- `createNewStickerSet(userId: number, name: string, title: string, emojis: string, pngSticker: string | InputFile, containsMasks: boolean, maskPosition?: MaskPosition, tgsSticker?: string | InputFile, webpSticker?: string | InputFile)`
- `setMyCommands(commands: BotCommand[])`
- `setMyDefaultAdministratorRights(rights: BotAdminRights)`
- `setPassportDataErrors(userId: number, errors: PassportElementError[])`
- `getPassportDataErrors(userId: number)`
- `getMessageReaction(messageId: number, options?: GetMessageReactionParameters)`
- `setMessageReaction(messageId: number, reaction: ReactionType | ReactionType[], isBig?: boolean, isAnonymous?: boolean)`
- `deleteMessageReaction(messageId: number)`
- `getMessageReactionCount(messageId: number, options?: GetMessageReactionCountParameters)`
- `react(messageId: number, reaction: ReactionType | ReactionType[], isBig?: boolean, isAnonymous?: boolean)`
- `webAppData()`
- `webhookReply()`
```

---

### Reply with Video Note using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a video note to a chat. Accepts a video note file path or InputFileVideoNote and optional extra parameters.

```typescript
/**
 * Sends a video note to a chat.
 * @param videoNote The video note to send (file path or InputFileVideoNote).
 * @param extra Optional additional parameters.
 * @returns A promise that resolves with the VideoNoteMessage.
 */
replyWithVideoNote(videoNote: string | InputFileVideoNote, extra?: Omit<Parameters<typeof telegram.sendVideoNote>[1], "chat_id" | "video_note">): Promise<VideoNoteMessage>
```

---

### Composer.unwrap Middleware

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that unwraps a handler, allowing for cleaner middleware composition.

````APIDOC
## Composer.unwrap

### Description
Generates middleware that unwraps a handler. This is useful for cleaner middleware composition, especially when dealing with nested handlers or complex logic.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage:
// const handler = (ctx) => ctx.reply('Unwrapped handler');
// bot.use(Composer.unwrap(handler))
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### Working with Files

Source: https://telegraf.js.org/index

Explains how to send various file types (files, buffers, streams, URLs) using Telegraf, including specifying filenames.

```APIDOC
## Sending Files with Telegraf

### Description
Telegraf supports sending files using different sources: existing `file_id`, local file paths, URLs, Buffers, and ReadStreams. You can also provide an optional filename.

### Method
POST (typically via `replyWith...` methods)

### Endpoint
N/A (part of message sending)

### Parameters
#### Request Body (Examples for `replyWith...` methods)
- **file_id** (string) - Existing file ID.
- **Input.fromLocalFile(path)** - Path to a local file.
- **Input.fromReadableStream(stream)** - A readable stream.
- **Input.fromBuffer(buffer)** - A Buffer object.
- **Input.fromURL(url)** - A URL to the file.
- **Input.fromURLStream(url, filename)** - A URL to the file with an optional filename.

### Request Example
```javascript
import { Telegraf, Input } from 'telegraf';
import fs from 'fs';

const bot = new Telegraf(token);

bot.on('message', async (ctx) => {
  // resend existing file by file_id
  await ctx.replyWithSticker('123123jkbhj6b');

  // send file from local path
  await ctx.replyWithVideo(Input.fromLocalFile('/path/to/video.mp4'));

  // send file from readable stream
  await ctx.replyWithVideo(
    Input.fromReadableStream(fs.createReadStream('/path/to/video.mp4'))
  );

  // send file from buffer
  await ctx.replyWithVoice(Input.fromBuffer(Buffer.alloc(100)));

  // send file from URL via Telegram server
  await ctx.replyWithPhoto(Input.fromURL('https://picsum.photos/200/300/'));

  // send file from URL with specific filename
  await ctx.replyWithPhoto(
    Input.fromURLStream('https://picsum.photos/200/300/?random', 'kitten.jpg')
  );
});
````

````

--------------------------------

### Create Dispatch Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that dispatches updates to different handlers based on a routing function. It requires a function to determine the route key and a record of handlers.

```typescript
dispatch<C, Handlers extends Record<string | number | symbol, Middleware<C>>>(routeFn: (ctx) => MaybePromise<keyof Handlers>, handlers: Handlers): Middleware<C>
````

---

### Reply with Sticker using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a sticker message. Accepts a sticker file path or InputFile and optional extra parameters.

```javascript
replyWithSticker(sticker: string | InputFile, extra?: Omit<{}, "chat_id" | "sticker">): Promise<StickerMessage>
```

---

### Static action

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware for handling callback queries that match specific button triggers. This is essential for interactive keyboards.

````APIDOC
## Static action

### Description
Generates middleware for handling matching callback queries.

### Method
POST

### Endpoint
/action

### Parameters
#### Path Parameters
* **triggers** (Triggers<NarrowedContext<C, CallbackQueryUpdate<CallbackQuery>>>)
  * Required
  * The callback query data or patterns to match.
* **fns** (MatchedMiddleware<C, "callback_query">)
  * Required
  * Middleware functions to execute when a matching callback query is received.

### Response
#### Success Response (200)
* **MiddlewareFn<C>** (MiddlewareFn)
  * A middleware function that filters and handles callback queries.

### Request Example
```json
{
  "example": "bot.use(Telegraf.action('learn-more', (ctx) => ctx.reply('More info...')))"
}
````

### Response Example

```json
{
  "example": "MiddlewareFn"
}
```

````

--------------------------------

### Create Lazy Middleware with Telegraf.js

Source: https://telegraf.js.org/classes/Composer

Allows creating middleware dynamically using a factory function. The factory function receives the context and returns the actual middleware. Useful for lazy initialization.

```typescript
const lazyMiddleware = Composer.lazy(async (ctx) => {
  // Fetch some data or perform async operation
  const data = await fetchData();
  return Composer.hears('some_command', (ctx) => {
    ctx.reply(data);
  });
});
````

---

### theme settings

Source: https://telegraf.js.org/interfaces/Scenes

Settings related to the theme of the user interface.

```APIDOC
## Theme

### Description
Specifies the theme preference for the user interface.

### Options
- **OSLightDark**: The theme follows the operating system's light or dark mode setting.
```

---

### Admin Middleware (Static)

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that responds only to chat admins and the chat creator.

````APIDOC
## Admin Middleware (Static)

### Description
Generates middleware responding only to chat admins and chat creator.

### Method
`Composer.admin<C>(...fns)`

### Type Parameters
- **C** extends Context<Update>

### Parameters
#### Path Parameters
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **MiddlewareFn<C>** - The middleware function.

#### Response Example

```json
{
  "middleware": "adminMiddleware"
}
```

````

--------------------------------

### Send Video with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a video to a chat. Accepts a video file path or InputFile and an optional caption. Returns a VideoMessage.

```typescript
await ctx.sendVideo(videoPathOrFile, { caption: 'Optional caption' });
````

---

### MemorySessionStore Constructor

Source: https://telegraf.js.org/classes/MemorySessionStore

Initializes a new instance of the MemorySessionStore class. It accepts an optional time-to-live (ttl) parameter, which defaults to Infinity.

```typescript
new MemorySessionStore<T>(ttl?: number): MemorySessionStore<T>
```

---

### replyWithQuiz

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send a quiz. See the Telegram Bot API documentation for detailed usage.

````APIDOC
## POST /replyWithQuiz

### Description
Sends a quiz to the user.

### Method
POST

### Endpoint
/replyWithQuiz

### Parameters
#### Request Body
- **question** (string) - Required - The quiz question.
- **options** (array) - Required - An array of quiz options.
- **extra** (object) - Optional - Extra parameters.

### Request Example
```json
{
  "question": "What is the capital of France?",
  "options": ["Paris", "London", "Berlin"]
}
````

### Response

#### Success Response (200)

- **PollMessage** (object) - The sent quiz message.

#### Response Example

```json
{}
```

### See

https://core.telegram.org/bots/api#sendpoll

````

--------------------------------

### Send Sticker with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a sticker to a chat. Accepts a sticker file path or InputFile and optional extra parameters. Returns a StickerMessage upon success.

```typescript
await ctx.sendSticker(stickerPathOrFile, { ...extra });
````

---

### Register middleware for /settings command (Telegraf.js)

Source: https://telegraf.js.org/classes/Scenes

Registers a middleware function to handle the /settings command. It expects a specific context structure including a message that is new, non-channel, and a text message, along with command context extensions.

```typescript
settings(...fns): WizardScene<C>
  * Registers a middleware for handling /settings
#### Parameters
    * ##### `Rest` ...fns: NonemptyReadonlyArray<Middleware<Context<{
message: New & NonChannel & TextMessage;
update_id: number;
}> & Omit<C, keyof Context<Update>> & CommandContextExtn>>
`Rest`
#### Returns WizardScene<C>
```

---

### sendSticker API

Source: https://telegraf.js.org/interfaces/Scenes

Sends a sticker to a chat. Requires either a sticker file ID or a sticker path.

````APIDOC
## POST /sendSticker

### Description
Sends a sticker to a chat. Can accept a sticker file ID or a path to a sticker file.

### Method
POST

### Endpoint
/sendSticker

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **sticker** (string | InputFile) - Required - The sticker to send.
- **extra** (Omit<{}, "chat_id" | "sticker">) - Optional - Additional parameters for the sticker message.

### Request Example
```json
{
  "sticker": "<sticker_file_id_or_path>",
  "extra": {}
}
````

### Response

#### Success Response (200)

- **StickerMessage** - An object representing the sent sticker message.

#### Response Example

```json
{
  "message_id": 12345,
  "sticker": {
    "width": 512,
    "height": 512,
    "is_animated": false,
    "is_video": false,
    "file_id": "<file_id>",
    "file_unique_id": "<unique_file_id>",
    "width": 512,
    "height": 512
  }
}
```

````

--------------------------------

### Static url Method

Source: https://telegraf.js.org/classes/Scenes

Creates a middleware that triggers when a message contains a URL matching the specified pattern. It allows chaining multiple middleware functions to handle the URL.

```APIDOC
## `Static` url

### Description
Creates a middleware function that handles messages containing URLs matching a given pattern. Multiple middleware functions can be chained to process the matched URLs.

### Method
`static`

### Endpoint
N/A (This is a static method for creating middleware)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Parameters
* **url** (`Triggers<C>`) - Required - A trigger pattern or string to match against URLs in messages.
* **`...fns`** (`MatchedMiddleware<C, "channel_post" | "message">`) - Optional - One or more middleware functions to execute when a URL matches the pattern.

### Returns
`MiddlewareFn<C>` - A Telegraf middleware function that can be used with the bot.

### Request Example
```javascript
const bot = new Telegraf(TOKEN);

bot.url(/^(https:\/\/example\.com\/\S+)$/, (ctx) => {
  ctx.reply(`You sent an example URL: ${ctx.match[0]}`);
});
````

### Response

#### Success Response (Middleware Execution)

- **`ctx.match`** (RegExpMatchArray | undefined) - If a URL is matched, this contains the result of the regex match.

#### Response Example

If the bot receives a message with "https://example.com/test":

```json
{
  "message": {
    "text": "Check out https://example.com/test"
  }
}
```

And the middleware would be executed, potentially replying with: "You sent an example URL: https://example.com/test"

````

--------------------------------

### Reply with Animation using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends an animation. Accepts a file path or InputFile, and optional caption. Returns the sent AnimationMessage.

```typescript
/**
 * Sends an animation.
 * @param args - The animation file and optional extra parameters like caption.
 * @returns Promise<AnimationMessage>
 */
async replyWithAnimation(...args: [animation: string | InputFile, extra?: { caption?: string | FmtString<string>; }]): Promise<AnimationMessage>
````

---

### Answer Pre-Checkout Query

Source: https://telegraf.js.org/classes/Context

Answers a pre-checkout query. This method is used to confirm or deny a payment attempt.

```typescript
answerPreCheckoutQuery(...args: [ok: boolean, errorMessage?: string]): Promise<true>
```

---

### Create Branch Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that conditionally executes other middleware based on a predicate. It takes a predicate, a middleware to run if the predicate is true, and another for when it's false.

```typescript
branch<C>(predicate: boolean | Predicate<C> | AsyncPredicate<C>, trueMiddleware: Middleware<C>, falseMiddleware: Middleware<C>): MiddlewareFn<C>
```

---

### Set Chat Photo with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sets the chat photo. Accepts an InputFile for the photo. Returns true on success.

```typescript
await ctx.setChatPhoto(new InputFile("/path/to/photo.jpg"));
```

---

### replyWithAudio

Source: https://telegraf.js.org/interfaces/Scenes

Sends audio files to a chat. Supports captions.

````APIDOC
## POST /replyWithAudio

### Description
Sends audio files to a chat. Supports captions.

### Method
POST

### Endpoint
/replyWithAudio

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **audio** (string | InputFile) - Required - The audio file path or URL.
- **extra** (object) - Optional - Additional parameters for the audio message.
  - **caption** (string | FmtString<string>) - Optional - Caption for the audio.

### Request Example
```json
{
  "audio": "AwACAgIAAxkBAAIBQ2Y8W2q8u9z5t7a2x3e7z5y6r4t5",
  "extra": {
    "caption": "Listen to this!"
  }
}
````

### Response

#### Success Response (200)

- **message** (object) - The sent audio message object.

#### Response Example

```json
{
  "message": {
    "message_id": 12345,
    "chat": {
      "id": 123456789,
      "type": "private"
    },
    "audio": {
      "file_id": "AwACAgIAAxkBAAIBQ2Y8W2q8u9z5t7a2x3e7z5y6r4t5",
      "file_unique_id": "AQADGQEAA...",
      "duration": 30,
      "performer": "Artist Name",
      "title": "Song Title"
    },
    "caption": "Listen to this!"
  }
}
```

````

--------------------------------

### Reply with Document using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a document. Accepts a file path or InputFile, and optional caption. Returns the sent DocumentMessage.

```typescript
/**
 * Sends a document.
 * @param args - The document file and optional extra parameters like caption.
 * @returns Promise<DocumentMessage>
 */
async replyWithDocument(...args: [document: string | InputFile, extra?: { caption?: string | FmtString<string>; }]): Promise<DocumentMessage>
````

---

### Creating a webhook middleware

Source: https://telegraf.js.org/classes/Telegraf-1

Generates an Express-style middleware for receiving Telegram updates via webhook. It requires a domain and an optional path. Returns a Promise resolving to the middleware function. Dependencies include Promise, Express-style middleware, ServerResponse, and IncomingMessage.

```typescript
createWebhook(opts: {
  domain: string;
  path?: string;
}): Promise<((req, res, next?) => Promise<void>)>
```

---

### Composer.lazy

Source: https://telegraf.js.org/classes/Scenes

Generates middleware dynamically using a factory function.

````APIDOC
## Composer.lazy

### Description
Generates middleware dynamically using a factory function.

### Method
`static`

### Endpoint
`lazy<C>(factoryFn): MiddlewareFn<C>`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
* **factoryFn** ((ctx) => MaybePromise<Middleware<C>>) - Required - A function that returns a middleware or a promise resolving to a middleware.

### Request Example
```javascript
// Example usage:
// const lazyMiddleware = Composer.lazy(async (ctx) => {
//   // Fetch some data or perform async operation
//   return Composer.hears('data', (ctx) => ctx.reply('Here is the data'));
// });
````

### Response

#### Success Response (200)

`MiddlewareFn<C>`

#### Response Example

```json
// Middleware function returned
```

````

--------------------------------

### Reply with Game using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a game. Requires the game name (short name) and accepts optional extra parameters. Returns the sent GameMessage.

```typescript
/**
 * Sends a game.
 * @param args - The game name and optional extra parameters.
 * @returns Promise<GameMessage>
 */
async replyWithGame(...args: [gameName: string, extra?: Omit<{}, "chat_id" | "game_short_name">]): Promise<GameMessage>
````

---

### Send Sticker using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a sticker to a chat. Requires a sticker identifier (string or InputFile) and optionally accepts extra parameters for customization.

```javascript
await ctx.sendSticker(sticker: string | InputFile, extra?: Omit<{}, "chat_id" | "sticker">);
```

---

### createForumTopic

Source: https://telegraf.js.org/classes/Telegram

Creates a topic in a forum supergroup chat. Requires administrator rights.

````APIDOC
## POST /createForumTopic

### Description
Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object.

### Method
POST

### Endpoint
/createForumTopic

### Parameters
#### Path Parameters

#### Query Parameters

#### Request Body
- **chat_id** (string | number) - Required - The unique identifier for the target chat.
- **name** (string) - Required - Topic name, 1-128 characters.
- **extra** (Omit<{}, "chat_id" | "name">) - Optional - Additional parameters for creating the forum topic.

### Request Example
```json
{
  "chat_id": 123456789,
  "name": "General Discussion"
}
````

### Response

#### Success Response (200)

- **ForumTopic** (ForumTopic) - An object containing information about the created forum topic.

#### See

https://core.telegram.org/bots/api#createforumtopic

````

--------------------------------

### Create Email Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that triggers when an email address is mentioned in a message. It accepts an email string or pattern and subsequent middleware.

```typescript
email<C>(email: Triggers<C>, ...fns: MatchedMiddleware<C, "channel_post" | "message">): MiddlewareFn<C>
````

---

### Composer.hears

Source: https://telegraf.js.org/classes/Scenes

Generates middleware for handling matching text messages based on provided triggers.

````APIDOC
## Composer.hears

### Description
Generates middleware for handling matching text messages.

### Method
`static`

### Endpoint
`hears<C>(triggers, ...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
* **triggers** (Triggers<NarrowedContext<C, {
    message: New & NonChannel & TextMessage;
    update_id: number;
}>>) - Required - The text triggers to match.
* **...fns** (MatchedMiddleware<C, "text">) - Required - Middleware to run when a trigger matches.

### Request Example
```javascript
// Example usage would involve providing text triggers and middleware.
// For instance:
// Composer.hears('hello', (ctx) => ctx.reply('Hi there!'))
````

### Response

#### Success Response (200)

`MiddlewareFn<C>`

#### Response Example

```json
// Middleware function returned
```

````

--------------------------------

### replyWithAudio

Source: https://telegraf.js.org/classes/Context

Sends an audio file to a chat. Supports captions.

```APIDOC
## POST /websites/telegraf_js

### Description
Sends an audio file to a chat. Supports captions.

### Method
POST

### Endpoint
/websites/telegraf_js

### Parameters
#### Request Body
- **audio** (string | object) - The audio file to send. Can be a file ID or a URL.
- **extra** (object) - Optional - Additional parameters, including `caption` for the audio.
  - **caption** (string) - Optional - Caption for the audio.

### Response
#### Success Response (200)
- **result** (object) - The sent `AudioMessage` object.

### Response Example
```json
{
  "result": {
    "message_id": 123,
    "from": {
      "id": 456,
      "is_bot": true,
      "first_name": "TestBot"
    },
    "chat": {
      "id": 789,
      "type": "private"
    },
    "date": 1678886400,
    "audio": {
      "file_id": "CQACAgIAAxkBAAIlQ2U_z010_z010_z010_z010_z010_z010_z010_z010_z010_z010",
      "file_unique_id": "AQAD0z0",
      "duration": 180,
      "performer": "Artist Name",
      "title": "Song Title",
      "mime_type": "audio/mpeg"
    }
  }
}
````

### See

https://core.telegram.org/bots/api#sendaudio

````

--------------------------------

### Send Video Note with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a video note to a chat. Accepts a video note file path or InputFileVideoNote. Returns a VideoNoteMessage.

```typescript
await ctx.sendVideoNote(videoNotePathOrFile);
````

---

### Handle Help Command in Telegraf.js

Source: https://telegraf.js.org/classes/Composer

Registers middleware specifically for handling the `/help` command. It accepts middleware functions to define the help response.

```typescript
composer.help(...fns);
```

---

### inlineQuery Middleware

Source: https://telegraf.js.org/classes/Composer

Registers middleware for handling incoming inline query updates from users.

```APIDOC
## POST /inlineQuery

### Description
Registers middleware for handling incoming inline query updates from users.

### Method
POST

### Endpoint
/inlineQuery

### Parameters
#### Path Parameters
- **triggers** (Triggers<NarrowedContext<C, InlineQueryUpdate>>) - Required - The triggers for inline queries.
- **Rest ...fns** (MatchedMiddleware<C, "inline_query">) - Optional - Additional middleware functions to process the matched inline queries.

### Response
#### Success Response (200)
- **Composer<C>** - Returns a Composer instance for chaining middleware.
```

---

### replyWithSticker

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send a sticker. See the Telegram Bot API documentation for detailed usage.

````APIDOC
## POST /replyWithSticker

### Description
Sends a sticker to the user.

### Method
POST

### Endpoint
/replyWithSticker

### Parameters
#### Request Body
- **sticker** (string | InputFile) - Required - The sticker to send.
- **extra** (object) - Optional - Extra parameters.

### Request Example
```json
{
  "sticker": "..."
}
````

### Response

#### Success Response (200)

- **StickerMessage** (object) - The sent sticker message.

#### Response Example

```json
{}
```

### See

https://core.telegram.org/bots/api#sendsticker

````

--------------------------------

### POST /api/action

Source: https://telegraf.js.org/classes/Telegraf-1

Registers middleware for handling matching callback queries. This method allows you to define specific actions for different callback query triggers.

```APIDOC
## POST /api/action

### Description
Registers middleware for handling matching callback queries.

### Method
POST

### Endpoint
`/api/action`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **triggers** (Triggers) - Required - Specifies the callback query triggers.
- **...fns** (MatchedMiddleware) - Required - Middleware functions to handle the callback queries.
````

---

### Composer.mention

Source: https://telegraf.js.org/classes/Scenes

Generates middleware for handling mentions of specific usernames.

````APIDOC
## Composer.mention

### Description
Generates middleware for handling mentions of specific usernames.

### Method
`static`

### Endpoint
`mention<C>(mention, ...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
* **mention** (MaybeArray<string>) - Required - The username mention(s) to match (e.g., '@botname').
* **...fns** (MatchedMiddleware<C, "channel_post" | "message">) - Required - Middleware to run when a mention is matched.

### Request Example
```javascript
// Example usage would involve providing a username mention and middleware.
// For instance:
// Composer.mention('@mybot', (ctx) => ctx.reply('You mentioned me!'))
````

### Response

#### Success Response (200)

`MiddlewareFn<C>`

#### Response Example

```json
// Middleware function returned
```

````

--------------------------------

### Create Fork Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that executes another middleware in the background, allowing the main thread to continue processing. It takes the middleware to be run in the background.

```typescript
fork<C>(middleware: Middleware<C>): MiddlewareFn<C>
````

---

### Middleware Usage

Source: https://telegraf.js.org/index

Explains how to use middleware in Telegraf to process updates, including the `next` function and common middleware patterns.

````APIDOC
## Telegraf Middleware

### Description
Telegraf uses a middleware pattern similar to Koa. Each middleware receives the context (`ctx`) and a `next` function. Calling `await next()` passes control to the next middleware in the stack. Middleware can be used for logging, session management, routing, and more.

### Method
N/A (Internal Bot Logic)

### Endpoint
N/A

### Parameters
#### Middleware Function Signature
- **ctx** (Context) - The context object for the current update.
- **next** (function) - A promise-returning function that calls the next middleware.

### Request Example (Logging Middleware)
```javascript
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(async (ctx, next) => {
  console.time(`Processing update ${ctx.update.update_id}`);
  await next(); // runs next middleware
  // runs after next middleware finishes
  console.timeEnd(`Processing update ${ctx.update.update_id}`);
});

bot.on(message('text'), (ctx) => ctx.reply('Hello World'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
````

### Common Middleware Patterns

- **Extracting information**: Process updates before passing them on.
- **Conditional execution**: Use `await next()` only for specific updates.
- **Context extension**: Mutate `ctx` before calling `await next()`.
- **API call interception**: Intercept and modify bot API calls.
- **Code reuse**: Integrate third-party middleware.

````

--------------------------------

### Composer.hashtag

Source: https://telegraf.js.org/classes/Scenes

Generates middleware for handling specific hashtags.

```APIDOC
## Composer.hashtag

### Description
Generates middleware for handling specific hashtags.

### Method
`static`

### Endpoint
`hashtag<C>(hashtag, ...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
* **hashtag** (MaybeArray<string>) - Required - The hashtag(s) to match.
* **...fns** (MatchedMiddleware<C, "channel_post" | "message">) - Required - Middleware to run when the hashtag is matched.

### Request Example
```javascript
// Example usage would involve providing a hashtag string or array
// and subsequent middleware functions.
````

### Response

#### Success Response (200)

`MiddlewareFn<C>`

#### Response Example

```json
// Middleware function returned
```

````

--------------------------------

### Answer Inline Query using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Answers an inline query sent by a user. It requires an array of inline query results and optional extra parameters. The method returns a promise that resolves to true.

```typescript
answerInlineQuery(results: readonly InlineQueryResult[], extra?: Omit<{}, "chat_id" | "inline_query_id" | "results">): Promise<true>
````

---

### Callback Query Action Middleware (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware for handling specific callback query data. It takes triggers (data patterns) and subsequent middleware functions. Returns a MiddlewareFn.

```javascript
bot.action<C>(triggers, ...fns);
```

---

### gameQuery Middleware

Source: https://telegraf.js.org/classes/Composer

Registers middleware specifically for handling game query updates from Telegram.

```APIDOC
## POST /gameQuery

### Description
Registers middleware specifically for handling game query updates from Telegram.

### Method
POST

### Endpoint
/gameQuery

### Parameters
#### Query Parameters
- **Rest ...fns** (NonemptyReadonlyArray<Middleware<NarrowedContext<C, CallbackQueryUpdate<GameQuery>>>>) - Required - Middleware functions to process game query updates.

### Response
#### Success Response (200)
- **Composer<C>** - Returns a Composer instance for chaining middleware.
```

---

### Markup Constructor

Source: https://telegraf.js.org/classes/Types

Initializes a new Markup object. It accepts a reply_markup parameter which can be of types InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove, or ForceReply.

```typescript
new Markup<T>(reply_markup): Markup<T>
```

---

### webAppData

Source: https://telegraf.js.org/classes/Context

Provides access to `web_app_data` from an update, which contains data sent from a Web App attached to a KeyboardButton.

````APIDOC
## webAppData

### Description
A shorthand property to access the `web_app_data` object from the current update. This is used when a user interacts with a Web App launched via a KeyboardButton.

### Method
GET

### Endpoint
/websites/telegraf_js/webAppData

### Parameters
None

### Response
#### Success Response (200)
* `undefined | { button_text: string; data: { json<T>() => T; text() => string; }; }` - The Web App data object, including button text and data content, or undefined if not present.

### Response Example
```json
{
  "button_text": "Open Web App",
  "data": {
    "json": () => ({ "user_id": 123456789 }),
    "text": () => "{ \"user_id\": 123456789 }"
  }
}
````

````

--------------------------------

### Answer Pre-Checkout Query

Source: https://telegraf.js.org/classes/Telegram

Answers a pre-checkout query. The Bot API must receive an answer within 10 seconds.

```APIDOC
## POST /answerPreCheckoutQuery

### Description
Answers a pre-checkout query. The Bot API must receive an answer within 10 seconds.

### Method
POST

### Endpoint
/answerPreCheckoutQuery

### Parameters
#### Path Parameters
- **preCheckoutQueryId** (string) - Required - Unique identifier for the query.
- **ok** (boolean) - Required - Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems.
- **errorMessage** (string) - Optional - Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout.

### Response
#### Success Response (200)
- **true** (boolean) - Indicates success.
````

---

### Set My Commands with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sets the bot's commands. Accepts an array of BotCommand objects. Deprecated, use Telegram.setMyCommands.

```typescript
await bot.telegram.setMyCommands([
  { command: "start", description: "Starts the bot" },
]);
```

---

### Reply with Video using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a video message. Accepts a video file path or InputFile and optionally a caption.

```javascript
replyWithVideo(video: string | InputFile, extra?: { caption?: string | FmtString<string>; }): Promise<VideoMessage>
```

---

### Create Chat Invite Link (Telegraf.js)

Source: https://telegraf.js.org/interfaces/Scenes

Creates a new invite link for a chat. Allows setting expiration date and member limit.

```javascript
bot.api.createChatInviteLink(chatId, {
  expireDate: timestamp,
  memberLimit: 10,
});
```

---

### Command Arguments Parsing

Source: https://telegraf.js.org/interfaces/Types

Demonstrates how command arguments are parsed into a string array, handling quoted arguments and spaces within them. The parsing logic might change in future stable releases.

```typescript
`/command token1 token2 -> [ "token1", "token2" ]`;
```

```typescript
`/command "token1 token2" -> [ "token1 token2" ]`;
```

```typescript
`/command token1 "token2 token3" -> [ "token1" "token2 token3" ]`;
```

---

### Composer.use

Source: https://telegraf.js.org/classes/Composer

Registers a general middleware.

```APIDOC
## Composer.use

### Description
Registers a general middleware.

### Method
Composer.use

### Parameters
#### Parameters
- **Rest** ...fns: readonly Middleware<C>[]

### Returns
Composer<C>
```

---

### Promote Chat Member with Telegraf.js

Source: https://telegraf.js.org/classes/Context

Promotes a user to administrator in a chat. Requires the userId and extra parameters for administrator rights. Returns a Promise resolving to true.

```javascript
ctx.promoteChatMember(...args);
```

---

### MemorySessionStore Properties

Source: https://telegraf.js.org/classes/MemorySessionStore

Details the properties of the MemorySessionStore class, including 'store' and 'ttl'.

```APIDOC
## MemorySessionStore Properties

### `store` (Map<string, { expires: number; session: T; }>)

#### Description
A private, readonly map that stores session data. Each entry contains an expiration timestamp and the session object.

### `ttl` (number)

#### Description
A private, readonly property storing the time-to-live for sessions in milliseconds. Defaults to Infinity.
```

---

### Set My Default Administrator Rights using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sets the default administrator rights for the bot. Optionally specifies rights for channels and the rights themselves.

```javascript
await ctx.setMyDefaultAdministratorRights(extra?: { forChannels?: boolean; rights?: ChatAdministratorRights; });
```

---

### replyWithDocument

Source: https://telegraf.js.org/interfaces/Scenes

Sends documents to a chat. Supports captions.

````APIDOC
## POST /replyWithDocument

### Description
Sends documents to a chat. Supports captions.

### Method
POST

### Endpoint
/replyWithDocument

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **document** (string | InputFile) - Required - The document file path or URL.
- **extra** (object) - Optional - Additional parameters for the document message.
  - **caption** (string | FmtString<string>) - Optional - Caption for the document.

### Request Example
```json
{
  "document": "/path/to/document.pdf",
  "extra": {
    "caption": "Here is the document."
  }
}
````

### Response

#### Success Response (200)

- **message** (object) - The sent document message object.

#### Response Example

```json
{
  "message": {
    "message_id": 12345,
    "chat": {
      "id": 123456789,
      "type": "private"
    },
    "document": {
      "file_id": "BQACAgIAAxkBAAIBQ2Y8W2q8u9z5t7a2x3e7z5y6r4t5",
      "file_unique_id": "AgADGQEAA...",
      "file_name": "document.pdf",
      "mime_type": "application/pdf",
      "file_size": 1024
    },
    "caption": "Here is the document."
  }
}
```

````

--------------------------------

### uploadStickerFile

Source: https://telegraf.js.org/classes/Telegram

Uploads a sticker file for later use in sticker set creation. Supports PNG, WebP, TGS, and WEBM formats.

```APIDOC
## POST /uploadStickerFile

### Description
Upload a file with a sticker for later use in `createNewStickerSet` and `addStickerToSet` methods (can be used multiple times). Supports PNG, WebP, TGS, and WEBM formats.

### Method
POST

### Endpoint
`/uploadStickerFile`

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **ownerId** (number) - Required - User identifier of sticker file owner.
- **sticker** (InputFile) - Required - The sticker file to upload.
- **sticker_format** (string) - Required - Format of the sticker file. Must be one of: `"video"`, `"static"`, `"animated"`.

### Request Example
```json
{
  "ownerId": 123456789,
  "sticker": "attach://sticker.png",
  "sticker_format": "static"
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - True on success.
- **result** (File) - Information about the uploaded file.

#### Response Example

```json
{
  "ok": true,
  "result": {
    "file_id": "AwACAgIAAxkBAAIB_l_hG_8_s8_u8_u8_u8_u8_u8_u8_u8_u8_u8",
    "file_unique_id": "AQAD_hG_8",
    "file_size": 1024,
    "file_path": "stickers/file_id.png"
  }
}
```

````

--------------------------------

### shippingQuery

Source: https://telegraf.js.org/classes/Context

Provides access to the `shipping_query` object from an update, which contains information about a shipping query for a successful payment.

```APIDOC
## shippingQuery

### Description
A shorthand property to access the `shipping_query` object from the current update. This is used to handle shipping details for successful payments.

### Method
GET

### Endpoint
/websites/telegraf_js/shippingQuery

### Parameters
None

### Response
#### Success Response (200)
* `PropOr<U, "shipping_query">` - The shipping query object or undefined if not present.

### Response Example
```json
{
  "id": "1234567890",
  "from": {
    "id": 123456789,
    "is_bot": false,
    "first_name": "John"
  },
  "invoice_payload": "invoice_payload_123",
  "shipping_address": {
    "country_code": "US",
    "state": "CA",
    "city": "San Francisco",
    "street_line1": "123 Main St",
    "street_line2": "Apt 4B",
    "post_code": "94107"
  }
}
````

````

--------------------------------

### Answer Callback Query

Source: https://telegraf.js.org/classes/Context

Answers a callback query sent from a callback button. It can optionally include text to be displayed to the user.

```typescript
answerCbQuery(...args: [text?: string, extra?: Omit<{}, "text" | "chat_id" | "callback_query_id">]): Promise<true>
````

---

### Reply with Video Note using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a video note message. Accepts a video note file path or InputFileVideoNote and optional extra parameters.

```javascript
replyWithVideoNote(videoNote: string | InputFileVideoNote, extra?: Omit<{}, "chat_id" | "video_note">): Promise<VideoNoteMessage>
```

---

### answerInlineQuery

Source: https://telegraf.js.org/classes/Context

Use this method to send answers to an inline query.

````APIDOC
## answerInlineQuery

### Description
Sends answers to an inline query. This method is used to provide results for an inline query initiated by a user, allowing them to select and send content from your bot.

### Method
POST

### Endpoint
/websites/telegraf_js/answerInlineQuery

### Parameters
#### Path Parameters
* None

#### Query Parameters
* None

#### Request Body
* `results` (Array<InlineQueryResult>) - Required - An array of results to display for the inline query.
* `extra` (object) - Optional - Additional parameters, excluding `chat_id`, `inline_query_id`, and `results`.

### Request Example
```json
{
  "results": [
    {
      "type": "article",
      "id": "unique_id",
      "title": "Hello Article",
      "input_message_content": {
        "message_text": "Hello from Telegraf!"
      }
    }
  ],
  "cache_time": 10
}
````

### Response

#### Success Response (200)

- `true` (boolean) - Indicates that the inline query was successfully answered.

#### Response Example

```json
{
  "ok": true,
  "result": true
}
```

### See Also

- https://core.telegram.org/bots/api#answerinlinequery

````

--------------------------------

### Promote Chat Member

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to promote or demote a user in a chat. The bot must be an administrator in the chat for this to work.

```APIDOC
## POST /websites/telegraf_js/promoteChatMember

### Description
Use this method to promote or demote a user in a chat. The bot must be an administrator in the chat for this to work.

### Method
POST

### Endpoint
/websites/telegraf_js/promoteChatMember

### Parameters
#### Query Parameters
* **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target channel (in the format "@channelusername").
* **userId** (number) - Required - Unique identifier of the target user.
* **extra** (object) - Required - A JSON-serialized object with the new member's status in the chat.
  * **is_anonymous** (boolean) - Optional - True, if the user's presence in the chat is anonymous.
  * **can_manage_chat** (boolean) - Optional - True, if the user is allowed to manage the chat (change chat title, photo and other settings).
  * **can_delete_messages** (boolean) - Optional - True, if the user is allowed to delete messages from the chat.
  * **can_manage_video_chats** (boolean) - Optional - True, if the user is allowed to manage video chats.
  * **can_restrict_members** (boolean) - Optional - True, if the user is allowed to restrict, ban or unban chat members.
  * **can_invite_users** (boolean) - Optional - True, if the user is allowed to invite new users to the chat.
  * **can_promote_members** (boolean) - Optional - True, if the user is allowed to promote members, i.e. introduce other members in the chat.
  * **can_change_info** (boolean) - Optional - True, if the user is allowed to change the chat title, photo and other settings.
  * **can_if_needed** (boolean) - Optional - True, if the user is allowed to pin messages, choose their location in the service message, display the location in the service message, and possibly also the likes.
  * **can_edit_messages** (boolean) - Optional - True, if the user is allowed to edit messages of other users.
  * **can_post_messages** (boolean) - Optional - True, if the user is allowed to edit messages of other users.
  * **can_edit_stories** (boolean) - Optional - True, if the user is allowed to edit stories posted by other users.
  * **can_delete_stories** (boolean) - Optional - True, if the user is allowed to delete stories posted by other users.
  * **can_post_stories** (boolean) - Optional - True, if the user is allowed to post stories.

### Response
#### Success Response (200)
* **result** (boolean) - True on success.

#### Response Example
```json
{
  "result": true
}
````

````

--------------------------------

### Composer.tap Middleware

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that allows you to tap into the message processing without altering the flow.

```APIDOC
## Composer.tap

### Description
Generates middleware that allows you to tap into the message processing. The provided middleware function will be executed, but it won't affect the subsequent middleware chain unless it explicitly throws an error or calls `next()`.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage:
// bot.use(Composer.tap(ctx => console.log('Processing message:', ctx.message)))
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### addStickerToSet

Source: https://telegraf.js.org/classes/Context

Adds a new sticker to a set of existing stickers. The sticker must be sent as a PNG image, uploaded to the Telegram servers.

```APIDOC
## addStickerToSet

### Description
Adds a new sticker to a set of existing stickers. The sticker must be sent as a PNG image, uploaded to the Telegram servers. This method requires the sticker set to be created first.

### Method
POST

### Endpoint
/websites/telegraf_js/addStickerToSet

### Parameters
#### Path Parameters
* None

#### Query Parameters
* None

#### Request Body
* `name` (string) - Required - Name of the sticker set.
* `stickerData` (object) - Required - A sticker object, excluding `chat_id`, `name`, and `user_id`.

### Request Example
```json
{
  "name": "my_sticker_set",
  "stickerData": {
    "sticker": "attach://sticker.png",
    "emojis": "👍"
  }
}
````

### Response

#### Success Response (200)

- `true` (boolean) - Indicates that the sticker was successfully added to the set.

#### Response Example

```json
{
  "ok": true,
  "result": true
}
```

### See Also

- https://core.telegram.org/bots/api#addstickertoset

````

--------------------------------

### Logging Middleware with Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Creates middleware for logging purposes, with an optional custom logging function. By default, it logs to the console. This helps in debugging and monitoring bot activity.

```typescript
const bot = new Telegraf<MyContext>('YOUR_BOT_TOKEN')

bot.use(Composer.log())

// Or with a custom logger:
// bot.use(Composer.log((message) => {
//   console.log(`[BOT LOG] ${message}`)
// }))
````

---

### Answer Shipping Query using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Answers a shipping query. This method is used to provide shipping options to a user during checkout. It requires a boolean for success, an array of shipping options, and an error message. Returns a promise that resolves to true.

```typescript
answerShippingQuery(ok: boolean, shippingOptions: readonly ShippingOption[], errorMessage: string): Promise<true>
```

---

### createChatInviteLink

Source: https://telegraf.js.org/classes/Context

Use this method to create a new invite link for a chat; any user can use the link to join the chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the invite link as a ChatInviteLink object.

````APIDOC
## POST /createChatInviteLink

### Description
Creates a new invite link for a chat. Requires administrator privileges.

### Method
POST

### Endpoint
/createChatInviteLink

### Parameters
#### Path Parameters
- None

#### Query Parameters
- **expireDate** (number) - Optional - Point in time (Unix server time) when the link will expire.
- **memberLimit** (number) - Optional - Number of users that can be invited using this link; 0-99. If not specified, the link will be valid indefinitely.

#### Request Body
- **chat_id** (string | number) - Required - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
- **name** (string) - Optional - Name of the invite link. 0-32 characters.
- **expire_date** (number) - Optional - Point in time (Unix server time) when the link will expire.
- **member_limit** (number) - Optional - Number of users that can be invited using this link; 0-99. If not specified, the link will be valid indefinitely.
- **creates_join_request** (boolean) - Optional - True, if users joining via the link need to be approved by an administrator.

### Request Example
```json
{
  "chat_id": "@channelusername",
  "name": "My Invite Link",
  "expire_date": 1678886400,
  "member_limit": 10
}
````

### Response

#### Success Response (200)

- **invite_link** (string) - The invite link.
- **creator** (User) - Creator of the link.
- **is_primary** (boolean) - True, if the link is primary.
- **is_revoked** (boolean) - True, if the link is revoked.
- **expire_date** (number) - Point in time (Unix server time) when the link will expire.
- **member_limit** (number) - Number of users that can be invited using this link.

#### Response Example

```json
{
  "invite_link": "https://t.me/+abcdefg12345",
  "creator": {
    "id": 123456789,
    "is_bot": false,
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe"
  },
  "is_primary": true,
  "is_revoked": false,
  "expire_date": 1678886400,
  "member_limit": 10
}
```

````

--------------------------------

### Composer.gameQuery

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware for handling game queries. This middleware is specifically designed for callback queries originating from games.

```APIDOC
## POST /api/game-query-middleware

### Description
Generates middleware for handling game queries. This middleware is specifically designed for callback queries originating from games.

### Method
POST

### Endpoint
/api/game-query-middleware

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **fns** (Array<Middleware<NarrowedContext<C, CallbackQueryUpdate<GameQuery>>>>) - Required - Middleware functions to process game query callback data.

### Request Example
```json
{
  "fns": [
    "(ctx) => ctx.answerGameQuery('Game started!')"
  ]
}
````

### Response

#### Success Response (200)

- **middlewareFn** (MiddlewareFn<C>) - The generated middleware function.

#### Response Example

```json
{
  "middlewareFn": "[Function: gameQueryMiddleware]"
}
```

````

--------------------------------

### Set My Default Administrator Rights with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sets the default administrator rights for the bot. Accepts optional parameters for channels and specific rights. Returns true on success.

```typescript
await ctx.setMyDefaultAdministratorRights({ rights: { can_post_messages: true } });
````

---

### Composer.optional Middleware

Source: https://telegraf.js.org/classes/Scenes

Generates optional middleware that runs only if a given predicate returns true.

````APIDOC
## Composer.optional

### Description
Generates optional middleware. The middleware runs only if the provided predicate returns true for the context.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage:
// bot.use(Composer.optional(ctx => ctx.chat.type === 'private', Composer.reply('Private message')))
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### Chat and Forum Management API

Source: https://telegraf.js.org/classes/Context

Methods for managing chat members and forum topics.

```APIDOC
## POST /unbanChatMember

### Description
Unbans a user from a group or supergroup. The bot must be an administrator in the chat for this to work.

### Method
POST

### Endpoint
/unbanChatMember

### Parameters
#### Request Body
- **userId** (number) - Required - Unique identifier of the target user.
- **extra** ({ only_if_banned?: boolean }) - Optional - Additional parameters.
  - **only_if_banned** (boolean) - Optional - Pass True to unban only if the user was banned.

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### See
https://core.telegram.org/bots/api#unbanchatmember
````

```APIDOC
## POST /unbanChatSenderChat

### Description
Unbans a previously banned sender chat. The bot must be an administrator in the chat for this to work.

### Method
POST

### Endpoint
/unbanChatSenderChat

### Parameters
#### Request Body
- **senderChatId** (number) - Required - Unique identifier of the chat to unban.

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### See
https://core.telegram.org/bots/api#unbanchatsenderchat
```

```APIDOC
## POST /unhideGeneralForumTopic

### Description
Unhides the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat and must have the `can_manage_topics` administrator rights.

### Method
POST

### Endpoint
/unhideGeneralForumTopic

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### See
https://core.telegram.org/bots/api#unhidegeneralforumtopic
```

```APIDOC
## POST /unpinAllChatMessages

### Description
Clears the list of all pinned messages in a chat. The bot must be an administrator in the chat for this to work.

### Method
POST

### Endpoint
/unpinAllChatMessages

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### See
https://core.telegram.org/bots/api#unpinallchatmessages
```

```APIDOC
## POST /unpinAllForumTopicMessages

### Description
Clears the list of pinned messages in a forum topic. The bot must be an administrator in the chat and must have the `can_pin_messages` administrator right.

### Method
POST

### Endpoint
/unpinAllForumTopicMessages

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### See
https://core.telegram.org/bots/api#unpinallforumtopicmessages
```

```APIDOC
## POST /unpinAllGeneralForumTopicMessages

### Description
Clears the list of pinned messages in a General forum topic. The bot must be an administrator in the chat and must have the `can_pin_messages` administrator right.

### Method
POST

### Endpoint
/unpinAllGeneralForumTopicMessages

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### See
https://core.telegram.org/bots/api#unpinallgeneralforumtopicmessages
```

```APIDOC
## POST /unpinChatMessage

### Description
Removes a message from the list of pinned messages in a chat. The bot must be an administrator in the chat for this to work.

### Method
POST

### Endpoint
/unpinChatMessage

### Parameters
#### Request Body
- **messageId** (number) - Optional - Identifier of the message to unpin.

### Response
#### Success Response (200)
- **result** (boolean) - True on success.

### See
https://core.telegram.org/bots/api#unpinchatmessage
```

---

### replyWithHTML

Source: https://telegraf.js.org/interfaces/Scenes

Sends a message with HTML formatting to a chat.

````APIDOC
## POST /replyWithHTML

### Description
Sends a message with HTML formatting to a chat.

### Method
POST

### Endpoint
/replyWithHTML

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **html** (string) - Required - The HTML content of the message.
- **extra** (object) - Optional - Additional parameters for the message, excluding 'text' and 'chat_id'.

### Request Example
```json
{
  "html": "<b>Hello</b>, <i>world</i>!"
}
````

### Response

#### Success Response (200)

- **message** (object) - The sent message object.

#### Response Example

```json
{
  "message": {
    "message_id": 12345,
    "chat": {
      "id": 123456789,
      "type": "private"
    },
    "text": "Hello, world!"
  }
}
```

````

--------------------------------

### Telegraf.js Context Class Constructor

Source: https://telegraf.js.org/classes/Context

Initializes a new Context object for processing Telegram updates. It requires the update payload, a Telegram API instance, and bot information. This is the fundamental step in handling any incoming message or event.

```typescript
new Context<U>(update: U, telegram: Telegram, botInfo: UserFromGetMe): Context<U>
````

---

### Composer.guard

Source: https://telegraf.js.org/classes/Scenes

Generates optional middleware based on a predicate that only operates on ctx.update. Note that Composer.on('message') is preferred over this.

````APIDOC
## Composer.guard

### Description
Generates optional middleware based on a predicate that only operates on `ctx.update`.

### Method
`static`

### Endpoint
`guard<C, U>(guardFn, ...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
* **guardFn** ((u) => u is U) - Required - Predicate to decide whether to run the middleware based on the `ctx.update` object.
* **...fns** (NonemptyReadonlyArray<Middleware<NarrowedContext<C, U>, U>>) - Required - Middleware to run if the predicate returns true.

### Request Example
```javascript
import { Composer, Update } from 'telegraf'

const predicate = (u): u is Update.MessageUpdate => 'message' in u
const middleware = Composer.guard(predicate, (ctx) => {
  const message = ctx.update.message
})
````

### Response

#### Success Response (200)

`MiddlewareFn<C>`

#### Response Example

```json
// Middleware function returned
```

### See

`Composer.optional` for a more generic version of this method that allows the predicate to operate on `ctx` itself

### Deprecated

use `Composer.on`

````

--------------------------------

### Static Command Middleware

Source: https://telegraf.js.org/classes/Composer

Creates middleware specifically for handling Telegram commands.

```APIDOC
## Static command

### Description
Generates middleware for handling specified commands.

### Method
N/A (Static method)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Usage
```typescript
command<C>(command: Triggers<NarrowedContext<C, { message: New & NonChannel & TextMessage; update_id: number; }>>, ...fns: NonemptyReadonlyArray<Middleware<Context<{ message: New & NonChannel & TextMessage; update_id: number; }> & Omit<C, keyof Context<Update>> & CommandContextExtn>>>): MiddlewareFn<C>
````

````

--------------------------------

### replyWithVenue

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send a venue. See the Telegram Bot API documentation for detailed usage.

```APIDOC
## POST /replyWithVenue

### Description
Sends a venue to the user.

### Method
POST

### Endpoint
/replyWithVenue

### Parameters
#### Request Body
- **latitude** (number) - Required - Latitude of the venue.
- **longitude** (number) - Required - Longitude of the venue.
- **title** (string) - Required - Name of the venue.
- **address** (string) - Required - Address of the venue.
- **extra** (object) - Optional - Extra parameters.

### Request Example
```json
{
  "latitude": 37.7749,
  "longitude": -122.4194,
  "title": "Venue Name",
  "address": "123 Main St"
}
````

### Response

#### Success Response (200)

- **VenueMessage** (object) - The sent venue message.

#### Response Example

```json
{}
```

### See

https://core.telegram.org/bots/api#sendvenue

````

--------------------------------

### WizardContext Properties

Source: https://telegraf.js.org/interfaces/Scenes

Exposes core properties of the WizardContext, including bot information, scene management, session data, internal state, and Telegram API access.

```APIDOC
## WizardContext Properties

### `botInfo`
* **Type**: UserFromGetMe
* **Description**: Information about the bot user.

### `scene`
* **Type**: SceneContextScene<WizardContext<D>, D>
* **Description**: Manages the current scene within the wizard.

### `session`
* **Type**: WizardSession<D>
* **Description**: Holds session data specific to the wizard.

### `state`
* **Type**: Record<string | symbol, any>
* **Description**: A generic state object for custom data storage.

### `telegram`
* **Type**: Telegram
* **Description**: Direct access to the Telegraf Telegram API instance.

### `update`
* **Type**: Update
* **Description**: The incoming Telegram update object.
````

---

### Handle Text Messages with Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Creates middleware for handling text messages that match specified trigger strings or patterns. This is a fundamental method for building command-based or conversational bots.

```typescript
Composer.hears<MyContext>("hello", (ctx) => {
  ctx.reply("Hi there!");
});

Composer.hears<MyContext>(/how are you/i, (ctx) => {
  ctx.reply("I am fine, thank you!");
});
```

---

### replyWithMarkdown

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send a message formatted using Markdown. It is recommended to use replyWithMarkdownV2 instead.

````APIDOC
## POST /replyWithMarkdown

### Description
Sends a message formatted with Markdown.

### Method
POST

### Endpoint
/replyWithMarkdown

### Parameters
#### Request Body
- **markdown** (string) - Required - The Markdown formatted text.
- **extra** (object) - Optional - Extra parameters.

### Request Example
```json
{
  "markdown": "*bold text* _italic text_"
}
````

### Response

#### Success Response (200)

- **TextMessage** (object) - The sent text message.

#### Response Example

```json
{}
```

### See

https://core.telegram.org/bots/api#sendmessage

````

--------------------------------

### Set Chat Sticker Set with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sets a sticker set for a chat. Accepts the sticker set name. Returns true on success.

```typescript
await ctx.setChatStickerSet('my_sticker_set');
````

---

### createNewStickerSet

Source: https://telegraf.js.org/classes/Telegram

Creates a new sticker set owned by a user. The bot can edit the set later.

````APIDOC
## POST /createNewStickerSet

### Description
Create new sticker set owned by a user. The bot will be able to edit the created sticker set.

### Method
POST

### Endpoint
/createNewStickerSet

### Parameters
#### Path Parameters

#### Query Parameters

#### Request Body
- **ownerId** (number) - Required - User identifier of the sticker set owner.
- **name** (string) - Required - Short name of the sticker set, to be used in t.me/addstickers/ URLs. Must be 1-64 characters, can only contain English letters, digits, and underscores. Must begin with a letter, can't contain consecutive underscores, and must end in "_by_". Case insensitive.
- **title** (string) - Required - Sticker set title, 1-64 characters.
- **stickerData** (Omit<{}, "chat_id" | "name" | "user_id" | "title">) - Required - An object containing sticker data, such as `png_sticker`, `tgs_sticker`, or `webm_sticker`.

### Request Example
```json
{
  "ownerId": 123456789,
  "name": "my_custom_stickers_by_my_bot",
  "title": "My Awesome Stickers",
  "stickerData": {
    "png_sticker": "CAACAgIAAxkBAAIBk2XyZQxJkZpCZZJqLgYyAAG9j7Y47QACOrgAA1m7SUs0vQhC0j9tGiE"
  }
}
````

### Response

#### Success Response (200)

- **true** - Returns true on success.

````

--------------------------------

### Create Creator Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that only responds when the chat creator sends a message. It takes a variable list of middleware functions to execute in this specific scenario.

```typescript
creator<C>(...fns: NonemptyReadonlyArray<Middleware<C>>): MiddlewareFn<C>
````

---

### Composer.compose

Source: https://telegraf.js.org/classes/Scenes

Combines an array of middleware functions into a single middleware.

```APIDOC
## Composer.compose

### Description
Combines an array of middleware functions into a single middleware.

### Method
`compose<C>(middlewares): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **middlewares** (readonly Middleware<C>[]) - Required - An array of middleware functions.

### Returns
`MiddlewareFn<C>`
```

---

### Handle Callback Queries with Telegraf.js `action`

Source: https://telegraf.js.org/classes/Composer

The static `action` function creates middleware to handle callback queries, typically from inline keyboards. It filters updates based on the `callback_data` provided.

```typescript
import { Composer, MiddlewareFn } from "telegraf";
import { CallbackQuery } from "telegraf/typings/types";
import { NarrowedContext } from "telegraf/typings/context";

const bot = new Composer<Context>();

// Middleware to handle callback queries with 'button_press' data
bot.use(
  bot.action(
    "button_press",
    (
      ctx: NarrowedContext<Context, { message: CallbackQuery.CallbackQuery }>,
      next,
    ) => {
      console.log("Button was pressed!");
      ctx.answerCbQuery("Button clicked!");
      return next();
    },
  ),
);

// Handling multiple callback query triggers
bot.use(
  bot.action(["accept", "reject"], async (ctx, next) => {
    const actionType = ctx.callbackQuery.data;
    console.log(`Action taken: ${actionType}`);
    await ctx.reply(`You chose to ${actionType}.`);
    await ctx.answerCbQuery();
    return next();
  }),
);
```

---

### Static Branch Middleware

Source: https://telegraf.js.org/classes/Composer

Creates middleware that branches execution based on a predicate.

````APIDOC
## Static branch

### Description
Creates middleware that branches execution based on a predicate.

### Method
N/A (Static method)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Usage
```typescript
branch<C>(predicate: boolean | Predicate<C> | AsyncPredicate<C>, trueMiddleware: Middleware<C>, falseMiddleware: Middleware<C>): MiddlewareFn<C>
````

````

--------------------------------

### Composer.creator

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that only responds when the chat is created by the sender.

```APIDOC
## Composer.creator

### Description
Generates middleware responding only to chat creator.

### Method
`creator<C>(...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **fns** (NonemptyReadonlyArray<Middleware<C>>) - Required - Middleware functions to execute.

### Returns
`MiddlewareFn<C>`
````

---

### sendGame

Source: https://telegraf.js.org/classes/Context

Use this method to send a game. On success, the sent Message is returned.

````APIDOC
## POST /api/sendGame

### Description
Use this method to send a game. On success, the sent Message is returned.

### Method
POST

### Endpoint
/api/sendGame

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **game** (string) - Required - Short name of the game, taken from the JSON encoded parameters of the game message that was sent <a href="https://core.telegram.org/bots/api#sendgameshortname">(see documentation)</a>.
- **extra** (object) - Optional - Additional parameters for the game message.

### Request Example
```json
{
  "game": "my_game_short_name"
}
````

### Response

#### Success Response (200)

- **GameMessage** - The sent game message object.

#### Response Example

```json
{
  "message_id": 12345,
  "chat": {
    "id": 123456789,
    "first_name": "Test",
    "type": "private"
  },
  "game": {
    "title": "My Awesome Game"
  },
  "date": 1678886400
}
```

````

--------------------------------

### Answer Game Query using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Answers a game query. This method is used to respond to a user's interaction with a game within Telegram. It returns a promise that resolves to true.

```typescript
answerGameQuery(url: string): Promise<true>
````

---

### Create middleware for handling specified commands (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

The `command` method generates middleware that triggers when a specific command is received. It takes the command name or a trigger function and a list of middleware functions to execute.

```typescript
import { Composer, Update } from "telegraf";
import { NarrowedContext } from "telegraf/typings/context";
import { Message } from "telegraf/typings/core/types";

type MyContext = NarrowedContext<any, { message: Message.TextMessage }>;

const commandMiddleware = Composer.command<MyContext>("start", async (ctx) => {
  await ctx.reply("Hello!");
});
```

---

### replyWithMarkdownV2

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send a message formatted using Markdown V2. This is the recommended method for sending Markdown formatted messages.

````APIDOC
## POST /replyWithMarkdownV2

### Description
Sends a message formatted with Markdown V2.

### Method
POST

### Endpoint
/replyWithMarkdownV2

### Parameters
#### Request Body
- **markdown** (string) - Required - The Markdown V2 formatted text.
- **extra** (object) - Optional - Extra parameters.

### Request Example
```json
{
  "markdown": "*bold text* _italic text_"
}
````

### Response

#### Success Response (200)

- **TextMessage** (object) - The sent text message.

#### Response Example

```json
{}
```

### See

https://core.telegram.org/bots/api#sendmessage

````

--------------------------------

### replyWithDocument

Source: https://telegraf.js.org/classes/Context

Sends a document to a chat. Supports captions.

```APIDOC
## POST /websites/telegraf_js

### Description
Sends a document to a chat. Supports captions.

### Method
POST

### Endpoint
/websites/telegraf_js

### Parameters
#### Request Body
- **document** (string | object) - The document file to send. Can be a file ID or a URL.
- **extra** (object) - Optional - Additional parameters, including `caption` for the document.
  - **caption** (string) - Optional - Caption for the document.

### Response
#### Success Response (200)
- **result** (object) - The sent `DocumentMessage` object.

### Response Example
```json
{
  "result": {
    "message_id": 123,
    "from": {
      "id": 456,
      "is_bot": true,
      "first_name": "TestBot"
    },
    "chat": {
      "id": 789,
      "type": "private"
    },
    "date": 1678886400,
    "document": {
      "file_id": "BQACAgIAAxkBAAIlQ2U_z010_z010_z010_z010_z010_z010_z010_z010_z010_z010",
      "file_unique_id": "AQAD0z0",
      "file_name": "document.pdf",
      "mime_type": "application/pdf",
      "file_size": 1024
    }
  }
}
````

### See

https://core.telegram.org/bots/api#senddocument

````

--------------------------------

### Composer.cashtag

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that handles messages containing cashtags.

```APIDOC
## Composer.cashtag

### Description
Creates middleware that handles messages containing cashtags.

### Method
`cashtag<C>(cashtag, ...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **cashtag** (MaybeArray<string>) - Required - The cashtag(s) to match.
- **fns** (MatchedMiddleware<C, "channel_post" | "message">) - Required - Middleware functions to execute.

### Returns
`MiddlewareFn<C>`
````

---

### Telegraf Properties

Source: https://telegraf.js.org/classes/Telegraf-1

Provides access to various properties of the Telegraf instance, including bot information, configuration, and Telegram API client.

```APIDOC
## Properties

### `Optional` botInfo
* **Type**: UserFromGetMe
* **Description**: Bot's information, fetched from `getMe`. Can be set manually to avoid implicit calls.

### `Private` `Optional` botInfoCall
* **Type**: Promise<UserFromGetMe>
* **Description**: A promise that resolves with the bot's information.

### `Readonly` context
* **Type**: Partial<C>
* **Description**: A context object that can be used to store custom data for the bot.

### `Private` `Readonly` options
* **Type**: Options<C>
* **Description**: The configuration options used to initialize the Telegraf instance.

### `Private` `Optional` polling
* **Type**: Polling
* **Description**: Configuration for polling updates from Telegram.

### telegram
* **Type**: Telegram
* **Description**: An instance of the Telegram API client, used for interacting with the Telegram Bot API.

### webhookFilter
* **Type**: (this: { hookPath: string; path: string; secretToken?: string; }, req: IncomingMessage) => boolean
* **Description**: A middleware function to filter incoming webhook requests. It receives context about the hook path and the request object. Must be a regular function, not an arrow function, for proper binding.
  * **`hookPath`** (string) - The path configured for the webhook.
  * **`path`** (string) - Alias for `hookPath`.
  * **`Optional` secretToken** (string) - The secret token configured for the webhook.
  * **`req`** (IncomingMessage) - The incoming HTTP request object.
* **Returns**: boolean - `true` if the request should be processed, `false` otherwise.

### `Private` `Optional` webhookServer
* **Type**: Server<typeof IncomingMessage, typeof ServerResponse> | Server<typeof IncomingMessage, typeof ServerResponse>
* **Description**: The underlying HTTP server instance used for handling webhooks.

### `Static` mount
* **Type**: { <Ctx, Filter>(filters: MaybeArray<Filter>, ...fns: NonemptyReadonlyArray<Middleware<FilteredContext<Ctx, Filter>>>): MiddlewareFn<Ctx>; }
* **Description**: A static method, equivalent to `Composer.on`, used to create middleware that handles specific update types or filters.
  * **Type Parameters**:
    * **`Ctx`** extends Context<Update>
    * **`Filter`** extends UpdateType | Guard<Ctx["update"]>
  * **Parameters**:
    * **`filters`** (MaybeArray<Filter>) - The update type(s) or filter function to match.
    * **`...fns`** (NonemptyReadonlyArray<Middleware<FilteredContext<Ctx, Filter>>>) - The middleware functions to execute.
  * **Returns**: MiddlewareFn<Ctx>
* **Deprecated**: Use `Composer.on` instead.
```

---

### FmtString Class

Source: https://telegraf.js.org/classes/Format

Provides details about the FmtString class, its constructor, properties, and static methods.

```APIDOC
## Class FmtString<Brand>

### Description
The FmtString class is used for formatting strings within Telegraf.js, with support for message entities and custom branding.

### Type Parameters
* **Brand** - A string type parameter that extends `string`.

### Hierarchy
* FmtString

### Implements
* FmtString<Brand>

### Implemented by
* FmtString

## Constructors
### constructor

**Description**: Creates an instance of FmtString.

**Signature**: `new FmtString<Brand>(text: string, entities?: MessageEntity[]): FmtString<Brand>`

**Parameters**:
* **text** (`string`) - The main text content.
* **entities** (`MessageEntity[]`, `Optional`) - An array of message entities to associate with the text.

**Returns**: `FmtString<Brand>` - A new instance of FmtString.

## Properties
### __to_nest

**Type**: `Brand`
**Description**: Represents a nested structure or branding identifier.

### entities

**Type**: `MessageEntity[]` (Optional)
**Description**: An array of message entities associated with the formatted string.

### parse_mode

**Type**: `undefined` (Optional)
**Description**: Placeholder for parse mode, typically undefined in this context.

### text

**Type**: `string`
**Description**: The raw text content of the formatted string.

## Methods
### normalise (Static)

**Description**: Normalizes the given content into a FmtString instance.

**Signature**: `normalise(content: Nestable<string>): FmtString<string>`

**Parameters**:
* **content** (`Nestable<string>`) - The content to normalize, which can be nested.

**Returns**: `FmtString<string>` - A normalized FmtString instance.

### Settings

**Member Visibility**: Protected, Private, Inherited

**Theme**: OSLightDark

### On This Page
* constructor
* __to_nest
* entities
* parse_mode
* text
* normalise

*Generated using TypeDoc*
```

---

### replyWithMediaGroup

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send a group of media files. See the Telegram Bot API documentation for detailed usage.

````APIDOC
## POST /replyWithMediaGroup

### Description
Sends a group of media files.

### Method
POST

### Endpoint
/replyWithMediaGroup

### Parameters
#### Request Body
- **media** (array) - Required - An array of media objects.
- **extra** (object) - Optional - Extra parameters.

### Request Example
```json
{
  "media": [
    { "type": "photo", "media": "..." },
    { "type": "video", "media": "..." }
  ]
}
````

### Response

#### Success Response (200)

- **(DocumentMessage | AudioMessage | PhotoMessage | VideoMessage)[]** (array) - An array of sent message objects.

#### Response Example

```json
[]
```

### See

https://core.telegram.org/bots/api#sendmediagroup

````

--------------------------------

### Static branch

Source: https://telegraf.js.org/classes/Telegraf-1

Creates a conditional middleware. It runs one middleware if a predicate returns true, and another if it returns false.

```APIDOC
## Static branch

### Description
Creates a conditional middleware. Runs one middleware if a predicate returns true, and another if it returns false.

### Method
POST

### Endpoint
/branch

### Parameters
#### Path Parameters
* **predicate** (boolean | Predicate<C> | AsyncPredicate<C>)
  * Required
  * A condition that determines which middleware to execute.
* **trueMiddleware** (Middleware<C>)
  * Required
  * Middleware to run if the predicate returns true.
* **falseMiddleware** (Middleware<C>)
  * Required
  * Middleware to run if the predicate returns false.

### Response
#### Success Response (200)
* **MiddlewareFn<C>** (MiddlewareFn)
  * A middleware function that routes based on a condition.

### Request Example
```json
{
  "example": "bot.use(Telegraf.branch(ctx => ctx.message.text === 'help', helpHandler, defaultHandler))"
}
````

### Response Example

```json
{
  "example": "MiddlewareFn"
}
```

````

--------------------------------

### Composer.textLink Middleware

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that triggers for messages containing text links.

```APIDOC
## Composer.textLink

### Description
Creates middleware that triggers for messages containing text links. The `link` parameter specifies the URL of the text link to match.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage:
// bot.use(Composer.textLink('https://example.com', ctx => ctx.reply('Link detected')))
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### Send Audio Message with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends an audio file to a Telegram chat. Supports optional captions. Requires the audio file path or InputFile object. Returns a Promise resolving to an AudioMessage object.

```typescript
async sendAudio(audio: string | InputFile, extra?: {
  caption?: string | FmtString<string>;
}): Promise<AudioMessage>
````

---

### URL Middleware

Source: https://telegraf.js.org/classes/Scenes

Registers middleware for handling URL triggers.

````APIDOC
## URL Middleware

### Description
Registers middleware for handling URL triggers.

### Method
`composer.url(url, ...fns)`

### Parameters
#### Path Parameters
- **url** (Triggers<C>) - Required - The URL triggers.
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "url": "https://example.com",
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **WizardScene<C>** - The scene context.

#### Response Example

```json
{
  "scene": "WizardScene"
}
```

````

--------------------------------

### Reply with Contact using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends contact information. Requires phone number and first name, along with optional extra parameters. Returns the sent ContactMessage.

```typescript
/**
 * Sends contact information.
 * @param args - The phone number, first name, and optional extra parameters.
 * @returns Promise<ContactMessage>
 */
async replyWithContact(...args: [phoneNumber: string, firstName: string, extra?: Omit<{}, "phone_number" | "chat_id" | "first_name">]): Promise<ContactMessage>
````

---

### Send Document

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to send general files. On success, the sent Message is returned.

```APIDOC
## POST /websites/telegraf_js/sendDocument

### Description
Sends a general file to the chat. On success, the sent Message is returned.

### Method
POST

### Endpoint
/websites/telegraf_js/sendDocument

### Parameters
#### Request Body
- **document** (string | InputFile) - Required - File to send.
- **extra** (object) - Optional - Additional options for the document message.
  - **caption** (string | FmtString<string>) - Optional - Caption for the document.
```

---

### Create New Sticker Set

Source: https://telegraf.js.org/classes/Telegram

Creates a new sticker set for a user. The bot must be owned by the user to create and manage the sticker set. This includes defining the sticker set's name, title, and associated sticker data.

```javascript
createNewStickerSet(ownerId, name, title, stickerData): Promise<true>
```

---

### Composer.reply

Source: https://telegraf.js.org/classes/Composer

A shorthand middleware for sending replies.

````APIDOC
## Composer.reply

### Description
A shorthand middleware for sending replies.

### Method
`reply(...args)`

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
{
  "args": ["Hello!", {"parse_mode": "HTML"}]
}
````

### Response

#### Success Response (200)

`MiddlewareFn<Context<Update>>`

#### Response Example

```json
{
  "middleware": "[Middleware function object]"
}
```

````

--------------------------------

### Reply with Media Group using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a media group (e.g., multiple photos or videos) to a chat. Accepts a rest parameter for media and optional extra parameters.

```typescript
/**
 * Sends a media group to a chat.
 * @param media The media group to send.
 * @param extra Optional additional parameters.
 * @returns A promise that resolves with an array of message types.
 */
replyWithMediaGroup(...args: [media: MediaGroup, extra?: Omit<Parameters<typeof telegram.sendMediaGroup>[1], "chat_id" | "media">]): Promise<(DocumentMessage | AudioMessage | PhotoMessage | VideoMessage)>
````

---

### Register enter middleware in Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Registers middleware that will be executed when entering the scene. It accepts a list of middleware functions.

```typescript
wizardScene.enter(async (ctx) => {
  await ctx.reply("Entering the wizard!");
});
```

---

### Composer Methods

Source: https://telegraf.js.org/classes/Telegraf-1

This section covers methods for composing middleware, including registering handlers for specific message types and commands.

````APIDOC
## POST /api/users

### Description
Registers middleware for handling matching inline queries.

### Method
POST

### Endpoint
/api/users

### Parameters
#### Path Parameters
- **userId** (string) - Required - The ID of the user to retrieve.

#### Query Parameters
- **isActive** (boolean) - Optional - Filter users by their active status.

### Request Example
```json
{
  "username": "johndoe",
  "email": "john.doe@example.com"
}
````

### Response

#### Success Response (200)

- **id** (string) - The unique identifier for the user.
- **username** (string) - The username of the user.
- **email** (string) - The email address of the user.

#### Response Example

```json
{
  "id": "user123",
  "username": "johndoe",
  "email": "john.doe@example.com"
}
```

````

```APIDOC
## POST /api/users/{userId}

### Description
Updates an existing user's information.

### Method
POST

### Endpoint
/api/users/{userId}

### Parameters
#### Path Parameters
- **userId** (string) - Required - The ID of the user to update.

#### Request Body
- **email** (string) - Optional - The new email address for the user.

### Request Example
```json
{
  "email": "john.doe.updated@example.com"
}
````

### Response

#### Success Response (200)

- **message** (string) - Confirmation message indicating the user was updated.

#### Response Example

```json
{
  "message": "User updated successfully."
}
```

````

```APIDOC
## DELETE /api/users/{userId}

### Description
Deletes a user by their ID.

### Method
DELETE

### Endpoint
/api/users/{userId}

### Parameters
#### Path Parameters
- **userId** (string) - Required - The ID of the user to delete.

### Request Example
(No request body needed for deletion)

### Response
#### Success Response (200)
- **message** (string) - Confirmation message indicating the user was deleted.

#### Response Example
```json
{
  "message": "User deleted successfully."
}
````

````

```APIDOC
## POST /api/messages

### Description
Sends a new message to a specified chat.

### Method
POST

### Endpoint
/api/messages

### Parameters
#### Request Body
- **chatId** (string | number) - Required - The ID of the chat to send the message to.
- **text** (string) - Required - The content of the message.
- **parseMode** (string) - Optional - The parsing mode for the message text (e.g., 'HTML', 'MarkdownV2').

### Request Example
```json
{
  "chatId": "123456789",
  "text": "Hello, world!",
  "parseMode": "HTML"
}
````

### Response

#### Success Response (200)

- **messageId** (number) - The ID of the sent message.
- **chat** (object) - Information about the chat the message was sent to.

#### Response Example

```json
{
  "messageId": 101,
  "chat": {
    "id": "123456789",
    "type": "private"
  }
}
```

````

```APIDOC
## POST /api/webhooks

### Description
Configures a webhook for receiving Telegram updates.

### Method
POST

### Endpoint
/api/webhooks

### Parameters
#### Request Body
- **url** (string) - Required - The URL to receive webhook updates.

### Request Example
```json
{
  "url": "https://your-domain.com/webhook"
}
````

### Response

#### Success Response (200)

- **status** (string) - The status of the webhook configuration.

#### Response Example

```json
{
  "status": "webhook_configured"
}
```

````

```APIDOC
## POST /api/bot/command/register

### Description
Registers a new command handler for the bot.

### Method
POST

### Endpoint
/api/bot/command/register

### Parameters
#### Request Body
- **command** (string) - Required - The command name (e.g., 'start').
- **description** (string) - Optional - A description for the command.

### Request Example
```json
{
  "command": "help",
  "description": "Displays help information."
}
````

### Response

#### Success Response (200)

- **message** (string) - Confirmation message indicating the command was registered.

#### Response Example

```json
{
  "message": "Command /help registered successfully."
}
```

````

```APIDOC
## POST /api/bot/middleware/register

### Description
Registers a custom middleware function for the bot.

### Method
POST

### Endpoint
/api/bot/middleware/register

### Parameters
#### Request Body
- **middlewareName** (string) - Required - A name for the middleware.
- **middlewareFunction** (string) - Required - The middleware function code as a string.

### Request Example
```json
{
  "middlewareName": "loggingMiddleware",
  "middlewareFunction": "(ctx, next) => { console.log(ctx.update.message.text); next(); }"
}
````

### Response

#### Success Response (200)

- **message** (string) - Confirmation message indicating the middleware was registered.

#### Response Example

```json
{
  "message": "Middleware 'loggingMiddleware' registered successfully."
}
```

````

```APIDOC
## POST /api/bot/launch

### Description
Launches the Telegraf bot.

### Method
POST

### Endpoint
/api/bot/launch

### Parameters
#### Request Body
- **onLaunchCallback** (string) - Optional - A stringified function to execute when the bot launches.

### Request Example
```json
{
  "onLaunchCallback": "() => console.log('Bot is running!')"
}
````

### Response

#### Success Response (200)

- **status** (string) - The status of the bot launch.

#### Response Example

```json
{
  "status": "bot_launched"
}
```

````

```APIDOC
## POST /api/bot/mention

### Description
Registers middleware for handling mentions in messages.

### Method
POST

### Endpoint
/api/bot/mention

### Parameters
#### Request Body
- **mention** (string | string[]) - Required - The mention(s) to match.
- **middlewareFunction** (string) - Required - The middleware function code as a string.

### Request Example
```json
{
  "mention": "@mybot",
  "middlewareFunction": "(ctx) => ctx.reply('You mentioned me!')"
}
````

### Response

#### Success Response (200)

- **message** (string) - Confirmation message indicating the mention handler was registered.

#### Response Example

```json
{
  "message": "Mention handler for '@mybot' registered successfully."
}
```

````

```APIDOC
## POST /api/bot/phone

### Description
Registers middleware for handling phone number sharing.

### Method
POST

### Endpoint
/api/bot/phone

### Parameters
#### Request Body
- **phoneNumber** (string) - Required - The phone number to match.
- **middlewareFunction** (string) - Required - The middleware function code as a string.

### Request Example
```json
{
  "phoneNumber": "+1234567890",
  "middlewareFunction": "(ctx) => ctx.reply('Thanks for sharing your number!')"
}
````

### Response

#### Success Response (200)

- **message** (string) - Confirmation message indicating the phone number handler was registered.

#### Response Example

```json
{
  "message": "Phone number handler for '+1234567890' registered successfully."
}
```

````

```APIDOC
## POST /api/bot/reaction

### Description
Registers middleware for handling message reactions.

### Method
POST

### Endpoint
/api/bot/reaction

### Parameters
#### Request Body
- **reaction** (object | object[]) - Required - The reaction(s) to match (e.g., `{ type: { emoji: '👍' } }`).
- **middlewareFunction** (string) - Required - The middleware function code as a string.

### Request Example
```json
{
  "reaction": {"type": {"emoji": "👍"}},
  "middlewareFunction": "(ctx) => ctx.reply('I see you liked it!')"
}
````

### Response

#### Success Response (200)

- **message** (string) - Confirmation message indicating the reaction handler was registered.

#### Response Example

```json
{
  "message": "Reaction handler for '👍' registered successfully."
}
```

````

```APIDOC
## GET /api/bot/secret-path

### Description
Retrieves the secret path component for the bot.

### Method
GET

### Endpoint
/api/bot/secret-path

### Parameters
(No parameters)

### Request Example
(No request body needed)

### Response
#### Success Response (200)
- **secretPath** (string) - The secret path component.

#### Response Example
```json
{
  "secretPath": "/telegraf/webhook"
}
````

````

```APIDOC
## POST /api/bot/settings

### Description
Registers middleware for handling the '/settings' command.

### Method
POST

### Endpoint
/api/bot/settings

### Parameters
#### Request Body
- **middlewareFunction** (string) - Required - The middleware function code as a string for handling '/settings'.

### Request Example
```json
{
  "middlewareFunction": "(ctx) => ctx.reply('Settings panel...')"
}
````

### Response

#### Success Response (200)

- **message** (string) - Confirmation message indicating the settings handler was registered.

#### Response Example

```json
{
  "message": "Settings handler registered successfully."
}
```

````

```APIDOC
## POST /api/bot/spoiler

### Description
Registers middleware for handling text enclosed in spoiler tags.

### Method
POST

### Endpoint
/api/bot/spoiler

### Parameters
#### Request Body
- **text** (string) - Required - The text to match within spoiler tags.
- **middlewareFunction** (string) - Required - The middleware function code as a string.

### Request Example
```json
{
  "text": "secret message",
  "middlewareFunction": "(ctx) => ctx.reply('You revealed the spoiler!')"
}
````

### Response

#### Success Response (200)

- **message** (string) - Confirmation message indicating the spoiler handler was registered.

#### Response Example

```json
{
  "message": "Spoiler handler for 'secret message' registered successfully."
}
```

````

```APIDOC
## POST /api/bot/on

### Description
Registers middleware for handling updates based on filters.

### Method
POST

### Endpoint
/api/bot/on

### Parameters
#### Request Body
- **filters** (string | string[]) - Required - The update types or message subtypes to filter (e.g., 'text', 'sticker', 'message').
- **middlewareFunction** (string) - Required - The middleware function code as a string.

### Request Example
```json
{
  "filters": "text",
  "middlewareFunction": "(ctx) => ctx.reply('Received a text message!')"
}
````

### Response

#### Success Response (200)

- **message** (string) - Confirmation message indicating the filter handler was registered.

#### Response Example

```json
{
  "message": "Filter handler for 'text' registered successfully."
}
```

````

--------------------------------

### Create middleware for handling game queries (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

The `gameQuery` method generates middleware specifically for handling callback queries related to Telegram games. It allows you to process game-specific data and actions.

```typescript
import { Composer } from 'telegraf';

const gameQueryMiddleware = Composer.gameQuery(async (ctx) => {
  await ctx.answerGameQuery('Game started!');
});
````

---

### Text Link Middleware

Source: https://telegraf.js.org/classes/Scenes

Registers middleware for handling text link triggers.

````APIDOC
## Text Link Middleware

### Description
Registers middleware for handling text link triggers.

### Method
`composer.textLink(link, ...fns)`

### Parameters
#### Path Parameters
- **link** (Triggers<C>) - Required - The text link triggers.
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "link": "https://example.com",
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **WizardScene<C>** - The scene context.

#### Response Example

```json
{
  "scene": "WizardScene"
}
```

````

--------------------------------

### Reply with Photo using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a photo to a chat. Accepts a photo file path or InputFile and optional caption. The `extra` parameter allows for additional options like captions.

```typescript
/**
 * Sends a photo to a chat.
 * @param photo The photo to send (file path or InputFile).
 * @param extra Optional additional parameters, including a caption.
 * @returns A promise that resolves with the PhotoMessage.
 */
replyWithPhoto(photo: string | InputFile, extra?: { caption?: string | FmtString<string>; }): Promise<PhotoMessage>
````

---

### TypeScript Integration

Source: https://telegraf.js.org/index

Information on using Telegraf with TypeScript, highlighting built-in type definitions and the `typegram` package.

````APIDOC
## Telegraf with TypeScript

### Description
Telegraf is written in TypeScript and includes declaration files for the entire library. It also provides types for the Telegram API via the `typegram` package, ensuring type safety and autocompletion for your bot development.

### Method
N/A

### Endpoint
N/A

### Parameters
N/A

### Request Example
```typescript
import { Telegraf, Context, Markup } from 'telegraf';
import { Update, Message } from 'typegram';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx: Context<Update.Message.Text>) => {
  if (ctx.message.text === '/start') {
    ctx.reply('Welcome!', Markup.inlineKeyboard([
      Markup.button.url('Google', 'https://google.com'),
    ]));
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
````

### Key Benefits

- **Type Safety**: Catch errors during development.
- **Autocompletion**: Improved developer experience with IDE support.
- **Comprehensive Types**: Full coverage of Telegraf API and Telegram API via `typegram`.

````

--------------------------------

### ACL Middleware (Static)

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that responds only to specified user IDs.

```APIDOC
## ACL Middleware (Static)

### Description
Generates middleware responding only to specified users.

### Method
`Composer.acl<C>(userId, ...fns)`

### Type Parameters
- **C** extends Context<Update>

### Parameters
#### Path Parameters
- **userId** (MaybeArray<number>) - Required - The user IDs to allow.
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "userId": [12345, 67890],
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **MiddlewareFn<C>** - The middleware function.

#### Response Example

```json
{
  "middleware": "aclMiddleware"
}
```

````

--------------------------------

### Registering action middleware for callback queries

Source: https://telegraf.js.org/classes/Telegraf-1

Registers middleware to handle callback queries that match specific triggers. It accepts triggers and a series of middleware functions. Dependencies include Telegraf, NarrowedContext, CallbackQueryUpdate, and MatchedMiddleware.

```typescript
action(triggers: Triggers<NarrowedContext<C, CallbackQueryUpdate<CallbackQuery>>>, ...fns: MatchedMiddleware<C, "callback_query">): Telegraf<C>
````

---

### Telegraf Bot Command Handling

Source: https://telegraf.js.org/v3

Illustrates how to define and handle custom commands in a Telegraf bot. It shows different ways to reply to commands like '/oldschool', '/modern', and '/hipster'.

```javascript
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.command("oldschool", (ctx) => ctx.reply("Hello"));
bot.command("modern", ({ reply }) => reply("Yo"));
bot.command("hipster", Telegraf.reply("λ"));
bot.launch();
```

---

### Register settings middleware with Telegraf.js

Source: https://telegraf.js.org/classes/Telegraf-1

Registers a middleware specifically for handling the '/settings' command. It accepts a rest parameter for middleware functions and returns the Telegraf instance.

```typescript
settings(...fns: NonemptyReadonlyArray<Middleware<Context<{
message: New & NonChannel & TextMessage;
update_id: number;
}> & Omit<C, keyof Context<Update>> & CommandContextExtn>>): Telegraf<C>
```

---

### POST /api/command

Source: https://telegraf.js.org/classes/Telegraf-1

Registers middleware for handling specified commands. This is the primary method for creating command-based interactions.

```APIDOC
## POST /api/command

### Description
Registers middleware for handling specified commands.

### Method
POST

### Endpoint
`/api/command`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **command** (Triggers) - Required - The command string or a list of command strings.
- **...fns** (NonemptyReadonlyArray<Middleware>) - Required - Middleware functions to execute when the command is received.
```

---

### Set Chat Description with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sets the description for a chat. Accepts an optional description string. Returns true on success.

```typescript
await ctx.setChatDescription("New chat description");
```

---

### Send Game

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to send a game. On success, the sent Message is returned.

```APIDOC
## POST /websites/telegraf_js/sendGame

### Description
Sends a game to the chat. On success, the sent Message is returned.

### Method
POST

### Endpoint
/websites/telegraf_js/sendGame

### Parameters
#### Request Body
- **game** (string) - Required - Title of the game, obtained via BotFather.
- **extra** (object) - Optional - Additional options for the game message.
```

---

### Handling game queries with middleware

Source: https://telegraf.js.org/classes/Telegraf-1

Registers middleware specifically for handling game queries sent via callback buttons. It accepts a series of middleware functions. Dependencies include Telegraf, NarrowedContext, CallbackQueryUpdate, GameQuery, and NonemptyReadonlyArray.

```typescript
gameQuery(...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, CallbackQueryUpdate<GameQuery>>>>): Telegraf<C>
```

---

### Composer.phone Middleware

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that triggers for messages containing phone numbers.

````APIDOC
## Composer.phone

### Description
Creates middleware that triggers for messages containing phone numbers. The `number` parameter specifies the phone number to match.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage:
// bot.use(Composer.phone('+1234567890', ctx => ctx.reply('Phone number detected')))
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### Static url Middleware

Source: https://telegraf.js.org/classes/Composer

The `url` static method creates a middleware that matches a specific URL and executes subsequent middleware functions.

```APIDOC
## Static url

### Description
Creates a middleware that matches a specific URL.

### Method
`Static.url<C>(url: Triggers<C>, ...fns: MatchedMiddleware<C, "channel_post" | "message">): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **url** (Triggers<C>) - Required - The URL to match.
- **fns** (MatchedMiddleware<C, "channel_post" | "message">) - Required - Middleware functions to execute when the URL matches.
````

---

### Set Sticker Keywords - Telegraf.js

Source: https://telegraf.js.org/classes/Telegram

Sets keywords for a sticker, which helps users find the sticker by searching. The `keywords` parameter is an optional array of strings. The method returns a promise that resolves to true upon successful update.

```typescript
setStickerKeywords(sticker: string, keywords?: string[]): Promise<true>
```

---

### Composer.catch

Source: https://telegraf.js.org/classes/Scenes

Creates middleware for handling errors within the middleware chain.

```APIDOC
## Composer.catch

### Description
Creates middleware for handling errors within the middleware chain.

### Method
`catch<C>(errorHandler, ...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **errorHandler** ((err, ctx) => void) - Required - The error handling function.
- **fns** (readonly Middleware<C>[]) - Required - Middleware functions to execute.

### Returns
`MiddlewareFn<C>`
```

---

### Static Fork Middleware

Source: https://telegraf.js.org/classes/Composer

Creates middleware that executes in the background, allowing the main chain to continue.

````APIDOC
## Static fork

### Description
Generates middleware that runs in the background.

### Method
N/A (Static method)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Usage
```typescript
fork<C>(middleware: Middleware<C>): MiddlewareFn<C>
````

````

--------------------------------

### Attach Telegraf to an existing HTTPS server using createWebhook

Source: https://telegraf.js.org/index

This snippet demonstrates integrating Telegraf webhooks with an HTTPS server. It uses Node.js's `https` module and requires `tlsOptions` to be defined for secure connections.

```javascript
import { createServer } from "https";

createServer(tlsOptions, await bot.createWebhook({ domain: "example.com" })).listen(8443);
````

---

### Set Chat Photo using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sets the photo for a chat. Requires an InputFile object for the photo.

```javascript
await ctx.setChatPhoto(...args: [photo: InputFile]);
```

---

### Static unwrap Middleware

Source: https://telegraf.js.org/classes/Composer

The `unwrap` static method is used to unwrap a middleware handler, allowing for more flexible middleware composition.

```APIDOC
## Static unwrap

### Description
Unwraps a middleware handler.

### Method
`Static.unwrap<C>(handler: Middleware<C>): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **handler** (Middleware<C>) - Required - The middleware handler to unwrap.
```

---

### Instantiate Telegram

Source: https://telegraf.js.org/classes/Telegram

Creates a new instance of the Telegram class, which is the main interface for interacting with the Telegram Bot API. Requires a bot token and optionally accepts configuration options and a response object.

```typescript
new Telegram(token, options?, response?): Telegram
```

---

### Handle TextMention (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

Creates middleware that triggers when a user mention is found in text. It accepts a mention pattern and additional middleware. Returns the Telegraf instance.

```javascript
bot.textMention(mention, ...fns);
```

---

### Register command middleware in Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Registers middleware for handling specified commands. It takes a command string and a list of middleware functions as arguments.

```typescript
wizardScene.command("start", async (ctx) => {
  await ctx.reply("Welcome!");
});
```

---

### Handle Game Queries with Telegraf.js

Source: https://telegraf.js.org/classes/Composer

Registers middleware specifically for handling game query updates. It accepts a sequence of middleware functions to process these queries.

```typescript
composer.gameQuery(...fns);
```

---

### Handle TextLink (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

Creates middleware that triggers when a text link is encountered. It takes a link pattern and subsequent middleware functions. Returns the Telegraf instance.

```javascript
bot.textLink(link, ...fns);
```

---

### replyWithMarkdown

Source: https://telegraf.js.org/classes/Context

Sends a message with Markdown formatting. Deprecated: use `Context.replyWithMarkdownV2` instead.

````APIDOC
## POST /sendMessage (Markdown)

### Description
Sends a message with Markdown formatting. Deprecated: use `Context.replyWithMarkdownV2` instead.

### Method
POST

### Endpoint
/sendMessage

### Parameters
#### Path Parameters
- `markdown` (string) - Required - The message text with Markdown formatting.
- `extra` (object) - Optional - Additional parameters for sending the message.

### Request Example
```json
{
  "markdown": "*Hello* _World_ `Telegraf`"
}
````

### Response

#### Success Response (200)

- `TextMessage` (object) - The sent text message.

#### Response Example

```json
{
  "message_id": 12345,
  "from": { ... },
  "chat": { ... },
  "date": 1678886400,
  "text": "*Hello* _World_ `Telegraf`"
}
```

````

--------------------------------

### replyWithInvoice

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send an invoice. See the Telegram Bot API documentation for detailed usage.

```APIDOC
## POST /replyWithInvoice

### Description
Sends an invoice to the user.

### Method
POST

### Endpoint
/replyWithInvoice

### Parameters
N/A

### Request Example
```json
{}
````

### Response

#### Success Response (200)

- **InvoiceMessage** (object) - The sent invoice message.

#### Response Example

```json
{}
```

### See

https://core.telegram.org/bots/api#sendinvoice

````

--------------------------------

### POST /api/gameQuery

Source: https://telegraf.js.org/classes/Telegraf-1

Registers middleware for handling game queries. This method is specific to handling interactions related to Telegram games.

```APIDOC
## POST /api/gameQuery

### Description
Registers middleware for handling game queries.

### Method
POST

### Endpoint
`/api/gameQuery`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **...fns** (NonemptyReadonlyArray<Middleware>) - Required - Middleware functions to handle game queries.
````

---

### POST /setChatStickerSet

Source: https://telegraf.js.org/classes/Context

Use this method to set a sticker set as the group sticker pack for a group. The bot must be an administrator in the group for this to work.

````APIDOC
## POST /setChatStickerSet

### Description
Use this method to set a sticker set as the group sticker pack for a group. The bot must be an administrator in the group for this to work.

### Method
POST

### Endpoint
/setChatStickerSet

### Parameters
#### Request Body
- **setName** (string) - Required

### Response
#### Success Response (200)
- **true** (boolean) - Returns true on success.

#### Response Example
```json
{
  "result": true
}
````

````

--------------------------------

### Set My Commands using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sets the bot's commands. This method is deprecated and suggests using `Telegram.setMyCommands`.

```javascript
await ctx.setMyCommands(commands: readonly BotCommand[]);
````

---

### Create middleware that runs in the background (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

The `fork` method creates middleware that executes asynchronously without blocking the main bot flow. This is ideal for long-running tasks or operations that don't require immediate user feedback.

```typescript
import { Composer } from "telegraf";

const backgroundTaskMiddleware = Composer.fork(async (ctx) => {
  // Simulate a background task
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("Background task finished");
});
```

---

### Set Chat Sticker Set using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sets the sticker set for a chat. Requires the name of the sticker set.

```javascript
await ctx.setChatStickerSet(setName: string);
```

---

### POST /sendSticker

Source: https://telegraf.js.org/classes/Context

Use this method to send static. We recommend using https://core.telegram.org/bots/api#stickersticker for static .

````APIDOC
## POST /sendSticker

### Description
Use this method to send static. We recommend using https://core.telegram.org/bots/api#stickersticker for static .

### Method
POST

### Endpoint
/sendSticker

### Parameters
#### Request Body
- **sticker** (string | InputFile) - Required
- **extra** (Omit<{}, "chat_id" | "sticker">) - Optional

### Response
#### Success Response (200)
- **StickerMessage** (object) - Description of the StickerMessage

#### Response Example
```json
{
  "sticker": "sticker_object"
}
````

````

--------------------------------

### Composer.reply Middleware

Source: https://telegraf.js.org/classes/Scenes

A convenient function to reply to a message with text and optional extra parameters.

```APIDOC
## Composer.reply

### Description
Provides a shortcut to reply to a message. It accepts the reply text and optional formatting or extra parameters.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage:
// bot.hears('hi', Composer.reply('Hello there!'))
// bot.hears('bold', Composer.reply('<b>Bold text</b>', { parse_mode: 'HTML' }))
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### Composer.gameQuery

Source: https://telegraf.js.org/classes/Composer

Generates middleware for handling game queries. This middleware is executed when a game query update is received.

```APIDOC
## POST /composer/gameQuery

### Description
Generates middleware for handling game queries. This middleware is executed when a game query update is received.

### Method
POST

### Endpoint
/composer/gameQuery

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
None

#### Response Example
None
````

---

### Reply with Photo using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a photo message. Accepts a photo file path or InputFile and optionally a caption.

```javascript
replyWithPhoto(photo: string | InputFile, extra?: { caption?: string | FmtString<string>; }): Promise<PhotoMessage>
```

---

### Static Cashtag Middleware

Source: https://telegraf.js.org/classes/Composer

Creates middleware that handles messages containing specific cashtags.

````APIDOC
## Static cashtag

### Description
Creates middleware that handles messages containing specific cashtags.

### Method
N/A (Static method)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Usage
```typescript
cashtag<C>(cashtag: MaybeArray<string>, ...fns: MatchedMiddleware<C, "channel_post" | "message">): MiddlewareFn<C>
````

````

--------------------------------

### createChatInviteLink

Source: https://telegraf.js.org/classes/Telegram

Creates an invite link for a chat. The bot must be an administrator in the chat for this to work.

```APIDOC
## POST /createChatInviteLink

### Description
Creates an invite link for a chat. The bot must be an administrator in the chat for this to work.

### Method
POST

### Endpoint
/createChatInviteLink

### Parameters
#### Path Parameters

#### Query Parameters

#### Request Body
- **chatId** (string | number) - Required - The chat ID or username of the channel.
- **extra** (Omit<{}, "chat_id">) - Optional - Additional parameters for creating the invite link.

### Request Example
```json
{
  "chatId": "@my_channel"
}
````

### Response

#### Success Response (200)

- **ChatInviteLink** (ChatInviteLink) - An object containing information about the created invite link.

````

--------------------------------

### Export Chat Invite Link (Telegraf.js)

Source: https://telegraf.js.org/classes/Context

Exports a new invite link for a chat. This method accepts a rest parameter for arguments and returns a Promise that resolves to the invite link string.

```javascript
async exportChatInviteLink(...args: []): Promise<string>
````

---

### Phone Middleware

Source: https://telegraf.js.org/classes/Scenes

Registers middleware for handling phone-related triggers in messages.

````APIDOC
## Phone Middleware

### Description
Registers middleware for handling phone-related triggers in messages.

### Method
`composer.phone(number, ...fns)`

### Parameters
#### Path Parameters
- **number** (Triggers<C>) - Required - The phone number triggers.
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "number": "+1234567890",
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **WizardScene<C>** - The scene context.

#### Response Example

```json
{
  "scene": "WizardScene"
}
```

````

--------------------------------

### setMyShortDescription

Source: https://telegraf.js.org/classes/Telegram

Changes the bot's short description, which is shown on the bot's profile page and sent together with the link when users share the bot.

```APIDOC
## POST /setMyShortDescription

### Description
Changes the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot.

### Method
POST

### Endpoint
/setMyShortDescription

### Parameters
#### Path Parameters
- None

#### Query Parameters
- **short_description** (string) - Required - New short description for the bot.
- **language_code** (string) - Optional - A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description.

#### Request Body
- None

### Request Example
```json
{
  "short_description": "Get the latest news instantly!",
  "language_code": "en"
}
````

### Response

#### Success Response (200)

- **true** - Indicates that the short description was set successfully.

#### Response Example

```json
{
  "true": true
}
```

````

--------------------------------

### Send Video Note using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a video note to a chat. Requires a video note identifier (string or InputFileVideoNote) and optionally accepts extra parameters.

```javascript
await ctx.sendVideoNote(videoNote: string | InputFileVideoNote, extra?: Omit<{}, "chat_id" | "video_note">);
````

---

### Set Chat Description using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sets a description for a chat. Accepts an optional description string.

```javascript
await ctx.setChatDescription(...args: [description?: string]);
```

---

### Static Creator Middleware

Source: https://telegraf.js.org/classes/Composer

Creates middleware that responds only to chat creators.

````APIDOC
## Static creator

### Description
Generates middleware responding only to chat creator.

### Method
N/A (Static method)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Usage
```typescript
creator<C>(...fns: NonemptyReadonlyArray<Middleware<C>>): MiddlewareFn<C>
````

````

--------------------------------

### Telegraf.js: Generate reaction middleware

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that triggers based on specific message reactions (added or removed). It allows bots to respond to user emoji reactions on messages.

```typescript
import { Middleware, Context, Update } from 'telegraf';
import { ReactionAddedOrRemoved } from 'telegraf/typings/reactions';

// Type for matched middleware, specific to message_reaction events
type MatchedMiddleware<C, T extends 'channel_post' | 'message'> = Middleware<C & { match: ReactionAddedOrRemoved }>;

// Middleware function type
type MiddlewareFn<C extends Context<Update>> = (ctx: C, next: () => Promise<void>) => Promise<void>;

const reaction = <C extends Context<Update>>(reaction: MaybeArray<ReactionAddedOrRemoved>, ...fns: MatchedMiddleware<C, "channel_post" | "message">[]): MiddlewareFn<C> => {
    // Implementation details for reaction middleware
    // This would involve checking ctx.update.reaction or ctx.update.old_state for reactions
    return async (ctx: C, next: () => Promise<void>) => {
        // Placeholder for actual logic
        console.log(`Checking for reaction: ${reaction}`);
        await next();
    };
};

// Example usage:
// bot.on('message_reaction', reaction('👍', (ctx) => ctx.reply('Thanks for the thumbs up!')));
````

---

### sendQuiz

Source: https://telegraf.js.org/classes/Context

Send a quiz. On success, the sent Message is returned.

````APIDOC
## POST /api/sendQuiz

### Description
Send a quiz. On success, the sent Message is returned.

### Method
POST

### Endpoint
/api/sendQuiz

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **quiz** (string) - Required - Quiz question.
- **options** (string[]) - Required - Quiz answer options.
- **extra** (object) - Optional - Additional parameters for the quiz message.

### Request Example
```json
{
  "quiz": "What is the capital of France?",
  "options": ["London", "Paris", "Berlin"],
  "extra": {
    "correct_option_id": 1
  }
}
````

### Response

#### Success Response (200)

- **PollMessage** - The sent quiz message object.

#### Response Example

```json
{
  "message_id": 12345,
  "chat": {
    "id": 123456789,
    "first_name": "Test",
    "type": "private"
  },
  "poll": {
    "id": "654321",
    "question": "What is the capital of France?",
    "options": [
      { "text": "London", "voter_count": 0 },
      { "text": "Paris", "voter_count": 1 },
      { "text": "Berlin", "voter_count": 0 }
    ],
    "is_closed": false,
    "is_anonymous": true,
    "type": "quiz",
    "correct_option_id": 1
  },
  "date": 1678886400
}
```

````

--------------------------------

### Reply with Invoice using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends an invoice. Requires detailed invoice information and accepts optional extra parameters for sending. Returns the sent InvoiceMessage.

```typescript
/**
 * Sends an invoice.
 * @param args - Invoice details and optional extra parameters.
 * @returns Promise<InvoiceMessage>
 */
async replyWithInvoice(...args: [invoice: Omit<{}, "chat_id" | "message_thread_id" | "disable_notification" | "reply_parameters" | "reply_markup">, extra?: Omit<{}, "chat_id" | "protect_content" | "title" | "description" | "payload" | "provider_token" | "currency" | "prices" | "max_tip_amount" | "suggested_tip_amounts" | "provider_data" | "photo_url" | "photo_size" | "photo_width" | "photo_height" | "need_name" | "need_phone_number" | "need_email" | "need_shipping_address" | "send_phone_number_to_provider" | "send_email_to_provider" | "is_flexible" | "start_parameter">]): Promise<InvoiceMessage>
````

---

### reactions

Source: https://telegraf.js.org/classes/Context

Provides access to the `MessageReactions` object, which allows for managing message reactions.

````APIDOC
## reactions

### Description
A property that provides access to the `MessageReactions` object, enabling interactions with message reactions, such as adding or removing them.

### Method
GET

### Endpoint
/websites/telegraf_js/reactions

### Parameters
None

### Response
#### Success Response (200)
* `MessageReactions` - An object to manage message reactions.

### Response Example
```json
{
  "add": "👍",
  "remove": "👎"
}
````

````

--------------------------------

### Composer.passThru Middleware

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that yields control to the next middleware in the chain.

```APIDOC
## Composer.passThru

### Description
Generates middleware that gives up control, allowing the next middleware in the chain to execute.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage:
// bot.use(Composer.passThru()); // Continues to the next middleware
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### Text Mention Middleware

Source: https://telegraf.js.org/classes/Scenes

Registers middleware for handling text mention triggers.

```APIDOC
## Text Mention Middleware

### Description
Registers middleware for handling text mention triggers.

### Method
`composer.textMention(mention, ...fns)`

### Parameters
#### Path Parameters
- **mention** (Triggers<C>) - Required - The text mention triggers.
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "mention": "@username",
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **WizardScene<C>** - The scene context.

#### Response Example

```json
{
  "scene": "WizardScene"
}
```

````

--------------------------------

### Handle URL Clicks (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware for handling clicks on specific URLs within messages. It takes a URL pattern and subsequent middleware functions. Returns the Telegraf instance.

```javascript
bot.url(url, ...fns);
````

---

### Reply with Media Group using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a media group, which can include documents, audio, photos, or videos. It takes a media group as input and can be accompanied by extra parameters.

```javascript
replyWithMediaGroup(...args): Promise<(DocumentMessage | AudioMessage | PhotoMessage | VideoMessage)[]>
```

---

### Composer Properties

Source: https://telegraf.js.org/classes/Composer

Details the properties of the Composer class, including its private handler and static mount methods.

```APIDOC
## Properties

### `Private` handler
* **handler**: MiddlewareFn<C>
  * Description: The primary handler for the composer.

### `Static` mount
* **mount**: { <Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>; <Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>; }
  * Description: Generates middleware for handling provided update types.
  * Type Parameters:
    * **Ctx** extends Context<Update>
    * **Filter** extends UpdateType | Guard<Ctx["update"]>
  * Parameters:
    * **filters**: MaybeArray<Filter>
    * `...fns` (NonemptyReadonlyArray<Middleware<FilteredContext<Ctx, Filter>>>): Middleware functions to apply.
  * Returns: MiddlewareFn<Ctx>
  * Deprecated: Use `Composer.on` instead.
  * Overload 2:
    * Type Parameters:
      * **Ctx** extends Context<Update>
      * **Filter** extends "text" | "sticker" | "animation" | "audio" | "document" | "photo" | "video" | "video_note" | "voice" | "callback_query" | "channel_post" | "chat_member" | "chosen_inline_result" | "edited_channel_post" | "message_reaction" | "message_reaction_count" | "edited_message" | "inline_query" | "message" | "my_chat_member" | "pre_checkout_query" | "poll_answer" | "poll" | "shipping_query" | "chat_join_request" | "chat_boost" | "removed_chat_boost" | "has_media_spoiler" | "contact" | "dice" | "location" | "new_chat_members" | "left_chat_member" | "new_chat_title" | "new_chat_photo" | "delete_chat_photo" | "group_chat_created" | "supergroup_chat_created" | "channel_chat_created" | "message_auto_delete_timer_changed" | "migrate_to_chat_id" | "migrate_from_chat_id" | "pinned_message" | "invoice" | "successful_payment" | "users_shared" | "chat_shared" | "connected_website" | "write_access_allowed" | "passport_data" | "proximity_alert_triggered" | "boost_added" | "forum_topic_created" | "forum_topic_edited" | "forum_topic_closed" | "forum_topic_reopened" | "general_forum_topic_hidden" | "general_forum_topic_unhidden" | "giveaway_created" | "giveaway" | "giveaway_winners" | "giveaway_completed" | "video_chat_scheduled" | "video_chat_started" | "video_chat_ended" | "video_chat_participants_invited" | "web_app_data" | "game" | "story" | "venue" | "forward_date"
    * Parameters:
      * **filters**: MaybeArray<Filter>
      * `...fns` (NonemptyReadonlyArray<Middleware<NarrowedContext<Ctx, MountMap[Filter]>, MountMap[Filter]>>): Middleware functions to apply.
    * Returns: MiddlewareFn<Ctx>
    * Deprecated: Use `Composer.on` instead.
```

---

### Send Video using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a video to a chat. Accepts a video identifier (string or InputFile) and an optional caption.

```javascript
await ctx.sendVideo(video: string | InputFile, extra?: { caption?: string | FmtString<string>; });
```

---

### Reopen Forum Topic with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Reopens a closed topic in a forum supergroup chat. Requires administrator rights and `can_manage_topics`. Returns true on success.

```typescript
/**
 * Use this method to reopen a closed topic in a forum supergroup chat.
 * The bot must be an administrator in the chat and have the can_manage_topics administrator rights, unless it is the creator of the topic.
 * @returns Promise<true>
 */
async reopenForumTopic(): Promise<true>
```

---

### Markup.resize Method

Source: https://telegraf.js.org/classes/Types

Enables or disables the resize_keyboard option for a ReplyKeyboardMarkup. When true, the keyboard height is adjusted dynamically. It returns a Markup object.

```typescript
resize(this, value?: boolean): Markup<ReplyKeyboardMarkup>
```

---

### exportChatInviteLink API

Source: https://telegraf.js.org/interfaces/Scenes

Exports a new invite link for a chat. The bot must be an administrator.

````APIDOC
## POST /exportChatInviteLink

### Description
Exports a new invite link for a chat. The bot must be an administrator of the chat for this to work. Returns the exported invite link as String on success.

### Method
POST

### Endpoint
/exportChatInviteLink

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- None explicitly mentioned, but typically requires chat_id in context or as a parameter.

### Request Example
```json
{
  "chat_id": "-1001234567890"
}
````

### Response

#### Success Response (200)

- **result** (string) - The exported invite link.

#### Response Example

```json
{
  "result": "https://t.me/+exampleLink"
}
```

````

--------------------------------

### Upload Sticker File (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegram

Uploads a .png sticker file for use in sticker set creation. Can be used multiple times. Accepts ownerId, sticker file, and sticker format (video, static, animated).

```javascript
bot.uploadStickerFile(ownerId, sticker, sticker_format)
````

---

### Reply with Venue using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a venue message, including location, title, and address. It requires latitude, longitude, title, and address, with optional extra parameters.

```javascript
replyWithVenue(latitude: number, longitude: number, title: string, address: string, extra?: Omit<{}, "chat_id" | "title" | "latitude" | "longitude" | "address">): Promise<VenueMessage>
```

---

### replyWithPhoto

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send a photo. See the Telegram Bot API documentation for detailed usage.

````APIDOC
## POST /replyWithPhoto

### Description
Sends a photo to the user.

### Method
POST

### Endpoint
/replyWithPhoto

### Parameters
#### Request Body
- **photo** (string | InputFile) - Required - The photo to send.
- **extra** (object) - Optional - Extra parameters, including caption.

### Request Example
```json
{
  "photo": "...",
  "extra": { "caption": "..." }
}
````

### Response

#### Success Response (200)

- **PhotoMessage** (object) - The sent photo message.

#### Response Example

```json
{}
```

### See

https://core.telegram.org/bots/api#sendphoto

````

--------------------------------

### Telegraf.js URL Middleware

Source: https://telegraf.js.org/classes/Scenes

Defines middleware for triggering actions based on URLs. It accepts a URL pattern and a series of middleware functions to handle matching requests. This is useful for routing messages or inline queries that contain specific URLs.

```typescript
url<C>(url: Triggers<C>, ...fns: MatchedMiddleware<C, "channel_post" | "message">): MiddlewareFn<C>
````

---

### Composer.inlineQuery

Source: https://telegraf.js.org/classes/Composer

Generates middleware for handling matching inline queries. This middleware is executed when an inline query update is received.

```APIDOC
## POST /composer/inlineQuery

### Description
Generates middleware for handling matching inline queries. This middleware is executed when an inline query update is received.

### Method
POST

### Endpoint
/composer/inlineQuery

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **triggers** (string | RegExp | (string | RegExp)[]) - Required - The query text or pattern to match.
- **fns** (Middleware<...>) - Required - Middleware to execute when an inline query matches the triggers.

### Request Example
None

### Response
#### Success Response (200)
None

#### Response Example
None
```

---

### Add Sticker to Set using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Adds a sticker to a set. This method requires the name of the sticker set and sticker data, excluding chat ID, name, and user ID. It returns a promise that resolves to true upon successful addition.

```typescript
addStickerToSet(name: string, stickerData: Omit<{}, "chat_id" | "name" | "user_id">): Promise<true>
```

---

### Reopen General Forum Topic with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Reopens the 'General' topic in a forum supergroup chat. Requires administrator rights and `can_manage_topics`. The topic will be unhidden if it was hidden. Returns true on success.

```typescript
/**
 * Use this method to reopen a closed 'General' topic in a forum supergroup chat.
 * The bot must be an administrator in the chat and have the can_manage_topics administrator rights.
 * The topic will be automatically unhidden if it was hidden.
 * @returns Promise<true>
 */
async reopenGeneralForumTopic(): Promise<true>
```

---

### Register inlineQuery middleware in Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Registers middleware for handling incoming inline queries. It takes query triggers and middleware functions.

```typescript
wizardScene.inlineQuery("search", async (ctx) => {
  await ctx.answerInlineQuery([
    {
      id: "1",
      title: "Result 1",
      input_message_content: { message_text: "You searched for search" },
    },
  ]);
});
```

---

### POST /api/handleUpdate

Source: https://telegraf.js.org/classes/Telegraf-1

Processes an incoming update. This method is core to the Telegraf.js update handling pipeline.

```APIDOC
## POST /api/handleUpdate

### Description
Processes an incoming update.

### Method
POST

### Endpoint
`/api/handleUpdate`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **update** (Update) - Required - The incoming Telegram update object.
- **webhookResponse** (ServerResponse) - Optional - The server response object for webhook scenarios.
```

---

### Answer Callback Query

Source: https://telegraf.js.org/classes/Telegram

Answers a callback query sent by the user.

```APIDOC
## POST /answerCbQuery

### Description
Answers a callback query sent by the user.

### Method
POST

### Endpoint
/answerCbQuery

### Parameters
#### Path Parameters
- **callbackQueryId** (string) - Required - The unique identifier for the callback query.
- **text** (string) - Optional - Text of the notification.
- **extra** (Omit<{}, "text" | "chat_id" | "callback_query_id">) - Optional - Additional parameters for the callback query answer.

### Response
#### Success Response (200)
- **true** (boolean) - Indicates success.
```

---

### Create Entity Text Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that processes messages based on specific entity types (e.g., mentions, hashtags) and an optional predicate. It also accepts subsequent middleware functions.

```typescript
entityText<C>(entityType: MaybeArray<string>, predicate: Triggers<C>, ...fns: MatchedMiddleware<C, "channel_post" | "message">): MiddlewareFn<C>
```

---

### Router Methods

Source: https://telegraf.js.org/classes/Router

Details on the methods available for the Router class, including middleware, on, and otherwise.

```APIDOC
## Methods

### middleware

* `middleware(): MiddlewareFn<C>`

#### Description

Returns the middleware function for the router.

#### Returns

* `MiddlewareFn<C>` - The middleware function.

### on

* `on(route: string, ...fns: NonemptyReadonlyArray<Middleware<C>>): Router<C>`

#### Description

Registers one or more middleware functions for a specific route.

#### Parameters

* **route**: `string` - The route pattern to match.
* **`Rest` ...fns**: `NonemptyReadonlyArray<Middleware<C>>` - The middleware functions to register.

#### Returns

* `Router<C>` - The Router instance for chaining.

### otherwise

* `otherwise(...fns: NonemptyReadonlyArray<Middleware<C>>): Router<C>`

#### Description

Registers middleware functions to be executed when no other routes match.

#### Parameters

* **`Rest` ...fns**: `NonemptyReadonlyArray<Middleware<C>>` - The middleware functions to register.

#### Returns

* `Router<C>` - The Router instance for chaining.
```

---

### Set Chat Menu Button with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sets the menu button for the bot in a private chat. Accepts an optional MenuButton object. Returns true on success.

```typescript
await ctx.setChatMenuButton({
  type: "web_app",
  text: "Open Web App",
  web_app: { url: "https://example.com" },
});
```

---

### setWebhook

Source: https://telegraf.js.org/classes/Telegram

Configures a webhook to receive incoming updates.

````APIDOC
## POST /setWebhook

### Description
Specify a url to receive incoming updates via an outgoing webhook. Use an empty string to remove webhook integration.

### Method
POST

### Endpoint
/setWebhook

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **url** (string) - Required - HTTPS URL to send updates to.
- **extra** (Omit<{}, "url" | "chat_id">) - Optional - Additional parameters for webhook configuration.

### Request Example
```json
{
  "url": "https://example.com/bot/webhook"
}
````

### Response

#### Success Response (200)

- **Result** (boolean) - True on success

#### Response Example

```json
{
  "ok": true,
  "result": true,
  "description": "Webhook was set successfully"
}
```

````

--------------------------------

### Set Sticker Set Thumbnail (Telegraf.js)

Source: https://telegraf.js.org/classes/Context

Sets the thumbnail for a sticker set. This method takes the sticker set name, user ID, and an optional thumbnail (string or InputFile). It returns a promise that resolves to true. Note: This method is deprecated; use Telegram.setStickerSetThumbnail instead.

```javascript
bot.api.setStickerSetThumb(...args: [name: string, userId: number, thumbnail?: string | InputFile]): Promise<true>
````

---

### Telegraf.js: Generate reply middleware

Source: https://telegraf.js.org/classes/Scenes

Provides a simplified way to send replies within middleware. It accepts text or formatted strings and optional extra parameters for customizing the reply.

```typescript
import { Middleware, Context, Update, FmtString } from "telegraf";

// Type for reply arguments, including text and optional extra parameters
type ReplyArgs<C extends Context<Update>> = [
  text: string | FmtString<string>,
  extra?: Omit<{}, "text" | "chat_id">, // Placeholder for extra reply options
];

// Middleware function type
type MiddlewareFn<C extends Context<Update>> = (
  ctx: C,
  next: () => Promise<void>,
) => Promise<void>;

const reply = <C extends Context<Update>>(
  ...args: ReplyArgs<C>
): MiddlewareFn<C> => {
  return async (ctx: C, next: () => Promise<void>) => {
    const [text, extra] = args;
    // Implementation to send a reply using ctx.reply
    await ctx.reply(text, extra as any);
    await next(); // Continue to the next middleware
  };
};

// Example usage:
// bot.command('start', reply('Welcome!'));
// bot.command('help', reply('Need help? Send /help', { parse_mode: 'Markdown' }));
```

---

### setChatPhoto API

Source: https://telegraf.js.org/interfaces/Scenes

Uploads a new profile photo for the chat. The bot must be an administrator to change chat settings.

````APIDOC
## POST /setChatPhoto

### Description
Uploads a new profile photo for the chat. The bot must be an administrator to change chat settings.

### Method
POST

### Endpoint
/setChatPhoto

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **...args** (Rest) - Required - An array containing `photo` (InputFile).
  - **photo** (InputFile) - Required - New chat photo.

### Request Example
```json
{
  "...args": [
    "/path/to/your/photo.jpg"
  ]
}
````

### Response

#### Success Response (200)

- **true** - Returns `true` on success.

#### Response Example

```json
{
  "ok": true,
  "result": true
}
```

````

--------------------------------

### Set Sticker Set Title (Telegraf.js)

Source: https://telegraf.js.org/classes/Context

Sets the title for a sticker set. This method requires the sticker set name and the new title. It returns a promise that resolves to true on success.

```javascript
bot.api.setStickerSetTitle(...args: [name: string, title: string]): Promise<true>
````

---

### Composer.textMention Middleware

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that triggers for messages containing text mentions (user mentions).

````APIDOC
## Composer.textMention

### Description
Creates middleware that triggers for messages containing text mentions (user mentions). The `mention` parameter specifies the username or user ID to match.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage:
// bot.use(Composer.textMention('@username', ctx => ctx.reply('Mentioned username!')))
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### Composer.tap

Source: https://telegraf.js.org/classes/Composer

Creates a middleware that passes control to another middleware without modifying the context.

```APIDOC
## Composer.tap

### Description
Creates a middleware that passes control to another middleware without modifying the context.

### Method
`tap<C>(middleware)`

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
{
  "middleware": "(ctx) => { console.log(ctx.update.message.text) }"
}
````

### Response

#### Success Response (200)

`MiddlewareFn<C>`

#### Response Example

```json
{
  "middleware": "[Middleware function object]"
}
```

````

--------------------------------

### Composer.dispatch

Source: https://telegraf.js.org/classes/Scenes

Dispatches updates to different handlers based on a routing function.

```APIDOC
## Composer.dispatch

### Description
Dispatches updates to different handlers based on a routing function.

### Method
`dispatch<C, Handlers>(routeFn, handlers): Middleware<C>`

### Parameters
#### Path Parameters
- **routeFn** ((ctx) => MaybePromise<keyof Handlers>) - Required - A function that determines the handler key for a given context.
- **handlers** (Handlers) - Required - An object mapping keys to middleware handlers.

### Returns
`Middleware<C>`
````

---

### Static Compose Middleware

Source: https://telegraf.js.org/classes/Composer

Combines multiple middleware functions into a single middleware.

````APIDOC
## Static compose

### Description
Combines multiple middleware functions into a single middleware.

### Method
N/A (Static method)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Usage
```typescript
compose<C>(middlewares: readonly Middleware<C>[]): MiddlewareFn<C>
````

````

--------------------------------

### replyWithMarkdownV2

Source: https://telegraf.js.org/classes/Context

Sends a message with MarkdownV2 formatting. This is the recommended method for sending Markdown.

```APIDOC
## POST /sendMessage (MarkdownV2)

### Description
Sends a message with MarkdownV2 formatting. This is the recommended method for sending Markdown.

### Method
POST

### Endpoint
/sendMessage

### Parameters
#### Path Parameters
- `markdown` (string) - Required - The message text with MarkdownV2 formatting.
- `extra` (object) - Optional - Additional parameters for sending the message.

### Request Example
```json
{
  "markdown": "*Hello* _World_ `Telegraf`"
}
````

### Response

#### Success Response (200)

- `TextMessage` (object) - The sent text message.

#### Response Example

```json
{
  "message_id": 12345,
  "from": { ... },
  "chat": { ... },
  "date": 1678886400,
  "text": "*Hello* _World_ `Telegraf`"
}
```

````

--------------------------------

### Set Sticker Emoji List with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sets the emoji list for a sticker. Requires the sticker identifier and an array of emoji strings. Returns true on success.

```typescript
await ctx.setStickerEmojiList('sticker_id', ['👍', '😊']);
````

---

### Reply with Venue using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends venue information to a chat. Requires latitude, longitude, title, and address. Optional extra parameters can be provided.

```typescript
/**
 * Sends venue information to a chat.
 * @param latitude The latitude of the venue.
 * @param longitude The longitude of the venue.
 * @param title The title of the venue.
 * @param address The address of the venue.
 * @param extra Optional additional parameters.
 * @returns A promise that resolves with the VenueMessage.
 */
replyWithVenue(latitude: number, longitude: number, title: string, address: string, extra?: Omit<Parameters<typeof telegram.sendVenue>[5], "chat_id" | "title" | "latitude" | "longitude" | "address">): Promise<VenueMessage>
```

---

### setChatDescription API

Source: https://telegraf.js.org/interfaces/Scenes

Sets a new description for the supergroup or channel. Requires the description as an optional string.

````APIDOC
## POST /setChatDescription

### Description
Sets a new description for the supergroup or channel. Only administrators of the chat can use this method. The description can be an empty string to remove it.

### Method
POST

### Endpoint
/setChatDescription

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **...args** (Rest) - Required - An array containing an optional `description` (string).
  - **description** (string) - Optional - New chat description, 0-255 characters.

### Request Example
```json
{
  "...args": [
    "Welcome to our amazing group!"
  ]
}
````

### Response

#### Success Response (200)

- **true** - Returns `true` on success.

#### Response Example

```json
{
  "ok": true,
  "result": true
}
```

````

--------------------------------

### Send Audio (Telegraf.js)

Source: https://telegraf.js.org/classes/Context

Sends an audio file to a chat. Supports specifying a caption for the audio.

```typescript
replyWithAudio(...args): Promise<AudioMessage>
````

---

### chat member and forum API

Source: https://telegraf.js.org/interfaces/Scenes

API methods for managing chat members, unbanning users, and handling forum topics.

````APIDOC
## POST /unbanChatMember

### Description
Unbans a previously banned user in a group or supergroup.

### Method
POST

### Endpoint
/unbanChatMember

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **userId** (number) - Required - Unique identifier of the target user.
- **extra** (object) - Optional - Additional parameters.
  - **only_if_banned** (boolean) - Optional - Pass `True`, if the user is supposed to be banned.

### Request Example
```json
{
  "userId": 987654321,
  "extra": {
    "only_if_banned": true
  }
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

### See Also

- https://core.telegram.org/bots/api#unbanchatmember

````

```APIDOC
## POST /unbanChatSenderChat

### Description
Unbans a previously banned sender chat in a group or supergroup.

### Method
POST

### Endpoint
/unbanChatSenderChat

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **senderChatId** (number) - Required - Unique identifier of the chat to unban.

### Request Example
```json
{
  "senderChatId": 1122334455
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

### See Also

- https://core.telegram.org/bots/api#unbanchatsenderchat

````

```APIDOC
## POST /unhideGeneralForumTopic

### Description
Unhides the 'General' topic in a forum supergroup chat. The bot must be an administrator with `can_manage_topics` rights. Returns `True` on success.

### Method
POST

### Endpoint
/unhideGeneralForumTopic

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- None

### Request Example
```json
{}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

### See Also

- https://core.telegram.org/bots/api#unhidegeneralforumtopic

````

```APIDOC
## POST /unpinAllChatMessages

### Description
Clears all pinned messages in a chat. The bot must be an administrator with `can_pin_messages` rights.

### Method
POST

### Endpoint
/unpinAllChatMessages

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- None

### Request Example
```json
{}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

### See Also

- https://core.telegram.org/bots/api#unpinallchatmessages

````

```APIDOC
## POST /unpinAllForumTopicMessages

### Description
Clears the list of pinned messages in a forum topic. The bot must be an administrator with `can_pin_messages` rights.

### Method
POST

### Endpoint
/unpinAllForumTopicMessages

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- None

### Request Example
```json
{}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

### See Also

- https://core.telegram.org/bots/api#unpinallforumtopicmessages

````

```APIDOC
## POST /unpinAllGeneralForumTopicMessages

### Description
Clears the list of pinned messages in a 'General' forum topic. The bot must be an administrator with `can_pin_messages` rights.

### Method
POST

### Endpoint
/unpinAllGeneralForumTopicMessages

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- None

### Request Example
```json
{}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

### See Also

- https://core.telegram.org/bots/api#unpinallgeneralforumtopicmessages

````

```APIDOC
## POST /unpinChatMessage

### Description
Unpins a message in a chat. If the chat is a forum, the message must be a pinned message in the forum topic.

### Method
POST

### Endpoint
/unpinChatMessage

### Parameters
#### Path Parameters
- None

#### Query Parameters
- None

#### Request Body
- **messageId** (number) - Optional - Identifier of the message to unpin.

### Request Example
```json
{
  "messageId": 789
}
````

### Response

#### Success Response (200)

- **ok** (boolean) - Indicates if the operation was successful.

#### Response Example

```json
{
  "ok": true
}
```

### See Also

- https://core.telegram.org/bots/api#unpinchatmessage

````

--------------------------------

### Answer Pre-Checkout Query

Source: https://telegraf.js.org/classes/Telegram

Responds to pre-checkout queries initiated by users after they confirm payment and shipping details. It requires the query ID, a boolean indicating success (`ok`), and an optional error message if `ok` is false. The response must be sent within 10 seconds.

```javascript
answerPreCheckoutQuery(preCheckoutQueryId: string, ok: boolean, errorMessage?: string): Promise<true>
````

---

### replyWithContact

Source: https://telegraf.js.org/interfaces/Scenes

Sends a contact to a chat.

````APIDOC
## POST /replyWithContact

### Description
Sends a contact to a chat.

### Method
POST

### Endpoint
/replyWithContact

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **phoneNumber** (string) - Required - Contact's phone number.
- **firstName** (string) - Required - Contact's first name.
- **extra** (object) - Optional - Additional parameters for the contact message, excluding 'phoneNumber', 'firstName', and 'chat_id'.

### Request Example
```json
{
  "phoneNumber": "+1234567890",
  "firstName": "John Doe"
}
````

### Response

#### Success Response (200)

- **message** (object) - The sent contact message object.

#### Response Example

```json
{
  "message": {
    "message_id": 12345,
    "chat": {
      "id": 123456789,
      "type": "private"
    },
    "contact": {
      "phone_number": "+1234567890",
      "first_name": "John Doe",
      "vcard": "BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEND:VCARD"
    }
  }
}
```

````

--------------------------------

### setChatStickerSet API

Source: https://telegraf.js.org/interfaces/Scenes

Sets a new sticker set for a group or channel. The bot must be an administrator to change chat settings.

```APIDOC
## POST /setChatStickerSet

### Description
Sets a new sticker set for a group or channel. The bot must be an administrator to change chat settings.

### Method
POST

### Endpoint
/setChatStickerSet

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **setName** (string) - Required - Name of the sticker set to be set as the group sticker set.

### Request Example
```json
{
  "setName": "my_cool_stickers"
}
````

### Response

#### Success Response (200)

- **true** - Returns `true` on success.

#### Response Example

```json
{
  "ok": true,
  "result": true
}
```

````

--------------------------------

### Composer.log

Source: https://telegraf.js.org/classes/Scenes

Generates middleware for logging purposes, optionally with a custom log function.

```APIDOC
## Composer.log

### Description
Generates middleware for logging purposes.

### Method
`static`

### Endpoint
`log(logFn?): MiddlewareFn<Context<Update>>`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
* **logFn** ((s) => void) - Optional - A custom function to handle logging. Defaults to `console.log`.

### Request Example
```javascript
// Using default console.log:
// const loggingMiddleware = Composer.log();

// Using a custom log function:
// const customLogger = (message) => console.log('Custom Log:', message);
// const customLoggingMiddleware = Composer.log(customLogger);
````

### Response

#### Success Response (200)

`MiddlewareFn<Context<Update>>`

#### Response Example

```json
// Middleware function returned
```

````

--------------------------------

### Register gameQuery middleware in Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Registers middleware for handling incoming game queries. It accepts middleware functions that will process these queries.

```typescript
wizardScene.gameQuery(async (ctx) => {
  await ctx.answerGameQuery("Game started!");
});
````

---

### Handle Inline Queries with Telegraf.js 'inlineQuery' Middleware

Source: https://telegraf.js.org/classes/Telegraf-1

Creates middleware specifically for handling incoming inline queries. It accepts an array of query triggers and a list of subsequent middleware functions. This is useful for bots that need to respond to user queries made directly within chats.

```typescript
inlineQuery<C>(triggers: Triggers<NarrowedContext<C, InlineQueryUpdate>>, ...fns: MatchedMiddleware<C, "inline_query">): MiddlewareFn<C>
```

---

### Reply with MarkdownV2 using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a message formatted in MarkdownV2. This is the recommended method for sending Markdown messages. It takes markdown text and optional extra parameters.

```typescript
/**
 * Sends a message formatted in MarkdownV2.
 * @param markdown The MarkdownV2 text to send.
 * @param extra Optional additional parameters.
 * @returns A promise that resolves with the TextMessage.
 */
replyWithMarkdownV2(markdown: string, extra?: Omit<Parameters<typeof telegram.sendMessage>[1], "text" | "chat_id">): Promise<TextMessage>
```

---

### Send Animation using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends an animation to a chat. Accepts an animation file path or InputFile and optional extra parameters, including a caption.

```typescript
/**
 * Sends an animation to a chat.
 * @param animation The animation to send (file path or InputFile).
 * @param extra Optional additional parameters, including a caption.
 * @returns A promise that resolves with the AnimationMessage.
 */
sendAnimation(animation: string | InputFile, extra?: { caption?: string | FmtString<string>; }): Promise<AnimationMessage>
```

---

### Send Game (Telegraf.js)

Source: https://telegraf.js.org/classes/Context

Sends a game to a chat. Requires the game's short name.

```typescript
replyWithGame(...args): Promise<GameMessage>
```

---

### Composer.on Middleware

Source: https://telegraf.js.org/classes/Scenes

Handles specific message types or filters. Note: Support for Message subtype in Composer.on will be removed in Telegraf v5; use filter utils instead.

````APIDOC
## Composer.on

### Description
Handles specific message types or filters. Deprecated: Use filter utils instead. Support for Message subtype in `Composer.on` will be removed in Telegraf v5.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage within a Telegraf bot:
// bot.on('text', (ctx) => ctx.reply('Received text message'))
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### Handle Inline Queries with Telegraf.js

Source: https://telegraf.js.org/classes/Composer

Registers middleware to handle incoming inline queries. It takes triggers for the inline queries and middleware functions to process them.

```typescript
composer.inlineQuery(triggers, ...fns)
````

---

### Reply with Quiz using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a quiz (a type of poll) to a chat. Requires a question and an array of options, with one being the correct answer. Optional extra parameters can be provided.

```typescript
/**
 * Sends a quiz to a chat.
 * @param question The question for the quiz.
 * @param options The options for the quiz.
 * @param extra Optional additional parameters.
 * @returns A promise that resolves with the PollMessage.
 */
replyWithQuiz(question: string, options: readonly string[], extra?: Omit<Parameters<typeof telegram.sendPoll>[3], "type" | "chat_id" | "question" | "options">): Promise<PollMessage>
```

---

### Router Constructor

Source: https://telegraf.js.org/classes/Router

Initializes a new Router instance. It requires a route function and an optional map of handlers. This constructor is part of the deprecated Router class.

```typescript
new Router<C>(routeFn: RouteFn<C>, handlers?: Map<string, Middleware<C>>): Router<C>
```

---

### Compose Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Combines an array of middleware functions into a single middleware function. This is useful for organizing and executing multiple middleware sequentially.

```typescript
compose<C>(middlewares: readonly Middleware<C>[]): MiddlewareFn<C>
```

---

### Answer Game Query

Source: https://telegraf.js.org/classes/Context

Answers a game query. This method is used to respond to a user's interaction with a game within Telegram.

```typescript
answerGameQuery(...args: [url: string]): Promise<true>
```

---

### Create Error Handling Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Defines middleware for catching and handling errors within the middleware chain. It requires an error handler function and a list of subsequent middleware functions.

```typescript
catch<C>(errorHandler: (err, ctx) => void, ...fns: readonly Middleware<C>[]): MiddlewareFn<C>
```

---

### Composer.on

Source: https://telegraf.js.org/classes/Scenes

Generates middleware for handling updates filtered by update types or message subtypes.

````APIDOC
## Composer.on

### Description
Generates middleware for handling updates narrowed by update types or filter queries.

### Method
`static`

### Endpoint
`on<Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
* **filters** (MaybeArray<Filter>) - Required - Update types or filter queries to match.
* **...fns** (NonemptyReadonlyArray<Middleware<FilteredContext<Ctx, Filter>>>) - Required - Middleware to run when the filters match.

### Request Example
```javascript
// Example for handling message updates:
// Composer.on('message', (ctx) => ctx.reply('Received a message'))

// Example for handling specific message subtypes (e.g., text messages):
// Composer.on('text', (ctx) => ctx.reply('Received text'))
````

### Response

#### Success Response (200)

`MiddlewareFn<Ctx>`

#### Response Example

```json
// Middleware function returned
```

````

--------------------------------

### Reply with Voice using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a voice message to a chat. Accepts a voice file path or InputFile and optional extra parameters, including a caption.

```typescript
/**
 * Sends a voice message to a chat.
 * @param voice The voice message to send (file path or InputFile).
 * @param extra Optional additional parameters, including a caption.
 * @returns A promise that resolves with the VoiceMessage.
 */
replyWithVoice(voice: string | InputFile, extra?: { caption?: string | FmtString<string>; }): Promise<VoiceMessage>
````

---

### Send Audio

Source: https://telegraf.js.org/interfaces/Scenes

Sends an audio file to the chat. On success, the sent Message is returned.

```APIDOC
## POST /websites/telegraf_js/sendAudio

### Description
Sends an audio file to the chat. On success, the sent Message is returned.

### Method
POST

### Endpoint
/websites/telegraf_js/sendAudio

### Parameters
#### Request Body
- **audio** (string | InputFile) - Required - The audio file to send.
- **extra** (object) - Optional - Additional options for the message.
  - **caption** (string | FmtString<string>) - Optional - Caption for the audio file.
```

---

### Reply with HTML using Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a message formatted with HTML. Accepts the HTML string and optional extra parameters. Returns the sent TextMessage.

```typescript
/**
 * Sends a message formatted with HTML.
 * @param html - The HTML content to send.
 * @param extra - Optional extra parameters.
 * @returns Promise<TextMessage>
 */
async replyWithHTML(html: string, extra?: Omit<{}, "text" | "chat_id">): Promise<TextMessage>
```

---

### replyWithInvoice

Source: https://telegraf.js.org/classes/Context

Sends an invoice to a chat.

````APIDOC
## POST /websites/telegraf_js

### Description
Sends an invoice to a chat.

### Method
POST

### Endpoint
/websites/telegraf_js

### Parameters
#### Request Body
- **invoice** (object) - An object containing details for the invoice. Must include:
  - **title** (string) - Product name.
  - **description** (string) - Product description.
  - **payload** (string) - Bot-defined invoice payload, it will be sent back to the bot using a callback query.
  - **provider_token** (string) - Bot's payment provider token, obtained from @BotFather.
  - **currency** (string) - Three-letter ISO 4217 currency code, passed to the client.
  - **prices** (Array<object>) - Price list, where each object contains `label` (string) and `amount` (integer, in the smallest units of the currency).
- **extra** (object) - Optional - Additional parameters for sending the invoice, excluding fields already in `invoice` and `chat_id`.

### Response
#### Success Response (200)
- **result** (object) - The sent `InvoiceMessage` object.

### Response Example
```json
{
  "result": {
    "message_id": 123,
    "from": {
      "id": 456,
      "is_bot": true,
      "first_name": "TestBot"
    },
    "chat": {
      "id": 789,
      "type": "private"
    },
    "date": 1678886400,
    "invoice": {
      "title": "Awesome Product",
      "description": "High-quality item",
      "payload": "invoice_payload_123",
      "provider_token": "YOUR_PROVIDER_TOKEN",
      "currency": "USD",
      "prices": [
        {
          "label": "Item Price",
          "amount": 1000
        }
      ]
    }
  }
}
````

### See

https://core.telegram.org/bots/api#sendinvoice

````

--------------------------------

### setMyCommands API

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to change the bot's list of commands. Deprecated, use Telegram.setMyCommands instead.

```APIDOC
## POST /setMyCommands

### Description
Use this method to change the bot's list of commands. Deprecated, use `Telegram.setMyCommands` instead.

### Method
POST

### Endpoint
/setMyCommands

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **commands** (readonly BotCommand[]) - Required - A JSON-serialized list of bot commands.

### Request Example
```json
{
  "commands": [
    {
      "command": "/start",
      "description": "Starts the bot"
    },
    {
      "command": "/help",
      "description": "Shows help message"
    }
  ]
}
````

### Response

#### Success Response (200)

- **true** - Returns `true` on success.

#### Response Example

```json
{
  "ok": true,
  "result": true
}
```

````

--------------------------------

### sendVideo API

Source: https://telegraf.js.org/interfaces/Scenes

Sends video files, Telegram clients support sending video messages as video files. Requires video file ID or path, and optionally a caption.

```APIDOC
## POST /sendVideo

### Description
Sends video files. Telegram clients support sending video messages as video files. Supports video file ID or path, and an optional caption.

### Method
POST

### Endpoint
/sendVideo

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **video** (string | InputFile) - Required - Video to send. Can be a file_id or a path.
- **extra** (Omit<{}, "chat_id" | "video">) - Optional - Additional parameters for the video message.
  - **caption** (string | FmtString<string>) - Optional - Caption for the video.

### Request Example
```json
{
  "video": "<video_file_id_or_path>",
  "extra": {
    "caption": "A beautiful sunset video."
  }
}
````

### Response

#### Success Response (200)

- **VideoMessage** - An object representing the sent video message.

#### Response Example

```json
{
  "message_id": 12345,
  "video": {
    "duration": 10,
    "width": 1280,
    "height": 720,
    "file_id": "<file_id>",
    "file_unique_id": "<unique_file_id>",
    "mime_type": "video/mp4"
  },
  "caption": "A beautiful sunset video."
}
```

````

--------------------------------

### Composer.command

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware for handling specified commands. It allows you to define a command string and a series of middleware functions to process messages that match this command.

```APIDOC
## POST /api/users

### Description
Generates middleware for handling specified commands. It allows you to define a command string and a series of middleware functions to process messages that match this command.

### Method
POST

### Endpoint
/api/users

### Parameters
#### Path Parameters
- **command** (string) - Required - The command string to match (e.g., '/start').

#### Query Parameters
None

#### Request Body
- **fns** (Array<Middleware<C>>) - Required - An array of middleware functions to execute when the command is matched.

### Request Example
```json
{
  "command": "/start",
  "fns": [
    "(ctx) => ctx.reply('Welcome!')"
  ]
}
````

### Response

#### Success Response (200)

- **middlewareFn** (MiddlewareFn<C>) - The generated middleware function.

#### Response Example

```json
{
  "middlewareFn": "[Function: middleware]"
}
```

````

--------------------------------

### Composer.privateChat Middleware

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that executes exclusively within private chat contexts.

```APIDOC
## Composer.privateChat

### Description
Generates middleware that runs only in private chats. It filters out messages from groups or channels.

### Method
Static method

### Endpoint
N/A (Middleware function)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
// Example usage:
// bot.use(Composer.privateChat(ctx => ctx.reply('Hello from private chat!')))
````

### Response

#### Success Response (200)

N/A (Middleware function)

#### Response Example

N/A

````

--------------------------------

### Telegraf.js Context Properties

Source: https://telegraf.js.org/classes/Context

Provides access to core information about the current update and bot. Properties include botInfo (details about the bot itself), state (for custom data storage), telegram (the Telegram API instance), and update (the raw update payload).

```typescript
readonly botInfo: UserFromGetMe;
readonly state: Record<string | symbol, any> = {};
readonly telegram: Telegram;
readonly update: U;
````

---

### Composer.action Method

Source: https://telegraf.js.org/classes/Composer

Registers middleware to handle callback queries that match specific triggers. This is useful for interacting with inline keyboards and buttons within Telegram.

```typescript
action(triggers, ...fns): Composer<C>
```

---

### Generate middleware for specific users (Telegraf.js)

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that only responds to specified user IDs. This is useful for creating access control for bot commands or messages.

```typescript
`Static` acl
  * acl<C>(userId, ...fns): MiddlewareFn<C>
  * Generates middleware responding only to specified users.
#### Type Parameters
    * #### C extends Context<Update>
#### Parameters
    * ##### userId: MaybeArray<number>
    * ##### `Rest` ...fns: NonemptyReadonlyArray<Middleware<C>>
`Rest`
#### Returns MiddlewareFn<C>
```

---

### Composer.optional

Source: https://telegraf.js.org/classes/Telegraf-1

Generates optional middleware based on a predicate function.

```APIDOC
## POST /api/users

### Description
Generates optional middleware.

### Method
POST

### Endpoint
/api/users

### Parameters
#### Request Body
- **predicate** (Function) - Required - A function that determines if the middleware should run.
- **...fns** (Array<MiddlewareFn>) - Required - The middleware functions to execute if the predicate returns true.
```

---

### Static.admin

Source: https://telegraf.js.org/classes/Composer

Generates middleware that responds only to chat admins and the chat creator.

```APIDOC
## Static.admin

### Description
Generates middleware that responds only to chat admins and the chat creator.

### Method
Static.admin

### Type Parameters
- **C**: Context<Update>

### Parameters
#### Parameters
- **Rest** ...fns: NonemptyReadonlyArray<Middleware<C>>

### Returns
MiddlewareFn<C>
```

---

### createInvoiceLink

Source: https://telegraf.js.org/classes/Telegram

Creates a link for an invoice.

````APIDOC
## POST /createInvoiceLink

### Description
Creates a link for an invoice.

### Method
POST

### Endpoint
/createInvoiceLink

### Parameters
#### Path Parameters

#### Query Parameters

#### Request Body
- **invoice** (Omit<{}, "chat_id">) - Required - An object containing invoice details.

### Request Example
```json
{
  "title": "Example Product",
  "description": "A great product",
  "payload": "unique_payload",
  "provider_token": "YOUR_PROVIDER_TOKEN",
  "start_parameter": "example_bot",
  "currency": "USD",
  "prices": [
    {
      "label": "Product Price",
      "amount": 1000
    }
  ]
}
````

### Response

#### Success Response (200)

- **string** - A string representing the invoice link.

````

--------------------------------

### Set Sticker Set Title

Source: https://telegraf.js.org/interfaces/Scenes

Sets a new title for a sticker set. This method requires the name of the sticker set and the new title as string parameters. It returns a Promise resolving to true on success.

```javascript
setStickerSetTitle(...args: [name: string, title: string]): Promise<true>
````

---

### sendVenue API

Source: https://telegraf.js.org/interfaces/Scenes

Sends information about a venue to a chat. Requires latitude, longitude, title, and address.

````APIDOC
## POST /sendVenue

### Description
Sends information about a venue to a chat. Requires geographical coordinates, title, and address.

### Method
POST

### Endpoint
/sendVenue

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **latitude** (number) - Required - Latitude of the venue in degrees.
- **longitude** (number) - Required - Longitude of the venue in degrees.
- **title** (string) - Required - Name of the venue.
- **address** (string) - Required - Address of the venue, as displayed alongside the venue name.
- **extra** (Omit<{}, "chat_id" | "title" | "latitude" | "longitude" | "address">) - Optional - Additional parameters for the venue message.

### Request Example
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "title": "New York City Hall",
  "address": "City Hall Park, New York, NY 10007, USA",
  "extra": {}
}
````

### Response

#### Success Response (200)

- **VenueMessage** - An object representing the sent venue message.

#### Response Example

```json
{
  "message_id": 12345,
  "venue": {
    "location": {
      "longitude": -74.006,
      "latitude": 40.7128
    },
    "title": "New York City Hall",
    "address": "City Hall Park, New York, NY 10007, USA",
    "foursquare_id": "<foursquare_id>",
    "foursquare_type": "city_hall"
  }
}
```

````

--------------------------------

### Message Control API

Source: https://telegraf.js.org/classes/Context

Methods for controlling live locations and polls.

```APIDOC
## POST /stopMessageLiveLocation

### Description
 Stops a live-location message. You can use this method to stop updating a live location message. The bot must be the original sender of the message, as defined by the `message_id` parameter.

### Method
POST

### Endpoint
/stopMessageLiveLocation

### Parameters
#### Request Body
- **markup** (InlineKeyboardMarkup) - Optional - An inline keyboard attached to the message.

### Response
#### Success Response (200)
- **result** (boolean | Edited & LocationMessage) - True on success, or the edited message object if it was edited.

### See
https://core.telegram.org/bots/api#stopmessagelivelocation
````

```APIDOC
## POST /stopPoll

### Description
Stops a poll. Use this method to stop an active poll in a message. The bot must be the original sender of the message. Returns the updated message with the poll stopped.

### Method
POST

### Endpoint
/stopPoll

### Parameters
#### Request Body
- **messageId** (number) - Required - Unique identifier for the message with the poll.
- **extra** (Omit<"chat_id" | "message_id">) - Optional - Additional parameters, excluding chat_id and message_id.

### Response
#### Success Response (200)
- **result** (Poll) - The message with the poll stopped.

### See
https://core.telegram.org/bots/api#stoppoll
```

---

### Send Contact

Source: https://telegraf.js.org/interfaces/Scenes

Sends the specified phone number and first name as a contact.

```APIDOC
## POST /websites/telegraf_js/sendContact

### Description
Sends the specified phone number and first name as a contact message to the chat.

### Method
POST

### Endpoint
/websites/telegraf_js/sendContact

### Parameters
#### Request Body
- **phoneNumber** (string) - Required - Phone number of the contact.
- **firstName** (string) - Required - First name of the contact.
- **extra** (object) - Optional - Additional options for the contact message.
```

---

### Registering command middleware

Source: https://telegraf.js.org/classes/Telegraf-1

Registers middleware to handle specific commands. It takes the command name (or a trigger configuration) and subsequent middleware functions. Dependencies include Telegraf, NarrowedContext, New, NonChannel, TextMessage, Update, Omit, Context, and CommandContextExtn.

```typescript
command(command: Triggers<NarrowedContext<C, {
  message: New & NonChannel & TextMessage;
  update_id: number;
}>>, ...fns: NonemptyReadonlyArray<Middleware<Context<{
  message: New & NonChannel & TextMessage;
  update_id: number;
}> & Omit<C, keyof Context<Update>> & CommandContextExtn>>): Telegraf<C>
```

---

### Reopen Forum Topic (Telegraf.js)

Source: https://telegraf.js.org/classes/Context

Reopens a closed forum topic in a supergroup chat. Requires administrator rights ('can_manage_topics') unless the bot created the topic.

```typescript
reopenForumTopic(): Promise<true>
```

---

### Reply with MarkdownV2 using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a message formatted with MarkdownV2. It accepts the Markdown string and optional extra parameters for customization.

```javascript
replyWithMarkdownV2(markdown: string, extra?: Omit<{}, "text" | "chat_id">): Promise<TextMessage>
```

---

### Telegraf.js: Generate tap middleware

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that executes a given middleware function without altering the context's flow. It's useful for logging or performing side effects.

```typescript
import { Middleware, Context, Update } from "telegraf";

// Middleware function type
type MiddlewareFn<C extends Context<Update>> = (
  ctx: C,
  next: () => Promise<void>,
) => Promise<void>;

const tap = <C extends Context<Update>>(
  middleware: Middleware<C>,
): MiddlewareFn<C> => {
  return async (ctx: C, next: () => Promise<void>) => {
    await middleware(ctx, next);
  };
};

// Example usage:
// bot.use(tap((ctx) => console.log('Tapped:', ctx.message?.text)));
// bot.hears('tap', (ctx) => ctx.reply('You tapped me!'));
```

---

### Reply with Markdown using Telegraf.js (Deprecated)

Source: https://telegraf.js.org/interfaces/Scenes

Sends a message formatted in Markdown. This method is deprecated and `replyWithMarkdownV2` should be used instead. It takes markdown text and optional extra parameters.

```typescript
/**
 * Sends a message formatted in Markdown (deprecated).
 * @param markdown The Markdown text to send.
 * @param extra Optional additional parameters.
 * @returns A promise that resolves with the TextMessage.
 */
replyWithMarkdown(markdown: string, extra?: Omit<Parameters<typeof telegram.sendMessage>[1], "text" | "chat_id">): Promise<TextMessage>
```

---

### Register middleware (Telegraf.js)

Source: https://telegraf.js.org/classes/Scenes

Registers a general middleware function. This method accepts an array of middleware functions that will be executed in sequence.

```typescript
use(...fns): WizardScene<C>
  * Registers a middleware.
#### Parameters
    * ##### `Rest` ...fns: readonly Middleware<C>[]
`Rest`
#### Returns WizardScene<C>
```

---

### reopenGeneralForumTopic

Source: https://telegraf.js.org/interfaces/Scenes

Reopens the 'General' topic in a forum supergroup chat. Requires 'can_manage_topics' administrator rights.

````APIDOC
## POST /reopenGeneralForumTopic

### Description
Reopens a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat and have the 'can_manage_topics' administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success.

### Method
POST

### Endpoint
/reopenGeneralForumTopic

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```json
{}
````

### Response

#### Success Response (200)

- **status** (boolean) - Indicates success, always true.

#### Response Example

```json
{
  "status": true
}
```

````

--------------------------------

### Set Sticker Emoji List using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sets the emoji list for a sticker. Requires the sticker identifier and an array of emoji strings.

```javascript
await ctx.setStickerEmojiList(...args: [sticker: string, emoji_list: string[]]);
````

---

### Admin Check Middleware (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

Creates middleware that only allows chat administrators and the creator to execute. It takes subsequent middleware functions. Returns a MiddlewareFn.

```javascript
bot.admin<C>(...fns);
```

---

### POST /setMyCommands

Source: https://telegraf.js.org/classes/Context

Use this method to change the bot's list of commands. Returns true on success. Note: This method is deprecated. Use Telegram.setMyCommands instead.

````APIDOC
## POST /setMyCommands

### Description
Use this method to change the bot's list of commands. Returns true on success. Note: This method is deprecated. Use Telegram.setMyCommands instead.

### Method
POST

### Endpoint
/setMyCommands

### Parameters
#### Request Body
- **commands** (readonly BotCommand[]) - Required

### Response
#### Success Response (200)
- **true** (boolean) - Returns true on success.

#### Response Example
```json
{
  "result": true
}
````

````

--------------------------------

### replyWithContact

Source: https://telegraf.js.org/classes/Context

Sends a contact to a chat.

```APIDOC
## POST /websites/telegraf_js

### Description
Sends a contact to a chat.

### Method
POST

### Endpoint
/websites/telegraf_js

### Parameters
#### Request Body
- **phoneNumber** (string) - Contact's phone number.
- **firstName** (string) - Contact's first name.
- **extra** (object) - Optional - Additional parameters, excluding `phoneNumber`, `firstName`, and `chat_id`.

### Response
#### Success Response (200)
- **result** (object) - The sent `ContactMessage` object.

### Response Example
```json
{
  "result": {
    "message_id": 123,
    "from": {
      "id": 456,
      "is_bot": true,
      "first_name": "TestBot"
    },
    "chat": {
      "id": 789,
      "type": "private"
    },
    "date": 1678886400,
    "contact": {
      "phone_number": "+1234567890",
      "first_name": "John Doe",
      "user_id": 987
    }
  }
}
````

### See

https://core.telegram.org/bots/api#sendcontact

````

--------------------------------

### Composer.filter

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that filters updates based on a predicate. Deprecated, use Composer.drop.

```APIDOC
## Composer.filter

### Description
Creates middleware that filters updates based on a predicate. Deprecated, use Composer.drop.

### Method
`filter<C>(predicate): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **predicate** (Predicate<C>) - Required - A condition to filter updates.

### Returns
`MiddlewareFn<C>`
````

---

### Generate middleware for chat admins (Telegraf.js)

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that only allows responses from chat administrators and the chat creator. This is useful for administrative commands within a group or channel.

```typescript
`Static` admin
  * admin<C>(...fns): MiddlewareFn<C>
  * Generates middleware responding only to chat admins and chat creator.
#### Type Parameters
    * #### C extends Context<Update>

```

---

### Conditional Branch Middleware (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

Creates middleware that conditionally executes one of two provided middleware functions based on a predicate. Returns a MiddlewareFn.

```javascript
bot.branch < C > (predicate, trueMiddleware, falseMiddleware);
```

---

### Markup Class Overview

Source: https://telegraf.js.org/classes/Types

Provides methods for constructing various types of Telegram reply keyboards and inline markups.

```APIDOC
## Class Markup<T>

### Description
Represents and constructs Telegram keyboard markups.

### Constructor

#### `new Markup<T>(reply_markup: T)`

Creates a new Markup instance.

- **reply_markup** (`T`) - The keyboard markup object.

### Properties

- **`reply_markup`** (`T`): The keyboard markup object.

### Methods

- **`oneTime(value?: boolean): Markup<ReplyKeyboardMarkup>`**
  Configures the keyboard to be one-time.
  - **value** (`boolean`, optional, default: `true`)

- **`persistent(value?: boolean): Markup<ReplyKeyboardMarkup>`**
  Configures the keyboard to be persistent.
  - **value** (`boolean`, optional, default: `true`)

- **`placeholder<T>(placeholder: string): Markup<T>`**
  Sets a placeholder text for the keyboard.
  - **placeholder** (`string`) - The placeholder text.

- **`resize(value?: boolean): Markup<ReplyKeyboardMarkup>`**
  Configures the keyboard to be resizable.
  - **value** (`boolean`, optional, default: `true`)

- **`selective<T>(value?: boolean): Markup<T>`**
  Configures the keyboard to be selective.
  - **value** (`boolean`, optional, default: `true`)

### Type Parameters

- **`T`**: Extends `InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply`
```

---

### telegraf.js Bot with Command Handlers

Source: https://telegraf.js.org/index

This snippet illustrates how to define command handlers in a telegraf.js bot. It shows how to respond to specific commands like 'oldschool' and 'hipster' using reply functionality.

```javascript
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.command("oldschool", (ctx) => ctx.reply("Hello"));
bot.command("hipster", Telegraf.reply("λ"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
```

---

### Send Venue using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends venue information to a chat. Requires latitude, longitude, title, address, and optionally accepts extra parameters.

```javascript
await ctx.sendVenue(latitude: number, longitude: number, title: string, address: string, extra?: Omit<{}, "chat_id" | "title" | "latitude" | "longitude" | "address">);
```

---

### Reopen General Forum Topic with Telegraf.js

Source: https://telegraf.js.org/classes/Telegram

Reopens the 'General' topic in a forum supergroup. Requires administrator rights and 'can_manage_topics' permission. Returns true on success.

```javascript
await telegraf.reopenGeneralForumTopic(chatId: string | number): Promise<true>
```

---

### Set Chat Menu Button using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sets the menu button for the bot in a private chat. Returns true on success.

```javascript
await ctx.setChatMenuButton(menuButton?: MenuButton);
```

---

### exportChatInviteLink

Source: https://telegraf.js.org/classes/Context

Creates a new invite link for a chat. This method is a shorthand for a more specific API call.

````APIDOC
## POST /exportChatInviteLink

### Description
Creates a new invite link for a chat. The bot must be an administrator in the chat for this to work.

### Method
POST

### Endpoint
/exportChatInviteLink

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
No specific parameters mentioned, implies using default or context-based chat ID.

### Request Example
```json
{}`
````

### Response

#### Success Response (200)

- **result** (string) - The new invite link as a string.

#### Response Example

```json
{
  "ok": true,
  "result": "https://t.me/+examplelink"
}
```

### See

https://core.telegram.org/bots/api#exportchatinvitelink

````

--------------------------------

### Persistent Chat Action with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends chat actions repeatedly while a callback is processed. Accepts an action type, a callback function, and optional extra parameters like intervalDuration. Returns a Promise<void>.

```typescript
persistentChatAction(action: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_voice" | "upload_voice" | "upload_document" | "choose_sticker" | "find_location" | "record_video_note" | "upload_video_note", callback: (() => Promise<void>), extra?: Omit<{}, "action" | "chat_id"> & { intervalDuration?: number }): Promise<void>
````

---

### mention Middleware

Source: https://telegraf.js.org/classes/Composer

Registers middleware for handling messages that mention the bot with specific mentions.

```APIDOC
## POST /mention

### Description
Registers middleware for handling messages that mention the bot with specific mentions.

### Method
POST

### Endpoint
/mention

### Parameters
#### Path Parameters
- **mention** (MaybeArray<string>) - Required - The mention(s) to match.
- **Rest ...fns** (MatchedMiddleware<C, "channel_post" | "message">) - Optional - Additional middleware functions to process the mentioned messages.

### Response
#### Success Response (200)
- **Composer<C>** - Returns a Composer instance for chaining middleware.
```

---

### Create Lazy Middleware with Telegraf.js 'lazy'

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware using a factory function that returns a middleware. This allows for lazy initialization of middleware, improving performance by only loading middleware when needed. The factory function receives the context and should return a middleware or a promise resolving to one.

```typescript
lazy<C>(factoryFn: (ctx: C) => MaybePromise<Middleware<C>>): MiddlewareFn<C>
```

---

### sendDocument

Source: https://telegraf.js.org/classes/Context

Send a general file. On success, the sent Message is returned. Bots can currently send files of any type of “file” to send, so-called “document messages”:

- `text/plain`
- `application/pdf`
- `application/zip`
- `application/x-tgspecdoc`

````APIDOC
## POST /api/sendDocument

### Description
Send a general file. On success, the sent Message is returned. Bots can currently send files of any type of “file” to send, so-called “document messages”.

### Method
POST

### Endpoint
/api/sendDocument

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **document** (string | InputFile) - Required - File to send. Your user can opt-to upload a new file.
- **extra** (object) - Optional - Additional parameters for the message.
  - **caption** (string | FmtString<string>) - Optional - Caption for the document file.

### Request Example
```json
{
  "document": "path/to/document.pdf",
  "extra": {
    "caption": "My document"
  }
}
````

### Response

#### Success Response (200)

- **DocumentMessage** - The sent document message object.

#### Response Example

```json
{
  "message_id": 12345,
  "chat": {
    "id": 123456789,
    "first_name": "Test",
    "type": "private"
  },
  "document": {
    "file_id": "BQADAgADGgADaZJCGd6q3hG_SqwI",
    "file_unique_id": "AgADGgADaZJCGd6q3hG_SqwI",
    "file_name": "document.pdf",
    "mime_type": "application/pdf"
  },
  "date": 1678886400
}
```

````

--------------------------------

### Telegraf.js: Generate textMention middleware

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that triggers when a message mentions a specific user or bot. It allows bots to respond to mentions directly.

```typescript
import { Middleware, Context, Update } from 'telegraf';

// Type for triggers, likely accepting strings or regular expressions
type Triggers<C> = string | RegExp | ((ctx: C) => MaybeArray<string | RegExp>);

// Type for matched middleware, specific to message and channel_post updates
type MatchedMiddleware<C, T extends 'channel_post' | 'message'> = Middleware<C & { match: T extends 'message' ? string : never }>;

// Middleware function type
type MiddlewareFn<C extends Context<Update>> = (ctx: C, next: () => Promise<void>) => Promise<void>;

const textMention = <C extends Context<Update>>(mention: Triggers<C>, ...fns: MatchedMiddleware<C, "channel_post" | "message">[]): MiddlewareFn<C> => {
    // Implementation details for textMention middleware
    // This would typically involve checking message entities for mentions
    return async (ctx: C, next: () => Promise<void>) => {
        // Placeholder for actual logic
        console.log(`Checking for mention: ${mention}`);
        await next();
    };
};

// Example usage:
// bot.use(textMention('@my_bot', (ctx) => ctx.reply('You mentioned me!')));
````

---

### Set Chat Permissions with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sets permissions for chat members. Accepts ChatPermissions object and optional extra parameters. Returns true on success.

```typescript
await ctx.setChatPermissions(chatPermissions);
```

---

### POST /sendVoice

Source: https://telegraf.js.org/classes/Context

Use this method to send audio files, if you want Telegram users to receive voice messages, use this method.

````APIDOC
## POST /sendVoice

### Description
Use this method to send audio files, if you want Telegram users to receive voice messages, use this method.

### Method
POST

### Endpoint
/sendVoice

### Parameters
#### Request Body
- **voice** (string | InputFile) - Required
- **extra** (object) - Optional
  - **caption** (string | FmtString<string>) - Optional

### Response
#### Success Response (200)
- **VoiceMessage** (object) - Description of the VoiceMessage

#### Response Example
```json
{
  "voice": "voice_object"
}
````

````

--------------------------------

### Telegraf.js Command Middleware

Source: https://telegraf.js.org/classes/Composer

Creates middleware specifically for handling bot commands. It takes a command string or a custom trigger and additional middleware. This allows defining bot behavior for different commands.

```typescript
import { MiddlewareFn } from 'telegraf/typings/composer';
import { Context, NarrowedContext, Update } from 'telegraf';
import { Message, TextMessage } from 'telegraf/typings/core/types/typegram';
import { CommandContextExtn } from 'telegraf/typings/context';

// Assuming Triggers is defined elsewhere

// Example usage (conceptual):

const startCommandMiddleware: MiddlewareFn<NarrowedContext<Context<Update>, { message: New & NonChannel & TextMessage; update_id: number; } & Omit<Context<Update>, keyof Context<Update>> & CommandContextExtn>> = async (ctx) => {
  await ctx.reply('Welcome!');
};

// const commandMiddleware = Composer.command<Context<Update>>('start', startCommandMiddleware);
````

---

### Send Animation using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends an animation to a chat. Accepts an animation file path or InputFile, and optionally a caption.

```javascript
sendAnimation(animation: string | InputFile, extra?: { caption?: string | FmtString<string>; }): Promise<AnimationMessage>
```

---

### Reply with Markdown using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a message formatted with Markdown. It takes the Markdown string as input and optionally accepts extra parameters. Deprecated in favor of replyWithMarkdownV2.

```javascript
replyWithMarkdown(markdown: string, extra?: Omit<{}, "text" | "chat_id">): Promise<TextMessage>
```

---

### Static Drop Middleware

Source: https://telegraf.js.org/classes/Composer

Creates middleware that skips processing for updates matching a predicate.

````APIDOC
## Static drop

### Description
Generates middleware for dropping matching updates.

### Method
N/A (Static method)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Usage
```typescript
drop<C>(predicate: Predicate<C>): MiddlewareFn<C>
````

### Deprecated

Use `Composer.drop`

````

--------------------------------

### WizardContext Interface Definition

Source: https://telegraf.js.org/interfaces/Scenes

Defines the WizardContext interface for telegraf.js, extending the base Context. It includes properties for bot information, scene management, session data, state, Telegram API access, and update details.

```typescript
interface WizardContext<D> extends Context {
  readonly botInfo: UserFromGetMe;
  readonly scene: SceneContextScene<WizardContext<D>, D>;
  session: WizardSession<D>;
  readonly state: Record<string | symbol, any>;
  readonly telegram: Telegram;
  readonly update: Update;
  readonly wizard: WizardContextWizard<WizardContext<D>>;
}
````

---

### Composer.on Method (Deprecated)

Source: https://telegraf.js.org/classes/Scenes

Generates middleware for handling provided update types. This is a deprecated method, and `Composer.on` should be used instead. It supports various update types and filters.

```typescript
<Ctx, Filter>(filters: MaybeArray<Filter>, ...fns: NonemptyReadonlyArray<Middleware<FilteredContext<Ctx, Filter>>>): MiddlewareFn<Ctx>
```

```typescript
<Ctx, Filter>(filters: MaybeArray<Filter>, ...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<Ctx, MountMap[Filter]>, MountMap[Filter]>>): MiddlewareFn<Ctx>
```

---

### Handle Inline Queries with Telegraf.js Middleware

Source: https://telegraf.js.org/classes/Composer

Generates middleware for processing inline queries. It takes triggers, which can be strings or regular expressions, to filter queries.

```typescript
Composer.inlineQuery("query", (ctx) => {
  // Handle inline queries matching 'query'
});

Composer.inlineQuery(/search/i, (ctx) => {
  // Handle inline queries matching 'search' (case-insensitive)
});
```

---

### Composer.drop

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that ignores updates matching a predicate.

```APIDOC
## Composer.drop

### Description
Generates middleware for dropping matching updates.

### Method
`drop<C>(predicate): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **predicate** (Predicate<C>) - Required - A condition to determine if an update should be dropped.

### Returns
`MiddlewareFn<C>`
```

---

### Telegraf.js reply Middleware

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware for sending replies. It accepts text content and optional extra formatting parameters. This simplifies sending messages as responses to user inputs.

```typescript
import { MiddlewareFn } from "telegraf/typings/std";
import { Context } from "telegraf";

// Example usage:
// bot.use(Markup.reply('Hello!', { parse_mode': 'HTML' }));
```

---

### Send Photo

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to send photos. On success, the sent Message is returned.

```APIDOC
## POST /websites/telegraf_js/sendPhoto

### Description
Sends a photo to the chat. On success, the sent Message is returned.

### Method
POST

### Endpoint
/websites/telegraf_js/sendPhoto

### Parameters
#### Request Body
- **photo** (string | InputFile) - Required - Photo to send. Pass a file_id as String to send a photo that already exists on the Telegram servers or send a photo URL to upload a photo from the Internet.
- **extra** (object) - Optional - Additional options for the photo message.
  - **caption** (string | FmtString<string>) - Optional - Photo caption.
```

---

### Register inline query middleware with Telegraf.js

Source: https://telegraf.js.org/classes/Telegraf-1

Registers middleware for handling matching inline queries. It takes triggers and a rest parameter for middleware functions. Returns the Telegraf instance for chaining.

```typescript
inlineQuery(triggers: Triggers<NarrowedContext<C, InlineQueryUpdate>>, ...fns: MatchedMiddleware<C, "inline_query">): Telegraf<C>
```

---

### Composer.mention

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware for handling mentions of specific usernames.

```APIDOC
## POST /api/users

### Description
Generates middleware for handling mentions.

### Method
POST

### Endpoint
/api/users

### Parameters
#### Request Body
- **mention** (Array<string>) - Required - The usernames to mention.
- **...fns** (Array<MiddlewareFn>) - Required - The middleware functions to execute when a mention is detected.
```

---

### Telegraf.js Branch Middleware

Source: https://telegraf.js.org/classes/Composer

Creates middleware that conditionally executes based on a predicate. It takes a predicate function and two middleware functions: one for when the predicate is true and one for when it's false. This is useful for branching logic within your bot's update handling.

```typescript
import { MiddlewareFn } from "telegraf/typings/composer";
import { Context } from "telegraf";

// Assuming Predicate and Middleware are defined types elsewhere
type Predicate<C extends Context<any>> = (ctx: C) => boolean | Promise<boolean>;

// Example usage (conceptual):

const isPrivateChat: Predicate<Context<any>> = (ctx) =>
  ctx.chat?.type === "private";

const privateChatMiddleware: MiddlewareFn<Context<any>> = async (ctx, next) => {
  // Handle private chat logic
  await next();
};

const groupChatMiddleware: MiddlewareFn<Context<any>> = async (ctx, next) => {
  // Handle group chat logic
  await next();
};

// const branchMiddleware = Composer.branch<Context<any>>(isPrivateChat, privateChatMiddleware, groupChatMiddleware);
```

---

### Promote Chat Member

Source: https://telegraf.js.org/classes/Context

Promotes a chat member to administrator. This method is a shorthand for `Telegram.promoteChatMember`.

````APIDOC
## POST /promoteChatMember

### Description
Promotes a chat member to administrator. This method is a shorthand for `Telegram.promoteChatMember`.

### Method
POST

### Endpoint
/promoteChatMember

### Parameters
#### Path Parameters
- **userId** (number) - Required - The ID of the user to promote.

#### Query Parameters
- **extra** (Omit) - Required - Additional parameters for promotion, excluding `chat_id` and `user_id`.

### Request Example
```json
{
  "userId": 123456789,
  "extra": {
    "is_anonymous": false,
    "can_manage_chat": true
  }
}
````

### Response

#### Success Response (200)

- **true** - Indicates that the operation was successful.

````

--------------------------------

### sendVideoNote API

Source: https://telegraf.js.org/interfaces/Scenes

Sends a video note to a chat. Telegram clients support sending video messages as video notes.

```APIDOC
## POST /sendVideoNote

### Description
Sends a video note to a chat. Telegram clients support sending video messages as video notes. Requires a video note file ID or path.

### Method
POST

### Endpoint
/sendVideoNote

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **videoNote** (string | InputFileVideoNote) - Required - Video note to send. Can be a file_id or a path.
- **extra** (Omit<{}, "chat_id" | "video_note">) - Optional - Additional parameters for the video note message.

### Request Example
```json
{
  "videoNote": "<video_note_file_id_or_path>",
  "extra": {}
}
````

### Response

#### Success Response (200)

- **VideoNoteMessage** - An object representing the sent video note message.

#### Response Example

```json
{
  "message_id": 12345,
  "video_note": {
    "duration": 5,
    "length": 640,
    "file_id": "<file_id>",
    "file_unique_id": "<unique_file_id>",
    "thumbnail": {
      "file_id": "<thumb_file_id>",
      "file_unique_id": "<unique_thumb_file_id>",
      "width": 320,
      "height": 320
    }
  }
}
```

````

--------------------------------

### Create Forum Topic

Source: https://telegraf.js.org/classes/Telegram

Creates a new topic within a forum supergroup chat. The bot must have administrator privileges and 'can_manage_topics' rights. This function returns details of the newly created topic.

```javascript
createForumTopic(chat_id, name, extra?): Promise<ForumTopic>
````

---

### Composer.chatType

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that filters updates based on chat type.

```APIDOC
## Composer.chatType

### Description
Creates middleware running only in specified chat types.

### Method
`chatType<C>(type, ...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **type** (MaybeArray<"channel" | "group" | "supergroup" | "private">) - Required - The chat type(s) to filter by.
- **fns** (NonemptyReadonlyArray<Middleware<C>>) - Required - Middleware functions to execute.

### Returns
`MiddlewareFn<C>`
```

---

### Composer.entityText

Source: https://telegraf.js.org/classes/Scenes

Creates middleware that filters messages based on entity text and type.

```APIDOC
## Composer.entityText

### Description
Creates middleware that filters messages based on entity text and type.

### Method
`entityText<C>(entityType, predicate, ...fns): MiddlewareFn<C>`

### Parameters
#### Path Parameters
- **entityType** (MaybeArray<string>) - Required - The type of entity (e.g., 'mention', 'hashtag').
- **predicate** (Triggers<C>) - Required - A condition to match against the entity text.
- **fns** (MatchedMiddleware<C, "channel_post" | "message">) - Required - Middleware functions to execute.

### Returns
`MiddlewareFn<C>`
```

---

### Filter Middleware

Source: https://telegraf.js.org/classes/Scenes

Provides middleware to filter updates based on specific types. Deprecated in favor of filter utils.

````APIDOC
## Filter Middleware

### Description
Middleware to filter updates based on specified types. Support for Message subtype in `Composer::on` will be removed in Telegraf v5. Use filter utils instead.

### Method
`composer.filter(...filters)`

### Parameters
#### Path Parameters
- **filters** (MaybeArray<Filter>) - Required - The filter types to apply.
- **Rest** (...fns) - Required - The middleware functions to apply.

### Request Example
```json
{
  "filters": ["text", "photo"],
  "...fns": [/* middleware functions */]
}
````

### Response

#### Success Response (200)

- **WizardScene<C>** - The scene context.

#### Response Example

```json
{
  "scene": "WizardScene"
}
```

````

--------------------------------

### Webhook Callback Handler (Telegraf.js)

Source: https://telegraf.js.org/classes/Telegraf-1

Provides a callback handler for processing incoming webhook requests. This requires `bot.telegram.setWebhook` to be called first. It returns a function that handles request and response objects.

```javascript
bot.webhookCallback(path?, opts?);
````

---

### Composer.hears

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware for handling matching text messages based on provided triggers.

```APIDOC
## POST /api/users

### Description
Generates middleware for handling matching text messages.

### Method
POST

### Endpoint
/api/users

### Parameters
#### Request Body
- **triggers** (Array<string>) - Required - The text triggers to listen for.
- **...fns** (Array<MiddlewareFn>) - Required - The middleware functions to execute when a trigger matches.
```

---

### replyWithVoice

Source: https://telegraf.js.org/interfaces/Scenes

This method allows you to send a voice message. See the Telegram Bot API documentation for detailed usage.

````APIDOC
## POST /replyWithVoice

### Description
Sends a voice message to the user.

### Method
POST

### Endpoint
/replyWithVoice

### Parameters
#### Request Body
- **voice** (string | InputFile) - Required - The voice message to send.
- **extra** (object) - Optional - Extra parameters, including caption.

### Request Example
```json
{
  "voice": "...",
  "extra": { "caption": "..." }
}
````

### Response

#### Success Response (200)

- **VoiceMessage** (object) - The sent voice message.

#### Response Example

```json
{}
```

### See

https://core.telegram.org/bots/api#sendvoice

````

--------------------------------

### WizardScene.cashtag Method

Source: https://telegraf.js.org/classes/Scenes

Registers middleware to handle messages containing specific cashtags. This method is applicable to channel posts and regular messages.

```typescript
cashtag(cashtag: MaybeArray<string>, ...fns: MatchedMiddleware<C, "channel_post" | "message">): WizardScene<C>
````

---

### Composer.on

Source: https://telegraf.js.org/classes/Composer

Generates middleware for handling updates based on their type or custom filter queries. Provides a flexible way to route updates.

```APIDOC
## POST /composer/on

### Description
Generates middleware for handling updates based on their type or custom filter queries. Provides a flexible way to route updates.

### Method
POST

### Endpoint
/composer/on

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **filters** (UpdateType | Guard<Ctx["update"]> | Array<...>) - Required - The update type or filter function to match.
- **fns** (Middleware<Ctx>) - Required - Middleware to execute when the filter matches.

### Request Example
None

### Response
#### Success Response (200)
None

#### Response Example
None
```

---

### sendPhoto

Source: https://telegraf.js.org/classes/Context

Send a photo. On success, the sent Message is returned.

````APIDOC
## POST /api/sendPhoto

### Description
Send a photo. On success, the sent Message is returned.

### Method
POST

### Endpoint
/api/sendPhoto

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **photo** (string | InputFile) - Required - Photo to send. You can either pass a file_id already exists or upload a new photo.
- **extra** (object) - Optional - Additional parameters for the photo message.
  - **caption** (string | FmtString<string>) - Optional - Caption for the photo file.

### Request Example
```json
{
  "photo": "path/to/photo.jpg",
  "extra": {
    "caption": "A beautiful photo"
  }
}
````

### Response

#### Success Response (200)

- **PhotoMessage** - The sent photo message object.

#### Response Example

```json
{
  "message_id": 12345,
  "chat": {
    "id": 123456789,
    "first_name": "Test",
    "type": "private"
  },
  "photo": [
    {
      "file_id": "AgACAgIAAxkBAAJQoGSlU7zK4r2J2b8lX8hJ8V3o5R5aAAK8sTEbXy8ISQ2Wk_9F5nIBAQADAgADbQAD0AE",
      "file_unique_id": "AQAD7y0RjcvL0l5",
      "width": 90,
      "height": 90,
      "file_size": 1234
    }
  ],
  "date": 1678886400
}
```

````

--------------------------------

### Static.acl

Source: https://telegraf.js.org/classes/Composer

Generates middleware that responds only to specified user IDs.

```APIDOC
## Static.acl

### Description
Generates middleware that responds only to specified user IDs.

### Method
Static.acl

### Type Parameters
- **C**: Context<Update>

### Parameters
#### Parameters
- **userId**: MaybeArray<number>
- **Rest** ...fns: NonemptyReadonlyArray<Middleware<C>>

### Returns
MiddlewareFn<C>
````

---

### User Request Button

Source: https://telegraf.js.org/functions/Markup.button

This section details the userRequest function for creating a button that requests user information.

```APIDOC
## User Request

### Description
Creates a button that allows a user to send their information to the bot.

### Method
N/A (This is a function within a library, not a direct HTTP endpoint)

### Endpoint
N/A

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Function Signature
`userRequest(text: string, request_id: number, extra?: Omit<KeyboardButtonRequestUsers, "request_id" | "text">, hide?: boolean): Hideable<KeyboardButton.RequestUsersButton>`

### Parameters
- **text** (string) - Required - The text displayed on the button.
- **request_id** (number) - Required - Must fit in a signed 32 bit int. A unique identifier for the request.
- **extra** (Omit<KeyboardButtonRequestUsers, "request_id" | "text">) - Optional - Additional options for the user request button.
- **hide** (boolean) - Optional - Defaults to `false`. Determines if the button should be hidden.

### Returns
`Hideable<KeyboardButton.RequestUsersButton>` - An object representing the user request button, potentially with hiding capabilities.
```

---

### Create Drop Middleware - telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Generates middleware that skips processing for updates matching a given predicate. This is useful for filtering out unwanted updates.

```typescript
drop<C>(predicate: Predicate<C>): MiddlewareFn<C>
```

---

### POST /sendVideo

Source: https://telegraf.js.org/classes/Context

Use this method to send video, code, animation, or slideshow as Telegram video messages (captions for videos are also supported). We recommend using https://core.telegram.org/bots/api#sendvideovideo for videos.

````APIDOC
## POST /sendVideo

### Description
Use this method to send video, code, animation, or slideshow as Telegram video messages (captions for videos are also supported). We recommend using https://core.telegram.org/bots/api#sendvideovideo for videos.

### Method
POST

### Endpoint
/sendVideo

### Parameters
#### Request Body
- **video** (string | InputFile) - Required
- **extra** (object) - Optional
  - **caption** (string | FmtString<string>) - Optional

### Response
#### Success Response (200)
- **VideoMessage** (object) - Description of the VideoMessage

#### Response Example
```json
{
  "video": "video_object"
}
````

````

--------------------------------

### Delete Sticker Set (Telegraf.js)

Source: https://telegraf.js.org/interfaces/Scenes

Deletes an entire sticker set. This method accepts a rest parameter `...args` which includes the name of the sticker set. It returns a Promise that resolves to true on successful deletion.

```javascript
deleteStickerSet(...args): Promise<true>
````

---

### Send Venue with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends venue information to a chat. Requires latitude, longitude, title, address, and optional extra parameters. Returns a VenueMessage.

```typescript
await ctx.sendVenue(latitude, longitude, title, address, { ...extra });
```

---

### Telegraf Static Mount Method

Source: https://telegraf.js.org/classes/Telegraf-1

The static 'mount' method, aliased from Composer.on, generates middleware for handling specific update types. It accepts update type filters and middleware functions.

```typescript
mount: {
<Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>;
<Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>;
} = Composer.on

// Type declaration
//   * <Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>
//   * Generates middleware for handling provided update types.
// Type Parameters
//     * Ctx extends Context<Update>
//     * Filter extends UpdateType | Guard<Ctx["update"]>
// Parameters
//   * filters: MaybeArray<Filter>
//   * `Rest` ...fns: NonemptyReadonlyArray<Middleware<FilteredContext<Ctx, Filter>>>
// Returns MiddlewareFn<Ctx>
// Deprecated
// use `Composer.on` instead
//   * <Ctx, Filter>(filters, ...fns): MiddlewareFn<Ctx>
//   * Generates middleware for handling provided update types.
// Type Parameters
//     * Ctx extends Context<Update>
//     * Filter extends "text" | "sticker" | "animation" | "audio" | "document" | "photo" | "video" | "video_note" | "voice" | "callback_query" | "channel_post" | "chat_member" | "chosen_inline_result" | "edited_channel_post" | "message_reaction" | "message_reaction_count" | "edited_message" | "inline_query" | "message" | "my_chat_member" | "pre_checkout_query" | "poll_answer" | "poll" | "shipping_query" | "chat_join_request" | "chat_boost" | "removed_chat_boost" | "has_media_spoiler" | "contact" | "dice" | "location" | "new_chat_members" | "left_chat_member" | "new_chat_title" | "new_chat_photo" | "delete_chat_photo" | "group_chat_created" | "supergroup_chat_created" | "channel_chat_created" | "message_auto_delete_timer_changed" | "migrate_to_chat_id" | "migrate_from_chat_id" | "pinned_message" | "invoice" | "successful_payment" | "users_shared" | "chat_shared" | "connected_website" | "write_access_allowed" | "passport_data" | "proximity_alert_triggered" | "boost_added" | "forum_topic_created" | "forum_topic_edited" | "forum_topic_closed" | "forum_topic_reopened" | "general_forum_topic_hidden" | "general_forum_topic_unhidden" | "giveaway_created" | "giveaway" | "giveaway_winners" | "giveaway_completed" | "video_chat_scheduled" | "video_chat_started" | "video_chat_ended" | "video_chat_participants_invited" | "web_app_data" | "game" | "story" | "venue" | "forward_date"
// Parameters
//   * filters: MaybeArray<Filter>
//   * `Rest` ...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<Ctx, MountMap[Filter]>, MountMap[Filter]>>
```

---

### Reopen General Forum Topic (Telegraf.js)

Source: https://telegraf.js.org/classes/Context

Reopens the 'General' topic in a forum supergroup chat. Requires administrator rights ('can_manage_topics') and automatically unhides the topic if it was hidden.

```typescript
reopenGeneralForumTopic(): Promise<true>
```

---

### Send Document (Telegraf.js)

Source: https://telegraf.js.org/classes/Context

Sends a document file to a chat. Supports specifying a caption for the document.

```typescript
replyWithDocument(...args): Promise<DocumentMessage>
```

---

### Send Photo Message with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a photo to a Telegram chat. Supports optional captions. Requires the photo path or InputFile object. Returns a Promise resolving to a PhotoMessage object.

```typescript
async sendPhoto(photo: string | InputFile, extra?: {
  caption?: string | FmtString<string>;
}): Promise<PhotoMessage>
```

---

### Handle Mentions with Telegraf.js

Source: https://telegraf.js.org/classes/Scenes

Generates middleware to handle messages where the bot or a specific username is mentioned. This is useful for bots that respond to direct mentions in group chats.

```typescript
Composer.mention<MyContext>("mybot_username", (ctx) => {
  ctx.reply("You mentioned me!");
});
```

---

### webhookCallback

Source: https://telegraf.js.org/classes/Telegraf-1

Provides a callback function to handle incoming webhook requests. This is often used with external web server frameworks.

````APIDOC
## webhookCallback

### Description
Provides a callback function to handle incoming webhook requests.

### Method
POST

### Endpoint
/webhookCallback

### Parameters
#### Path Parameters
* **path** (string)
  * Optional
  * The path for the webhook. Defaults to '/'.
* **opts** (object)
  * Optional
  * Options for the webhook callback.
    * ##### **secretToken** (string)
      * Optional
      * A secret token to authenticate incoming webhook requests.

### Response
#### Success Response (200)
* **function** ((req, res, next?) => Promise<void>)
  * A function that handles the webhook request.

### Request Example
```json
{
  "example": "const webhookHandler = bot.webhookCallback('/my-webhook');"
}
````

### Response Example

```json
{
  "example": "async (req, res) => { await webhookHandler(req, res); }"
}
```

````

--------------------------------

### Handling cashtags with middleware

Source: https://telegraf.js.org/classes/Telegraf-1

Registers middleware to handle messages or channel posts containing specific cashtags. It takes a cashtag string or an array of strings, followed by middleware functions. Dependencies include Telegraf, MaybeArray, and MatchedMiddleware.

```typescript
cashtag(cashtag: MaybeArray<string>, ...fns: MatchedMiddleware<C, "channel_post" | "message">): Telegraf<C>
````

---

### Static Dispatch Middleware

Source: https://telegraf.js.org/classes/Composer

Routes updates to different middleware handlers based on a routing function.

````APIDOC
## Static dispatch

### Description
Routes updates to different middleware handlers based on a routing function.

### Method
N/A (Static method)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Usage
```typescript
dispatch<C, Handlers extends Record<string | number | symbol, Middleware<C>>>(routeFn: (ctx: C) => MaybePromise<keyof Handlers>, handlers: Handlers): Middleware<C>
````

````

--------------------------------

### replyWithAnimation

Source: https://telegraf.js.org/interfaces/Scenes

Sends an animation (e.g., a GIF) to a chat. Supports captions.

```APIDOC
## POST /replyWithAnimation

### Description
Sends an animation (e.g., a GIF) to a chat. Supports captions.

### Method
POST

### Endpoint
/replyWithAnimation

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **animation** (string | InputFile) - Required - The animation file path or URL.
- **extra** (object) - Optional - Additional parameters for the animation message.
  - **caption** (string | FmtString<string>) - Optional - Caption for the animation.

### Request Example
```json
{
  "animation": "CgACAgIAAxkBAAIBQ2Y8W2q8u9z5t7a2x3e7z5y6r4t5",
  "extra": {
    "caption": "A cool GIF!"
  }
}
````

### Response

#### Success Response (200)

- **message** (object) - The sent animation message object.

#### Response Example

```json
{
  "message": {
    "message_id": 12345,
    "chat": {
      "id": 123456789,
      "type": "private"
    },
    "animation": {
      "file_id": "CgACAgIAAxkBAAIBQ2Y8W2q8u9z5t7a2x3e7z5y6r4t5",
      "file_unique_id": "AgADGQEAA...",
      "width": 480,
      "height": 270,
      "duration": 5,
      "thumb": {
        "file_id": "AAMCAQADHQEAA...",
        "file_unique_id": "AQADGQEAA...",
        "width": 128,
        "height": 72
      }
    },
    "caption": "A cool GIF!"
  }
}
```

````

--------------------------------

### FmtString Constructor - telegraf.js

Source: https://telegraf.js.org/classes/Format

Constructs a new FmtString instance. It takes the text content and an optional array of MessageEntity objects.

```typescript
new FmtString<Brand>(text, entities?): FmtString<Brand>
````

---

### Answer Game Query

Source: https://telegraf.js.org/classes/Telegram

Answers a game query sent by the user.

```APIDOC
## POST /answerGameQuery

### Description
Answers a game query sent by the user.

### Method
POST

### Endpoint
/answerGameQuery

### Parameters
#### Path Parameters
- **callbackQueryId** (string) - Required - The unique identifier for the callback query.
- **url** (string) - Required - URL that can be opened by the inline button.

### Response
#### Success Response (200)
- **true** (boolean) - Indicates success.
```

---

### POST /declineChatJoinRequest

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work. Returns True on success.

````APIDOC
## POST /declineChatJoinRequest

### Description
Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work. Returns True on success.

### Method
POST

### Endpoint
/declineChatJoinRequest

### Parameters
#### Path Parameters
- **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
- **userId** (number) - Required - Global identifier of the entity (user, chat or channel)

### Request Example
```json
{
  "chatId": "@group",
  "userId": 123456789
}
````

### Response

#### Success Response (200)

- **result** (boolean) - True on success.

#### Response Example

```json
{
  "ok": true,
  "result": true
}
```

````

--------------------------------

### Reply with Voice using Telegraf.js

Source: https://telegraf.js.org/classes/Context

Sends a voice message. Accepts a voice file path or InputFile and optionally a caption.

```javascript
replyWithVoice(voice: string | InputFile, extra?: { caption?: string | FmtString<string>; }): Promise<VoiceMessage>
````

---

### Send Media Group

Source: https://telegraf.js.org/interfaces/Scenes

Use this method to send a group of photos or videos as an album on the Telegram messaging platform. Returns an array of Messages sent as an album, with the messages for the files listed in the `InputMedia` objects.

```APIDOC
## POST /websites/telegraf_js/sendMediaGroup

### Description
Sends a group of photos or videos as an album. Returns an array of sent Messages.

### Method
POST

### Endpoint
/websites/telegraf_js/sendMediaGroup

### Parameters
#### Request Body
- **media** (MediaGroup) - Required - Array of messages to be sent.
- **extra** (object) - Optional - Additional options for the media group.
```

---

### Static Filter Middleware

Source: https://telegraf.js.org/classes/Composer

Creates middleware that filters updates based on a predicate.

````APIDOC
## Static filter

### Description
Creates middleware that filters updates based on a predicate.

### Method
N/A (Static method)

### Endpoint
N/A

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
N/A

#### Response Example
N/A

### Usage
```typescript
filter<C>(predicate: Predicate<C>): MiddlewareFn<C>
````

### Deprecated

Use `Composer.drop`

````

--------------------------------

### Markup.selective Method

Source: https://telegraf.js.org/classes/Types

Configures the selective option for a ReplyKeyboardMarkup or ForceReply. When true, the keyboard is shown only to specific users in a group. It returns a Markup object.

```typescript
selective<T>(this, value?: boolean): Markup<T>
````

---

### replyWithPhoto

Source: https://telegraf.js.org/classes/Context

Sends a photo message. This method is a shorthand for `ctx.telegram.sendPhoto`.

````APIDOC
## POST /sendPhoto

### Description
Sends a photo message. This method is a shorthand for `ctx.telegram.sendPhoto`.

### Method
POST

### Endpoint
/sendPhoto

### Parameters
#### Path Parameters
- `photo` (string | InputFile) - Required - The photo to send. Can be a file ID or a URL.
- `extra` (object) - Optional - Additional parameters for sending the photo.
  - `caption` (string | FmtString<string>) - Optional - Caption for the photo.

### Request Example
```json
{
  "photo": "AgACAgIAAxkBAAIBh2Yy2t4M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z2M3Pz3L1v7Z
````

---

### Answer Inline Query

Source: https://telegraf.js.org/classes/Context

Answers an inline query. This method is used to send results for an inline query to the user.

```typescript
answerInlineQuery(...args: [results: readonly InlineQueryResult[], extra?: Omit<{}, "chat_id" | "inline_query_id" | "results">]): Promise<true>
```

---

### Composer.fork

Source: https://telegraf.js.org/classes/Telegraf-1

Generates middleware that runs other middleware in the background. This is useful for non-blocking operations.

````APIDOC
## POST /api/fork-middleware

### Description
Generates middleware that runs other middleware in the background. This is useful for non-blocking operations.

### Method
POST

### Endpoint
/api/fork-middleware

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **middleware** (Middleware<C>) - Required - The middleware function to run in the background.

### Request Example
```json
{
  "middleware": "(ctx) => ctx.reply('Background task started!')"
}
````

### Response

#### Success Response (200)

- **middlewareFn** (MiddlewareFn<C>) - The generated middleware function.

#### Response Example

```json
{
  "middlewareFn": "[Function: forkMiddleware]"
}
```

````

--------------------------------

### Send Game Message with Telegraf.js

Source: https://telegraf.js.org/interfaces/Scenes

Sends a game to a Telegram chat. Requires the game short name. Returns a Promise resolving to a GameMessage object.

```typescript
async sendGame(game: string, extra?: Omit<{}, "chat_id" | "game_short_name">): Promise<GameMessage>
````

---

### member visibility settings

Source: https://telegraf.js.org/interfaces/Scenes

Settings related to member visibility within a chat.

```APIDOC
## Member Visibility

### Description
Controls the visibility of members in a chat.

### Options
- **Protected**: Member list is hidden from non-administrators.
- **Private**: Member list is visible only to administrators.
- **Inherited**: Member visibility is inherited from the parent chat (if applicable).

### Usage
These settings typically apply to group or channel visibility configurations.
```

---

### Decline Chat Join Request (Telegraf.js)

Source: https://telegraf.js.org/interfaces/Scenes

Declines a user's request to join a chat. Requires the bot to be an administrator.

```javascript
bot.api.declineChatJoinRequest(chatId, userId);
```

---

### Telegraf.js Dispatch Middleware

Source: https://telegraf.js.org/classes/Composer

Creates middleware that routes updates to different handlers based on a routing function. It takes a function that determines the route key and a record of handlers for each key.

```typescript
import { Middleware } from "telegraf/typings/composer";
import { Context } from "telegraf";

// Example usage (conceptual):

const handlers = {
  greeting: async (ctx: Context<any>) => {
    await ctx.reply("Hi!");
  },
  info: async (ctx: Context<any>) => {
    await ctx.reply("Info here.");
  },
};

const routeFunction = (ctx: Context<any>): keyof typeof handlers => {
  if (ctx.message && "text" in ctx.message) {
    if (ctx.message.text.toLowerCase().includes("hello")) return "greeting";
    if (ctx.message.text.toLowerCase().includes("info")) return "info";
  }
  return "greeting"; // Default route
};

// const dispatchMiddleware = Composer.dispatch<Context<any>, typeof handlers>(routeFunction, handlers);
```

---

### POST /sendSticker

Source: https://telegraf.js.org/classes/Telegram

Sends a sticker to a specified chat. Supports .webp, animated .tgs, or video .webm stickers.

````APIDOC
## POST /sendSticker

### Description
Sends a sticker to a specified chat. Supports .webp, animated .tgs, or video .webm stickers.

### Method
POST

### Endpoint
/sendSticker

### Parameters
#### Path Parameters
- **chatId** (string | number) - Required - Unique identifier for the target chat or username of the target channel (in the format @channelusername)

#### Query Parameters
- **sticker** (string | InputFile) - Required - The sticker to send.
- **extra** (object) - Optional - Additional options for the sticker message.

### Request Example
```json
{
  "chatId": "@mychannel",
  "sticker": "URL_TO_STICKER.webp"
}
````

### Response

#### Success Response (200)

- **StickerMessage** (object) - Represents the message sent with the sticker.

#### Response Example

```json
{
  "message_id": 12345,
  "chat": {
    "id": 123456789,
    "type": "private"
  },
  "sticker": {
    "file_id": "...",
    "file_unique_id": "...",
    "width": 512,
    "height": 512,
    "is_animated": false,
    "is_video": false
  }
}
```

```

```
