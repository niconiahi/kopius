# Windows setup

1.

```bash
wsl --install
```

2.

```bash
wsl.exe --install Ubuntu
```

3.

Install `Windows terminal` from the official Windows Store

4. 

```bash
sudo apt upgrade
sudo apt install -y build-essential
sudo apt install -y golang-go
```

5.

Install [zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH) + [ohmyzsh](https://ohmyz.sh/) to enable ZSH in the terminal. This will allows us to see the _current branch_ when working with Git

```bash
#!/usr/bin/env bash
set -e
sudo apt install -y zsh git curl
chsh -s "$(command -v zsh)"
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

6.

Install [asdf](https://asdf-vm.com/guide/introduction.html) to manange multiple [NodeJS](https://nodejs.org/en) versions at the same time

```bash
#!/usr/bin/env bash
set -e
cd "$HOME"
git clone https://github.com/asdf-vm/asdf.git --branch v0.18.0
cd asdf
make
mkdir -p "$HOME/.local/bin"
cp ./asdf "$HOME/.local/bin/asdf"
cd ..
rm -rf asdf
sudo rm -rf go
echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"
echo 'export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"' >> "$HOME/.zshrc"
export PATH="$HOME/.local/bin:$PATH"
type -a asdf
asdf --version
```

7.

Install and use [NodeJS](https://nodejs.org/en) latest version

```bash
#!/usr/bin/env bash
asdf plugin add nodejs
asdf install nodejs latest
asdf set nodejs latest
```

8.

Install [pnpm](https://pnpm.io/es/installation), the dependency manager of choice for the academy

```bash
#!/usr/bin/env bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
source /home/$LOGNAME/.zshrc
```

### Summary

In this article we've installed all the required packages to be able to run [vite](https://vite.dev/) which is the base building block for web development today
