# Windows setup

Abrir una `Microsoft Powershell`

1.

Install Git

```bash
winget install --id Git.Git -e
```

2. 

Install NVM to handle multiple Node versions at system level

```bash
winget install --id CoreyButler.NVMforWindows -e
```

3.

Install latest Node version

```bash
nvm install latest
```

4.

Use latest Node version as system level

```bash
nvm use latest
```

5.

Install [pnpm](https://pnpm.io/es/)

```bash
winget install -e --id pnpm.pnpm
```
