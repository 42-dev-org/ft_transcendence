# how to use

## backend

**contact robin**

## frontend


1. install pnpm and turbo globally
    #### personal computer
    - in any location run command `sudo npm i -g pnpm turbo`
    #### in 1337 hosts
    - in root (homedir | ~) run command `mkdir ~/.npm-global`
    - in any location run command `npm config set prefix '~/.npm-global'`
    - in any location run command `echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc`
    - in any location run command `source ~/.zshrc`
    - in any location run command `npm install -g pnpm turbo`
2. go to projrct folder `cd xxxxxx/ft_transcendence`
3. install dependecies by running `pnpm i` in project root level
4. then go to client folder by runnig `xxxxxxx/ft_transcendence/apps/client`
5. run client by running `turbo dev`

## desclaimer 

**dont use npm use pnpm instead**
**run turbo dev only from client folder not in root level**

## in error case 
1. delete folder
2. re-clone project from github
3. re do instruction in readme.md file
4. don't even try to talk to robin
