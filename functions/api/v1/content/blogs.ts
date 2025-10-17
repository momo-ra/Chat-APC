import { PagesFunction } from "@cloudflare/functions";

export const onRequestGet: PagesFunction = async (ctx) => {
    const token = ctx.env.HUBSPOT_TOKEN || ctx.env.HUB_SPOT_TOKEN;
    if (!token) return new Response(JSON.stringify({ error: "Missing HUBSPOT_TOKEN" }), { status: 500 });
  
    const url = "https://api.hubapi.com/cms/v3/blogs/posts";
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) return new Response(JSON.stringify({ error: "HubSpot error", status: res.status }), { status: 502 });
  
    const data = await res.json();
    const count = data.results?.length || data.objects?.length || 0;
    const body = { status: "success", count, total: data.total || count, data };
    return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
  };