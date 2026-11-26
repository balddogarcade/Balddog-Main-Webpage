# Security Policy

## Supported Versions

The `main` branch of `Balddog-Main-Webpage` (deployed to [bald.dog](https://bald.dog) on Cloudflare Workers) is actively maintained and receives security updates.

## Reporting a Vulnerability

If you discover a security vulnerability in **bald.dog ARCADE** or its web portal, please report it responsibly using **GitHub Private Vulnerability Reporting**:

1. Go to the **Security** tab of the repository.
2. Select **Advisories** → **Report a vulnerability**.
3. Provide a clear description, reproduction steps, and potential impact.

Please **do not** open public GitHub issues for undisclosed security vulnerabilities.

## Security Practices

- Automated secret scanning (**Gitleaks** + GitHub Push Protection).
- Dependency and filesystem vulnerability scanning (**Trivy** + **Dependabot**).
- Static code analysis (**CodeQL** + **SonarCloud**).
- Supply-chain security auditing (**OpenSSF Scorecard**).
