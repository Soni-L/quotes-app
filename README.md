## App URL :rocket:

https://quotes-app-cyan-seven.vercel.app

## Important features walkthrough

1. The first feature is the fetchQuotes() api call, here we call a race between 2 apis for retreaving random quotes and the first one that returns is used. It was important to figure out which api resolves the first so the return data can be parsed in a unified format.

2. The next major feature utilized the useOfflineCaching() + useNetworkStatus() hooks, here we do two things, call the apis on a reasonable time interval to generate a fresh batch of random quotes, store them in localstorage and use the useNetworkStatus hook to detect if the user is offline. In this case we display a message to the user and still keep feeding him quotes from the last batch we loaded before our user went offline.

3. To show my creativity, I have included a fun feature called 'pimp my quote', which uses AI to phrase these quotes by great men and women in the style of an even greater man: Snoop Dogg!

## Worth mentioning

An important thing to keep in mind when working with free apis is rate limits, in order to avoid hitting them too much I have used a next server-side caching to only call the apis once every 30 seconds across server requests.