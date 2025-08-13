# Super-SNS

This project is now configured for building and packaging as a mobile app.

## Development

```bash
npm install
npm run dev
```

## Build for App Store

```bash
npm run build
npx cap add ios
npx cap open ios
```

After running these commands, use Xcode to archive and submit the app to the App Store.
