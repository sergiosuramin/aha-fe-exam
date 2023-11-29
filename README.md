## Aha Exam for Frontend Position

Take Home Exam for: Frontend Position at Aha AI
Created by: Sergio Suramin, S.Kom

## Tech Stacks

- Next.js 13 (React.js)
- Typescript
- Material UI v5
- Tailwind CSS v3
- PWA Ready
- SEO Ready

## What's in here

1. Exam 1 (UI/UX Component)
2. Exam 2 (Page Layout, Routing, API)
3. Bug finding (submitted via terraform)

[`Exam Reference`](https://rootdomain.notion.site/Pre-Interview-Information-9c4a3cd26c054c41bc64f0565c827163?p=ac3dd8a3474542899d49efb894672246&pm=s)

## PWA Ready

Progressive Web App (PWA) ready for better experience.

PWA Tested on:

- Chrome (Desktop, Mac, Android)
- Firefox (Desktop) \*Need Extension
- Safari (iOS)
- Kiwi Browser (Android)

[`Browser Support`](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)

## Getting Started

First, install the dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Husky

In the case your husky is not running when you commit a file, please run this command first

```bash
yarn husky install
```

## Commit Message

Please follow these message format to your commit message:

1. A new feature
   feat: [your_message]

2. A bug fix
   fix: [your_message]

3. Documentation only changes
   docs: [your_message]

4. Changes that do not affect the meaning of the code
   style: [your_message]

5. A code change that neither fixes a bug nor adds a feature
   refactor: [your_message]

6. A code change that improves performance
   perf: [your_message]

7. Adding or modifying tests
   test: [your_message]

8. Changes to the build process or auxiliary tools and libraries such as documentation generation
   chore: [your_message]

9. Revert to a previous commit
   revert: [your_message]

## Components

Within the "components" directory, there are three subfolders:

1. ui
   - This serves as the designated space for crafting fundamental UI components such as textfields, datepickers, etc.
2. layout
   - This serves as the designated space for developing layout components like "Container" or any other layout components when necessary.
3. feature
   - This serves as the designated space for creating custom components, typically employed when there is a need for a component with a specific purpose.

While reviewing the code, you'll observe that all components have a "Th" prefix. Why? Let's take a moment to reflect. How many times have we created a component with the same name as a component from a third-party library, leading to confusion? This is where the prefix becomes crucial. By assigning a prefix to our components, we ensure each one has a unique name, making it easier for other developers to discern and understand the code.

The same reason applied to the tailwind configuration in this repo.

## QnA

1. Why using Next instead of React.js itself?

- Next.js is built on top of React.js, making it an extension of the React framework. By choosing Next.js, we are inherently using React. The decision to use Next.js was primarily driven by its additional features and capabilities, such as server-side rendering and simplified routing, which significantly expedite the development process (this was my primary goal timewise).

2. Why not using axios / react-query for data fetching?

- In my opinion, it appeared excessive to employ those libraries for managing three simple GET APIs.
