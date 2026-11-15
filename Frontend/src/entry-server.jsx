import { StaticRouter } from "react-router-dom";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import App from "./App";
export { routes, getPageMeta } from "./data/pageMeta";
export function render(pathname){return new Promise((resolve,reject)=>{
 const output=new PassThrough();const chunks=[];let error=null;
 output.on("data",chunk=>chunks.push(chunk));output.on("end",()=>{clearTimeout(timer);if(error)reject(error);else resolve(Buffer.concat(chunks).toString());});
 const stream=renderToPipeableStream(<StaticRouter location={pathname}><App/></StaticRouter>,{onAllReady(){stream.pipe(output);},onShellError:reject,onError(err){error=err;}});
 const timer=setTimeout(()=>{stream.abort();reject(new Error(`Prerender timeout: ${pathname}`));},15000);
});}
