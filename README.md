# puwp-2019-layouts-new

This is a [NodeCG](http://github.com/nodecg/nodecg) graphics bundle.  It is intended to be used with Speedcontrol, as well as our extra Speedcontrol addon bundles for some extra core functionality.

## Getting Started

### 1. Install Node.js
Instructions on the Node.js site here: https://nodejs.org/en/

**NOTE:** At time of this writing, the current LTS version is 12.x and the NodeCG developers recommend sticking with the LTS releases for production.  It should work with the current stable version as well, which is 13.x currently, but you'll have to test this yourself.

### 2. Install NodeCG
Follow the quick start guide here: https://nodecg.com/tutorial-3_quick-start.html

Do steps 1-2 to install the `nodecg-cli` package.

### 3. Make a working directory and install NodeCG
Create a fresh directory, and run the NodeCG setup in it:

```bash
nodecg setup
```

### 4. Install bundles
Install the Speedcontrol bundle, our extra Speedcontrol functionality, and this bundle from GitHub using the following commands:

```bash
nodecg install speedcontrol/nodecg-speedcontrol
nodecg install PowerUpWithPride/speedcontrol-layoutswitch
nodecg install PowerUpWithPride/speedcontrol-gdqtracker
nodecg install PowerUpWithPride/puwp-2019-layouts-new
```

This will create a `bundles` subfolder inside your new directory that contains git repositories of these two bundles.  You can now make whatever changes and tweaks you like from that location.

### 5. Generate config files

You can generate default config files for the bundles based on their config schemas:

```bash
nodecg defaultconfig nodecg-speedcontrol
nodecg defaultconfig speedcontrol-layoutswitch
nodecg defaultconfig speedcontrol-gdqtracker
```

This will create a new subdirectory called `cfg` for the config files.  Update the `speedcontrol-layoutswitch.json` and `speedcontrol-gdqtracker.json` files with your settings for any extra custom layouts, and donation tracker settings if you're using it.

You can check out the JSON config files from the [config files repository](https://github.com/PowerUpWithPride/puwp-config-files/tree/master/layouts) for NodeCG and Speedcontrol themselves to see exactly what settings we're using.  You should copy the Speedcontrol one at least, because that includes the Twitch integration settings.

### 6. Run the server locally to test
In the directory where you ran setup initially, run the following:

```bash
nodecg start
```

The server should run on `localhost:9090` by default.  You can open this location in your web browser and start experimenting.

### 7. Running in production

To run NodeCG in production, [pm2](https://pm2.io) is recommended.

