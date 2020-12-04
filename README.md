# Myriad Webkit Theme
This is a theme for LightDM Webkit2 Greeter made with React. I've built it for my own setup.
## Installation
1. Clone the repo to themes folder:
   
   ```bash
   cd /usr/share/lightdm-webkit/themes
   git clone https://github.com/vinicius507/myriad-webkit-greeter.git
   ```
2. Cd into the theme directory and install the dependencies:

    ```bash
    cd ./myriad-webkit-greeter
    yarn
    ```
3. Make any modifications you wish and build using `./build.sh`.

## Images
To change the wallpaper and the banner, just change the existing ones in `src/img/` before building.

## Uninstall
1. To uninstall just remove the folder `myriad-webkit-theme` in `/usr/share/lightdm-webkit/themes/`.
2. Restore the `webkit-theme` property in the `/etc/lightdm/lightdm-webkit-greeter.conf` file.

## Contributing
You are free to contribute in any way. Issues and PR's are welcome.