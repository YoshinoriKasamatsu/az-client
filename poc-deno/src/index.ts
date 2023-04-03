import { config } from "./config.ts";
import { Common } from "./common.ts";
import { Observable, of, from, interval, map } from 'https://deno.land/x/rxjs/mod.ts';




const query = JSON.stringify({
  query: `SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType], [System.Tags], [Title] 
      FROM workitems 
      WHERE 
          [System.TeamProject] = '${config.project}' 
      ORDER BY [System.ChangedDate] DESC`,
});

// const url = `https://dev.azure.com/${config.org}/${config.project}/_apis/wit/wiql?api-version=7.0&$expand=all`;
// const url = `https://dev.azure.com/${config.org}/${config.project}/_apis/wit/workitems?api-version=6.0&$filter=System.WorkItemType eq 'Bug'`;
const url = `https://dev.azure.com/${config.org}/${config.project}/_apis/wit/workitems?ids=200&api-version=7.0&$expand=all`;

const schemaUrl = `https://dev.azure.com/${config.org}/${config.project}/_apis/wit/fields?api-version=7.0`


const responseField = await Common.get(schemaUrl);
const items = await responseField.json();
for(const item of items.value) {
    console.log(item.name);
}

// const response = await Common.fetch(url, query);
// const { workItems } = await response.json();
// console.log(workItems);

const response = await Common.get(url);
const workItems = await response.json();
console.log(workItems.value);
