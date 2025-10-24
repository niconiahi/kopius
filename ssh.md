# SSH

1. Generate public key

```bash
ssh-keygen -t ed25519 -C "YOUR_EMAIL@example.com" -f ~/.ssh/github
```

2. Print the SSH public key to the terminal so that you can copy it

```bash
cat ~/.ssh/github.pub
```

3. Add the SSH public key to your Git cloud provider
