# Opti
An *opti*mized Discord experience for mobile.

## Installing

### Android
* Root - [VendettaXposed](https://github.com/opti-mod/OptiXposed/releases/latest)
* Non-root - [OptiManager](https://github.com/opti-mod/OptiManager/releases/latest)
    - Manager not working? No problem! Pre-built APKs are provided [here](https://discord.k6.tf/).
    - The minimum Android version required is 9. It will not work on any lower version.

### iOS
* Jailbroken - [VendettaTweak](https://github.com/vendetta-mod/VendettaTweak)
    - You can get prebuilt `.deb` files from GitHub Actions - we support rootful and rootless jailbreaks!
* Jailed - You can get IPAs from [the thread](https://discord.com/channels/1015931589865246730/1087295482667208766) in our [Discord server](https://discord.gg/n9QQ4XhhJP) or from our [host](https://discord.k6.tf/ios/).

* Sideloading with Enmity - You can sideload Opti with Enmity by using VendettaCompat and putting this url in the custom load: https://raw.githubusercontent.com/Opti-mod/Opti/rewrite/dist/vendetta.js

## Contributing
1. Install an Opti loader with loader config support (any mentioned in the [Installing](#installing) section).

2. Go to Settings > General and enable Developer Settings.

3. Clone the repo:
    ```
    git clone https://github.com/opti-mod/Opti
    ```

4. Install dependencies:
    ```
    pnpm i
    ```
    <sup>`npm` or `yarn` should also work.</sup>

5. Build Opti's code:
    ```
    pnpm build
    ```
    <sup>`npm` or `yarn` should also work.</sup>

6. In the newly created `dist` directory, run a HTTP server. I recommend [http-server](https://www.npmjs.com/package/http-server).

7. Go to Opti settings and under `Load from custom url`, input the IP address and port of the server (e.g.  e.g. `http://192.168.1.236:4040`) in the new input box labelled `OPTI URL`. uh. maybe i shouldnt have removed developer settings.

8. Restart Discord. Upon reload, you should notice that your device will download Opti's bundled code from your server, rather than GitHub.

9. Make your changes, rebuild, reload, go wild!
