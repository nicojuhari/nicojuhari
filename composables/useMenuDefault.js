export const useMenuDefault = async () => {
    const { createMenu } = await import(
        "https://cdn.jsdelivr.net/npm/1food-menu@0.6.10/dist/1food-menu.mjs"
    );
    return { createMenu };
};
