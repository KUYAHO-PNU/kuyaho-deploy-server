WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROMnode:10
COPY --from=builder /app ./
CMD ["npm","run","start:prod"]
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROMnode:12
COPY --from=builder /app ./
CMD ["npm","run","start:prod"]
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROMnode:12
COPY --from=builder /app ./
CMD ["npm","run","start:prod"]
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROMnode:12
COPY --from=builder /app ./
CMD ["npm","run","start:prod"]
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROMnode:12
COPY --from=builder /app ./
CMD ["npm","run","start:prod"]
