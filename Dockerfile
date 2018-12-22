FROM node:10-alpine

WORKDIR /app

COPY package.json yarn.lock iss-api/index.js ./

RUN yarn install --production && \
    yarn cache clean && \
    rm -rf /var/cache/* /tmp/* /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/yarn && \
    adduser -S nodejs && \
    chown -R nodejs /app && \
    chown -R nodejs /home/nodejs

USER nodejs

CMD ["node", "index.js"]
