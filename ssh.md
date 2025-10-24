# SSH

1. Generate public key

```bash
ssh-keygen -t ed25519 -C "YOUR_EMAIL@example.com" -f ~/.ssh/github
```

2. Add the SSH key to system

```bash
ssh-add ~/.ssh/github
```

3. Print the SSH public key to the terminal so that you can copy it

```bash
cat ~/.ssh/github.pub
```

4. Add the SSH public key to your Git cloud provider
