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

export const searchInTable = (q: string, array: Array<string>) => {
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

export const getMenuFromLocalStorage = (id: string) => {
    const oneFoodMenu = JSON.parse(localStorage.getItem("oneFoodMenu") || '[]') as { menu_uid: string }[];
    return oneFoodMenu.find((f) => f.menu_uid === id) || null;
};

export const removeMenuFromLocalStorage = (id: string) => {
    const oneFoodMenu = JSON.parse(localStorage.getItem("oneFoodMenu") || '[]') as { menu_uid: string }[];
    const menuIndex = oneFoodMenu.findIndex((f) => f.menu_uid === id);

    if (menuIndex >= 0) {
        oneFoodMenu.splice(menuIndex, 1);
        localStorage.setItem("oneFoodMenu", JSON.stringify(oneFoodMenu));
    }
};

export const addMenuToLocalStorage = (menu: any) => {
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