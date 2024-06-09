# Rijksmuseum Art Gallery

This is a simple application to display data fetched from the Rijksmuseum API. It includes a search and filter functionality and a detail page to show in-depth information about selected art pieces.

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Masonic (for masonry layout)
- Lodash (for utility functions)
- RxJS (for reactive programming)

## How to Run

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to `http://localhost:3000`.

## Features

- Search and filter artworks from the Rijksmuseum API.
- Responsive masonry layout for displaying art pieces.
- Detailed view for each art piece with additional information.

## Decisions and Benefits

- **Next.js**: Chosen for its ease of setup and powerful features like server-side rendering and static site generation.
- **TypeScript**: Provides type safety and better development experience.
- **Tailwind CSS**: Allows for rapid and consistent styling.
- **Lodash**: Used for utility functions like debouncing the search input.
- **RxJS**: Used for handling the search input reactively.

## Future Improvements

- Implement image color matching for advanced search.
- Add a caching layer using a separate Node.js server.
- Enhance the UI with more detailed styling and animations.
