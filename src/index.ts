import { createServer, ServerResponse } from "http"
import { parse } from "ini"
import { readFileSync } from "fs"
import * as director from "director";
import Settings from "./common/Settings"
import GetBins from "./routes/GetBins.js"
import JsonResponse from "./common/JsonResponse.js";

const server = createServer()
const settings = <Settings> parse(readFileSync("settings.ini", "utf-8"))
const router = new director.http.Router({
    "/api": {
        "/bins": {
            get() {
                respondWithJson(this.res, GetBins(settings))
            }
        }
    }
});

function respondWithJson(serverResponse: ServerResponse, jsonResponse: JsonResponse) {
    serverResponse.writeHead(jsonResponse.statusCode, { "Content-Type": "application/json" });
    serverResponse.end(JSON.stringify(jsonResponse.data));
}

server.on("request", (req, res) => {
    router.dispatch(req, res, err => {
        res.writeHead(err.status)
        res.end()
    })
})

server.listen(8080)