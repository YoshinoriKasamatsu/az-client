import {
    decode,
    encode,
  } from "https://deno.land/std@0.170.0/encoding/base64.ts";

const token = Deno.env.get("personalAccessToken");


console.log(token);

const org = "";
const project = "";
const query = "<query-name>"; // フィルタリングするクエリー名
const url = `https://dev.azure.com/${org}/${project}/_apis/wit/wiql?api-version=6.0`;

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${encode(`:${token}`)}`,
  },
  body: JSON.stringify({
    query: `SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType], [System.Tags] 
        FROM workitems 
        WHERE 
            [System.TeamProject] = '${project}' 
        ORDER BY [System.ChangedDate] DESC`,
  }),
});

const { workItems } = await response.json();
console.log(workItems);
