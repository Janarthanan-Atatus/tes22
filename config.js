// FAKE credentials for scanner testing only. None of these are real.
module.exports = {
  // VULNERABILITY: Hardcoded AWS access key (fake, AWS documentation example)
  AWS_ACCESS_KEY_ID: 'AKIAIOSFODNN7EXAMPLE',
  AWS_SECRET_ACCESS_KEY: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',

  // VULNERABILITY: Hardcoded GitHub token (fake)
  GITHUB_TOKEN: 'ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJ',

  // VULNERABILITY: Hardcoded Stripe live key (fake)
  STRIPE_KEY: 'sk_live_FAKEfakeFAKEfake0123456789abcd',

  // VULNERABILITY: Database URL with embedded password (fake)
  DATABASE_URL: 'postgres://admin:P@ssw0rd123@db.example.com:5432/appdb'
};
