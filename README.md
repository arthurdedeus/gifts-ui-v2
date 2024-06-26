# Carthur Wedding Gifts
This is a Next.js e-commerce application for wedding gifts. The app features a selection of humorous gifts, a shopping cart persisted in local storage, and a checkout page using Pix. The app is deployed on Vercel.

![Vercel deployments](https://img.shields.io/github/deployments/arthurdedeus/gifts-ui-v2/production?logo=vercel&label=deployment)



## Features

- **Main Page**: Browse a selection of humorous gifts.
- **Shopping Cart**: Add items to the cart, which are persisted in local storage.
- **Checkout Page**: Complete your purchase using Pix.
- **Vercel KV Storage**: Store checkout items, buyer's name, email, and message.

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (Ensure you have Node.js installed)

### Environment Variables

Create a `.env.development.local` file in the root of your project and add the following variables:

```.env
Created by Vercel CLI

KV_REST_API_READ_ONLY_TOKEN=
KV_REST_API_TOKEN=
KV_REST_API_URL=
KV_URL=

Created by me

API_SECRET_KEY=
PIX_KEY=
PIX_NAME=
PIX_CITY=
```

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/arthurdedeus/gifts-ui-v2.git
    cd gifts-ui-v2
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The app is deployed using Vercel. To deploy your own version:

1. Replace the gifts in the main page.
2. Connect your repository to Vercel.
3. Set up the environment variables in Vercel's dashboard.
4. Set up KV storage.
5. Deploy the application.

## Customization

If you want to reuse this codebase for a different purpose, you will need to:

- Replace the gift items on the main page.
- Update any relevant content and styles.
- Reconfigure and redeploy the application on Vercel.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [arthurdedeus@gmail.com].

---

Happy gifting!
