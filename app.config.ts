export default defineAppConfig({
  ui: {
    colors: {
        primary: "blue",
        neutral: "gray",
        secondary: "green",
    },
    modal: {
      container: 'items-center'
    },
    card: {
        body: {
            base: 'flex flex-col h-full'
        }
    }
  }
})