## battlebit-serverbrowser

A pretty useless web based server browser for the game BattleBit Remastered.

https://battlebit-browser.vercel.app

#### Todo

- Search is slow/delayed when many servers are listed. Not sure why.
- Max height for multiselect list with many items.
- Click on each server row to show more detailed information (slide down)

### Development

#### Requirements

- Node.js 16.8 or later (required by Next.js)

#### Install and run

Clone the repository

```bash
$ git clone https://github.com/jagardaniel/battlebit-serverbrowser.git
```

Install required packages

```bash
$ cd battlebit-serverbrowser/
$ npm install
```

Run the development server

```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Deployment

The application will automatically be deployed to Vercel on a push to the `main` branch.
