# INTENTIONALLY INSECURE - FOR SCANNER TESTING ONLY
# ISSUE: Outdated, end-of-life base image with known CVEs
FROM node:12

# ISSUE: apt-get install without version pinning or --no-install-recommends
RUN apt-get update && apt-get install -y curl wget netcat

WORKDIR /app

# ISSUE: ADD used instead of COPY
ADD package.json /app/
RUN npm install
ADD app.js /app/

# ISSUE: Secrets baked into the image
COPY config.js /app/config.js

# ISSUE: SSH port exposed
EXPOSE 22 3000

# ISSUE: Container runs as root (no USER instruction)
CMD ["node", "app.js"]
