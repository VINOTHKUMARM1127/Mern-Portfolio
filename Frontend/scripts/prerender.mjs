import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync, brotliCompressSync } from "node:zlib";
import { render, routes, getPageMeta } from "../.prerender/entry-server.js";
const template=await fs.readFile("dist/index.html","utf8");
const escape=value=>value.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;");
const renderPage=async route=>{
 const meta=getPageMeta(route);
 let html=template.replace('<div id="root"></div>',`<div id="root" data-prerendered="true">${await render(route)}</div>`);
 html=html.replace(/<title>.*?<\/title>/,`<title>${escape(meta.title)}</title>`);
 for(const [selector,value] of [[/name="description" content="[^"]*"/,meta.description],[/name="robots" content="[^"]*"/,meta.robots],[/rel="canonical" href="[^"]*"/,meta.url]])html=html.replace(selector,match=>match.replace(/="[^"]*"$/,`="${escape(value)}"`));
 for(const [attr,prefix] of [["property","og"],["name","twitter"]])for(const field of ["title","description","url"]){const key=`${prefix}:${field}`;const value=field==="url"?meta.url:meta[field];html=html.replace(new RegExp(`${attr}="${key}" content="[^"]*"`),`${attr}="${key}" content="${escape(value)}"`);}
 const dest=route==="/"?"dist/index.html":route==="/404"?"dist/404.html":`dist${route}/index.html`;
 await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,html);console.log("Prerendered",route);
};
// Each page is rendered independently. Sequential SSR avoids sharing React server resources across streams.
for(const route of [...routes,"/404"])await renderPage(route);
const origin=getPageMeta("/").url.replace(/\/$/,"");
await fs.writeFile("dist/sitemap.xml",`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.filter(route=>route!=="/review").map(route=>`<url><loc>${origin}${route}</loc></url>`).join("")}</urlset>`);
async function compress(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())await compress(file);else if(/\.(html|js|css|svg|xml|json)$/.test(entry.name)){const bytes=await fs.readFile(file);if(bytes.length>1024){await Promise.all([fs.writeFile(file+".gz",gzipSync(bytes,{level:9})),fs.writeFile(file+".br",brotliCompressSync(bytes))]);}}}}
await compress("dist");
await fs.rm(".prerender",{recursive:true,force:true});
console.log("Static pages and compressed assets ready. Vercel negotiates compression at its CDN.");
