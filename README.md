# Easy email testing with Mailtrap

## How to
POST to http://todo.com/mailtrap

```
body: {
    inboxId: string, // Mailtrap inbox ID (visible in the URL of mailtrap)
    apiToken: string, // Mailtrap API token
    subject: string,
    messageHtml: string // HTML
}
```