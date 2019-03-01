# EXAMPLE slack-ping-pong

## Prepare for development

#### Install dependencies

```sh
yarn
```

#### Start dev server

```sh
yarn dev
```

#### External public port 9098

```sh
serveo -R <alias>:80:localhost:9098 serveo.net
```

## Prepare for production

#### Register secret environment value using now

```sh
now secret add slack-oauth-access-token xxx
now secret add slack-logger-channel xxx
```

`.env` file too

```sh
SLACK_OAUTH_ACCESS_TOKEN=xxx
SLACK_LOGGER_CHANNEL=xxx
```

Also, by editing `.gitignore` file like following, to ignore `.env` file from git index.

```diff
-# .env
+.env
```

#### Edit now.json

```json
{
  "alias": "<alias>.now.sh",
  "env": {
    "SLACK_OAUTH_ACCESS_TOKEN": "@slack-oauth-access-token",
    "SLACK_LOGGER_CHANNEL": "@lack-logger-channel"
  }
}
```

#### Deploy on now

```sh
yarn deploy
```
