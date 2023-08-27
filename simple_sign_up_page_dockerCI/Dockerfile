FROM node:17-alpine

WORKDIR /simple_sign_up_page_dockerCI

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]