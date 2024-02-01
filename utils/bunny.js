export const getFileExtension = (filename) => {
    let ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
};

export const getImageExtensionFromURL = (url) => {
    const lastDotIndex = url.lastIndexOf(".");
    if (lastDotIndex !== -1) {
        const extension = url.slice(lastDotIndex + 1).toLowerCase();
        return extension;
    }
    return null; // If no extension found or URL doesn't contain a dot
};

function removeQueryParamsFromURL(url) {
    try {
        const parsedUrl = new URL(url);
        parsedUrl.search = "";
        return parsedUrl.toString();
    } catch (error) {
        console.error("Invalid URL:", error);
        return url; // Return the original URL if it is invalid
    }
}

export const checkFileType = (name, ext = false) => {
    if (name) ext = name.split(".").pop();
    if (!ext) return false;

    const imgFormats = [
        "png",
        "jpg",
        "jpeg",
        "gif",
        "webp",
        "svg",
        "bmp",
        "ico",
        "tiff",
        "jfif",
        "pjpeg",
        "pjp",
        "avif",
    ];
    const videoFormats = ["mp4", "webm", "ogg", "ogv", "avi", "mov", "wmv", "flv", "swf", "avchd"];
    const audioFormats = ["mp3", "wav", "flac", "aac", "wma", "m4a", "aiff", "ape", "opus"];

    if (imgFormats.includes(ext)) return "image";
    if (videoFormats.includes(ext)) return "video";
    if (audioFormats.includes(ext)) return "audio";
    if (ext == "pdf") return "pdf";
    return false;
};

export const getFileName = (filename) => {
    return filename.replace(/\.[^/.]+$/g, "");
};

function getFileNameFromURL(url) {
    const lastSlashIndex = url.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
        const fileName = url.slice(lastSlashIndex + 1);
        return fileName;
    }
    return null; // If no file name found or URL doesn't contain a slash
}

export const prepareFileName = (fl) => {
    fl = fl.trim().toLowerCase();
    fl = fl.replace(/[^a-zA-Z0-9]/g, " "); //remove non alf
    fl = fl.replace(/ +/g, " "); //remove multiple spaces
    fl = fl.replace(/ /g, "-"); //space to dash
    fl = fl.replace(/(^[-_]*|[-_]*$)/g, ""); // removes -_ if starts or end

    return fl;
};

export const fileReader = async (file) => {
    let result = await new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.readAsDataURL(file);
    });
    return result;
};

export const readFileFromURL = async (fileURL) => {
    try {
        let result = await fetch(fileURL);

        fileURL = removeQueryParamsFromURL(fileURL);

        let extension = getImageExtensionFromURL(fileURL);
        let fileName = getFileNameFromURL(fileURL);
        let type = checkFileType(null, extension);

        let blob = await result.blob();
        let file = new File([blob], fileName, { type: type + "/" + extension });

        return file;
    } catch (error) {
        console.error(error);
        alert(
            "Couldn't fetch the file, check the URL and try again\nor make sure the URL is publicly accessible."
        );
        return null;
    }
};

export const getImageDimensions = (image) => {
    return new Promise((resolved, rejected) => {
        let i = new Image();
        i.onload = function () {
            resolved({ width: i.width, height: i.height });
        };
        i.src = image;
    });
};
