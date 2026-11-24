# Vulnerable Demo App

**This project is intentionally vulnerable and is for security scanner testing only.**
Do not deploy it, run it on a public network, or reuse any of its code. All credentials
in `config.js` are fake.

| File | Scan type | What it contains |
|------|-----------|------------------|
| `app.js` | SAST | SQLi, command injection, path traversal, XSS, eval, prototype pollution, weak crypto, open redirect, etc. |
| `package.json` | SCA | Old dependencies with known CVEs |
| `config.js` | Secrets | Fake AWS, GitHub, Stripe keys and a DB URL with password |
| `Dockerfile` | Image | EOL base image, root user, ADD, unpinned apt, port 22 |
| `docker-compose.yml`, `main.tf` | IaC | Privileged containers, hostPath, public S3, open security group |
