import type { Menu } from "~/types";

export const uid = () => {
    const head = Date.now().toString(36);
    const tail = Math.random().toString(36).substring(2);

    return head + tail;
};

export const validateEmail = (email:string) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(mailformat);
};

export const validatePassword = (password:string) => {
    password = password.trim();
    return password.length > 5;
};

export const search = (q: string, array: Array<string>) => {
    
    q = q.toLocaleLowerCase()

    return array.filter((obj) => {
        return Object.values(obj)
            .join(" ")
            .slice(1)
            .toLocaleLowerCase()
            .includes(q.trim());
    });
};

export function searchArray<T>(array: T[], condition: (item: T) => boolean): { item: T; index: number } | null {
    for (let i = 0; i < array.length; i++) {
        if (condition(array[i])) {
            return { item: array[i], index: i };
        }
    }
    return null;
}

export function updateItemInArray<T>(array: T[], index: number, newItem: T): T[] {
    if (index >= 0 && index < array.length) {
        // Create a new array with the updated item
        return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
    }
    // If the index is out of bounds, return the original array
    return array;
}

// export function moveItemInArray(array: MenuItem[], fromIndex: number, toIndex: number): MenuItem[] {
//     // Ensure fromIndex and toIndex are within the bounds of the array
//     if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
//         return array; // Return the original array if indices are out of bounds
//     }

//     const newArray = [...array]; // Create a shallow copy of the original array
//     const [itemToMove] = newArray.splice(fromIndex, 1); // Remove the item at fromIndex
//     newArray.splice(toIndex, 0, itemToMove); // Insert the item at toIndex

//     return newArray;
// }

export function searchInTable (q: string, array: Array<string>) {
  if (!q) {
    return array
  }

  return array.filter((row: { [s: string]: unknown; } | ArrayLike<unknown>) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(q.toLowerCase())
    })
  })
}
// export const getMenuFromLocalStorage = (id:string) => {
//     let menu = null;
//     const oneFoodMenu = JSON.parse(localStorage?.getItem("oneFoodMenu") || '') || [];
//     menu = oneFoodMenu.find((f: { menu_uid: string; }) => f.menu_uid === id);
//     return menu;
// };

// export const removeMenuFromLocalStorage = (id:string) => {
//     const oneFoodMenu = JSON.parse(localStorage.getItem("oneFoodMenu")|| '');
//     let menuObj = oneFoodMenu.find((f: { menu_uid: string; }) => f.menu_uid === id);
//     let idx = oneFoodMenu.indexOf(menuObj);
//     if (menuObj && idx >= 0) {
//         oneFoodMenu.splice(idx, 1);
//         localStorage.setItem("oneFoodMenu", JSON.stringify(oneFoodMenu));
//     }
// };

export const getMenuFromLocalStorage = (id: string): Menu | null => {
    const oneFoodMenu = JSON.parse(localStorage.getItem("oneFoodMenu") || "[]") as Menu[];
    const menu = oneFoodMenu.find((f) => f.menu_uid === id);
    if (!menu) {
        return null;
    }
    return menu;
};


export const removeMenuFromLocalStorage = (id: string): void => {
    const oneFoodMenu = JSON.parse(localStorage.getItem("oneFoodMenu") || '[]') as { menu_uid: string }[];
    const menuIndex = oneFoodMenu.findIndex((f) => f.menu_uid === id);

    if (menuIndex >= 0) {
        oneFoodMenu.splice(menuIndex, 1);
        localStorage.setItem("oneFoodMenu", JSON.stringify(oneFoodMenu));
    }
};

export const addMenuToLocalStorage = (menu: Menu):void => {
    //add or update the menu
    if (menu?.isFromLocal) {
        const oneFoodMenu = JSON.parse(localStorage.getItem("oneFoodMenu") || '[]') as { menu_uid: string }[];
        const menuIndex = oneFoodMenu.findIndex((f) => f.menu_uid === menu.menu_uid);

        if (menuIndex >= 0) {
            oneFoodMenu[menuIndex] = menu;
        } else {
            oneFoodMenu.push(menu);
        }

        localStorage.setItem("oneFoodMenu", JSON.stringify(oneFoodMenu));
    }
};