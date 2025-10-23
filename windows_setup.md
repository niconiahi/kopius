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

Install [zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH) + [ohmyzsh](https://ohmyz.sh/) to enable ZSH in the terminal. This will allows us to see the _current branch_ when working with Git

```bash
#!/usr/bin/env bash
set -e
sudo apt update
sudo apt install -y zsh git curl
chsh -s "$(command -v zsh)"
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

5.

Install [asdf](https://asdf-vm.com/guide/introduction.html) to manange multiple [NodeJS](https://nodejs.org/en) versions at the same time

```bash
#!/usr/bin/env bash
set -e
cd "$HOME"
git clone https://github.com/asdf-vm/asdf.git --branch v0.18.0
cd asdf
make
mkdir -p "$HOME/.local/bin"
cp bin/asdf "$HOME/.local/bin/"
cd ..
rm -rf asdf
echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"
export PATH="$HOME/.local/bin:$PATH"
type -a asdf
asdf --version
```
