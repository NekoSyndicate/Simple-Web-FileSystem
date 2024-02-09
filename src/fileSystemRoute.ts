import {Request, Response} from "express";
import {generateHtml, getDirectoryList, isDirectoryHidden} from "./handlers/Directory";
import fs from 'node:fs';
import path from "node:path";

const ROOT = "./public"
export default function fileSystem(req: Request, res: Response)
{
    if (!fs.existsSync(ROOT + req.path)) {
        res.sendStatus(404)
    }

    if (fs.lstatSync(ROOT + req.path).isDirectory()) {
        res.send(generateHtml(req.path, getDirectoryList(ROOT + req.path)));
    }

    res.sendFile(path.join(__dirname, '../public', req.path));
}