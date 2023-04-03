import { encode } from "https://deno.land/std@0.170.0/encoding/base64.ts";
import { config } from "./config.ts";

const token = Deno.env.get("personalAccessToken");

console.log(token);

export const Common = {
    async fetch(url: string, query: string): Promise<Response> {
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${encode(`:${token}`)}`,
            },
            body: query,
          });
        return response;
    },
    async get(url: string): Promise<Response> {
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${encode(`:${token}`)}`,
            }
          });
        return response;
    }
}