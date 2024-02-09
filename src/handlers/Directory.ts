import fs from "node:fs";

const ignore: String[] = [".DS_Store",".hidden"];
export function isDirectoryHidden(path: String): boolean {

    return fs.existsSync(path + "/.hidden");
}
export function getDirectoryList(path: String): String[] {
    let paths: String[] = [];

    fs.readdirSync(path.toString()).forEach((item) => {
        console.log(path + item)

        if (!path.endsWith("/")) {
            path += "/";
        }

        if (!ignore.includes(item) && !isDirectoryHidden(path + item)) {
            paths.push(item);
        }
    })
    return paths;
}
export function generateHtml(currentRoute: String, subpaths: String[]): String {
    console.log(currentRoute);
    console.log(subpaths);
    return `
    <html>
        <body>
            <h1>${currentRoute}</h1>
            <hr/>
            ${currentRoute != "/" ? `<li><a href="${currentRoute.substring(0,currentRoute.lastIndexOf('/')+1)}">../</a></li>` : ""}
            ${
                createPathList(currentRoute,subpaths)
            }
            
        </body>
    </html>
    `;
}

function createPathList(currentRoute: String, subpaths: String[]): String {

    let list: String = "";
    subpaths.forEach((route) => {
        let path: String = route;
        if (!currentRoute.endsWith("/")) {
            list += `<li><a href="${currentRoute + "/" + path}">/${route}</a></li>`;
            return;
        }
        list += `<li><a href="${currentRoute + "" + path}">/${route}</a></li>`
    });
    return list;
}