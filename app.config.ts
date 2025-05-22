export default defineAppConfig({
  ui: {
    colors: {
        primary: "blue",
        neutral: "gray",
        secondary: "green",
        error: "red",
    },
    modal: {
      container: 'items-center'
    },
    card: {
      slots: {
        body: 'flex flex-col h-full py-8 sm:py-10'
      }
    },
    button: {
        defaultVariants: {
            color: "primary",
            variant: "solid",
            size: "lg",
        },
    },
  }
})