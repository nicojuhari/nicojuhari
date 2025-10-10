export default defineAppConfig({
  ui: {
    colors: {
        primary: "blue",
        neutral: "gray",
        secondary: "green",
        error: "red",
    },
    card: {
      slots: {
        body: 'flex flex-col h-full py-8 sm:py-10'
      }
    },
    button: {
        slots: {
            base: "cursor-pointer",
        },
        defaultVariants: {
            color: "primary",
            variant: "solid",
            size: "lg",
        },
    },
    input: {
        slots: {
            root: "w-full",
        }
    },
  }
})