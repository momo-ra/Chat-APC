import { PagesFunction } from "@cloudflare/functions";

export const onRequestGetById: PagesFunction = async (ctx) => {
    const token = ctx.env.HUBSPOT_TOKEN || ctx.env.HUB_SPOT_TOKEN;
    if (!token) return new Response(JSON.stringify({ error: "Missing HUBSPOT_TOKEN" }), { status: 500 });
  
    const id = ctx.params.id as string;
    if (!id) return new Response(JSON.stringify({ error: "Blog ID is required" }), { status: 400 });
  
    const res = await fetch(`https://api.hubapi.com/cms/v3/blogs/posts/${id}`, { method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
  
    if (res.status === 404) {
      return new Response(JSON.stringify({ error: "Blog post not found" }), { status: 404 });
    }
    if (!res.ok) return new Response(JSON.stringify({ error: "HubSpot error", status: res.status }), { status: 502 });
  
    const data = await res.json();
    return new Response(JSON.stringify({ status: "success", data }), { headers: { "Content-Type": "application/json" } });
  };