<h1 align="center">FormulaMonksApp</h1>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#open_file_folder-folder-structure">Folder structure</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/favianCVM" target="_blank">Author</a>
</p>

<br>

## :dart: About

This is a tech test project for the react-native developer position in formula.monks

The app consist of a Posts app where you can visualize post details like author and its comments and also functionalities like mark as favorite, delete post and rating it with stars.

## :sparkles: Features

:heavy_check_mark: Post loading from JSON API;\
:heavy_check_mark: Post card title dynamic height;\
:heavy_check_mark: Post details view which displays author information and comments;\
:heavy_check_mark: Favorite/unfavorite functionality where favorite ones will be listed at the top;\
:heavy_check_mark: Delete post functionality;\
:heavy_check_mark: Delete all non favorite post functionality;\
:heavy_check_mark: Reload all post functionality;\
:heavy_check_mark: Off-line post details visualization funtionality;

## :rocket: Technologies

The following tools were used in this project:

- React
- React-native (react-native-cli)
- redux
- redux-toolkit
- react-redux

## :rocket: Libraries

The following libraries were used in this project:

- react-native-skeleton-loaders: this brings the display placeholder boxes for better user experience
- react-native-star-rating-widget: this component brings a five stars rating button component which handles the rating functionality
- react-native-toast-message: This library allows to display a toast message with low amount of implementation
- react-native-vector-icons: This library allows to use a set pre-defined icons
- accordion-collapse-react-native: This library brings a accordion-collapse component ready to use (this component displays post author and comments in details screen)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :open_file_folder: Folder structure

```bash
.
├──__tests__
├──views
├──components
├──hooks
├──store
├──libs
├──styles
├──App.tsx
```

- **tests**: unit test folder
- views: App views components folder
- components: App components folder
- hooks: App custom hooks folder
- store: App redux store folder
- libs: App libs functionality folder (i.ex: error displaying or size normalization utils)
- styles: App styles utilities folder
- App.tsx: App entry point

## :checkered_flag: Starting

```bash
# Clone this project
$ git clone https://github.com/favianCVM/formula_monks

# Access
$ cd formulaMonksApp

# Install dependencies
$ yarn

# Run the project (android)
$ yarn start-android

# Run the project (ios)
$ yarn start-ios

```

## :memo: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.

Made with :heart: by <a href="https://github.com/favianCVM" target="_blank">Fabian salazar</a>

&#xa0;

<a href="#top">Back to top</a>
