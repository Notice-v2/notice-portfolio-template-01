# Notice App Template

The Notice App Template is a starting point for building apps that integrate with the Notice platform. 

## Getting Started

### 1. Clone the template:

- On Github:

  ![Use this template](https://assets.notice.studio/readme/use-template.png)

- Or by cloning the repository:

  ```bash
  git clone https://github.com/your-username/notice-app-template.git <app-name>
  ```

### 2. Install the dependencies:

```bash
npm install
```

### 3. Start the development server:

```bash
npm run dev
```

### 4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

### 5. Target your Notice project

You will find a `404: notice not found`, that's because the URL doesn't contain any project to target.

In production, that's the role of the wildcard domain `*.notice.site`. In development, you can choose your project by adding a query param: `http://localhost:3000?target=<project>`.

For example, the Notice blog:

```
http://localhost:3000?target=74841f91-594b-4503-9a39-fa962038ba3e
```

## Structure

To ensure compatibility and optimal performance, your app must follow the template structure:

- Next.js 14+
- App Folder (not pages)
- React SWC for components
- Tailwind CSS for styling

This setup allows all Notice app developers to sync and work together.

## Features

To properly work, the app needs at least two specific pages:

- Home page: should contain at least one of the project pages

  - Path: `/`
  - API route: `/projects/${projectId}`
  - Required function: `extractProjectId(headers, searchParams)` (from `@/tools/api.ts`)

- Subpage page: should display the page content
  - Path: `/:pageId`
  - API route: `/pages/${pageId}`

These pages can fetch the needed data with the prebuilt axios client `API` from `@/tools/api.ts`.

Apart from that, you are free to customize the application as you wish.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This app template is open source and available under the [MIT License](LICENSE).
